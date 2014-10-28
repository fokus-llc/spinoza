(function(root, undefined) {

  /* customizations based on marked.js v0.2.9 */
  /* updated for v0.2.10 and v0.3.2 */

  /*
   *
   * BlockLexer tokens:
   *
   *  + newline
   *  - code
   *  - fences
   *  + heading
   *  - nptable
   *  - lheading
   *  + hr
   *  + blockquote
   *  + list
   *  + item
   *  + html (sanitized)
   *  - def
   *  - table
   *  + paragraph
   *  + text
   *
   * InlineLexer output:
   *
   *  + escape
   *  - autolink
   *  + url
   *  + tag
   *  - link
   *  - reflink
   *  - nolink
   *  * embed
   *  + strong
   *  + em
   *  - code
   *  + br
   *  - del
   *  * text
   *
   */

  var _    = root._,
    marked = root.marked,
    FokusEmbedHandler = root.FokusEmbedHandler,
    FokusLinks = root.FokusLinks;

  // verbatim
  function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // verbatim, expands regular expressions
  function replace(regex, opt) {
    regex = regex.source;
    opt = opt || '';
    return function self(name, val) {
      if (!name) return new RegExp(regex, opt);
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return self;
    };
  }

  // verbatim, emulates regex
  function noop() {}
  noop.exec = noop;

  /*
   * Extends marked.Renderer
   * -- stateful: maintains array of tokens
   */

  var Renderer = function(options) {
    options || (options = {});

    marked.Renderer.call(this, options);

    this.embedRenderer = options.embedRenderer ||
      (options.embedHandlers ?
        new FokusEmbedHandler.DispatchedRenderer({ handlers : options.embedHandlers }) :
        new FokusEmbedHandler.NullRenderer());

    this.linkRenderer = options.linker || new FokusLinks.DefaultFormatter();

  };

  _.extend(Renderer.prototype, marked.Renderer.prototype, {

    // code(code, lang, escaped)
    // blockquote(quote)
    // html(html)
    // heading(text, level, raw)
    // hr()
    // list(body, ordered)
    // listitem(text)
    // paragraph(text)
    // table(header, body)
    // tablerow(content)

    // strong(text)
    // em(text)
    // codespan(text)
    // br()
    // del(text)
    // link(href, title, text)
    // image(href, title, text)

    embed: function(text) {
      return this.embedRenderer.render(text);
    },

    link2: function(target, text) {
      target = target ? target.trim() : target;
      text = text ? text.trim() : text;
      return this.linkRenderer.render(target, text);
    }

  });

  // Replacement for marked.defaults
  var FokusMarkedDefaults = {
    gfm            : true,
    tables         : false,   // git-flavored-markup only
    breaks         : true,    // gfm only
    pedantic       : false,
    sanitize       : true,    // omit html input
    smartLists     : false,
    silent         : false,
    highlight      : null,
    // langPrefix: : 'lang-', // not interested in code
    smartyPants    : false,
    headerPrefix   : '',
    // renderer    : new Renderer,
    xhtml          : true     // for wymeditor
  };

  /*
   * Extends marked.Lexer
   * -- stateful: maintains array of tokens
   */
  var BlockLexer = function(options) {
    options || (options = {});
    marked.Lexer.call(this, options);

    // Extends block.gfm (options +gfm, -tables)
    this.rules = _.extend({}, this.rules, {
      code:     noop,
      fences:   noop,
      lheading: noop,
      def:      noop
    });

  };
  _.extend(BlockLexer.prototype, marked.Lexer.prototype, {

    // PATCH: Ensure clean state
    lex: function() {
      this._resetState();
      return marked.Lexer.prototype.lex.apply(this, arguments);
    },

    _resetState: function() {
      this.tokens = [];
      this.tokens.links = {};
    },

    // Verbatim, stub for extension
    token: function(src, top, bq) {
      return marked.Lexer.prototype.token.apply(this, arguments);
    }

  });

  /*
   * Extends InlineLexer
   */
  var InlineLexer = function(links, options, renderer) {
    options || (options = {});
    marked.InlineLexer.call(this, links, options);

    // Extends inline.breaks (options +gfm, +breaks)
    var rules = this.rules = _.extend({}, this.rules, {

      autolink: noop, // disable these defaults
      reflink:  noop,
      nolink:   noop,
      code:     noop,
      del:      noop,

      // mediawiki style linking: requires post-processing with replace()
      link:    /^\[\[\s*(linktarget)(?:\s*\|\s*(linktext))?\s*\]\]/,

      /* inline.normal */
      // text:  /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
      /* inline.gfm */
      // text:  /^[\s\S]+?(?=[\\<!\[_*`~]|https?://| {2,}\n|https?://|$)/
      /* inline.breaks */
      // text:  /^[\s\S]+?(?=[\\<!\[_*`~]|https?://| *\n|https?://|$)/

      // inline.breaks with curly, without https?, tilde
      text:     /^[\s\S]+?(?=[\\<!\[\{  _*`]| *\n|$)/,

      // custom
      embed: /^\{\{([^\{\}]+)\}\}/

    });

    rules.link = replace(rules.link)
      ('linktarget', /[^\[\]\|]+/)
      ('linktext', /[^\[\]\|]+/)
      ();

  };
  _.extend(InlineLexer.prototype, marked.InlineLexer.prototype, {

    // Verbatim, except where noted
    output: function(src) {
      var out = ''
        , link
        , text
        , href
        , cap;

      while (src) {
        // escape
        if (cap = this.rules.escape.exec(src)) {
          src = src.substring(cap[0].length);
          out += cap[1];
          continue;
        }

        // autolink
        if (cap = this.rules.autolink.exec(src)) {
          src = src.substring(cap[0].length);
          if (cap[2] === '@') {
            text = cap[1].charAt(6) === ':'
              ? this.mangle(cap[1].substring(7))
              : this.mangle(cap[1]);
            href = this.mangle('mailto:') + text;
          } else {
            text = escape(cap[1]);
            href = text;
          }
          out += this.renderer.link(href, null, text);
          continue;
        }

        // url (gfm)
        if (cap = this.rules.url.exec(src)) {
          src = src.substring(cap[0].length);
          text = escape(cap[1]);
          href = text;
          out += this.renderer.link(href, null, text);
          continue;
        }

        // tag
        if (cap = this.rules.tag.exec(src)) {
          if (!this.inLink && /^<a /i.test(cap[0])) {
            this.inLink = true;
          } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
            this.inLink = false;
          }
          src = src.substring(cap[0].length);
          out += this.options.sanitize
            ? escape(cap[0])
            : cap[0];
          continue;
        }

        // link
        // PATCH:
        // -- use linkRenderer instead of ouputLink
        // -- use cap[2] as alternate text
        if (cap = this.rules.link.exec(src)) {
          src = src.substring(cap[0].length);
          if (this.renderer.link2) {
            this.inLink = true;
            out += this.renderer.link2(cap[1], cap[2]);
            // out += this.outputLink(cap, {
            //   href: cap[2],
            //   title: cap[3]
            // });
            this.inLink = false;
          }
          else {
            console.log("Render skipping link", cap[1], cap[2]);
            out += cap[2];
          }
          continue;
        }

        // reflink, nolink
        if ((cap = this.rules.reflink.exec(src))
            || (cap = this.rules.nolink.exec(src))) {
          src = src.substring(cap[0].length);
          link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = this.links[link.toLowerCase()];
          if (!link || !link.href) {
            out += cap[0].charAt(0);
            src = cap[0].substring(1) + src;
            continue;
          }
          this.inLink = true;
          out += this.outputLink(cap, link);
          this.inLink = false;
          continue;
        }

        // PATCH: embed
        if (cap = this.rules.embed.exec(src)) {
          src = src.substring(cap[0].length);
          if (this.renderer.embed) {
            out += this.renderer.embed(cap[1]);
          }
          else {
            console.log("Render skipping embed", cap[1]);
          }
          continue;
        }

        // strong
        if (cap = this.rules.strong.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.strong(this.output(cap[2] || cap[1]));
          continue;
        }

        // em
        if (cap = this.rules.em.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.em(this.output(cap[2] || cap[1]));
          continue;
        }

        // code
        if (cap = this.rules.code.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.codespan(escape(cap[2], true));
          continue;
        }

        // br
        if (cap = this.rules.br.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.br();
          continue;
        }

        // del (gfm)
        if (cap = this.rules.del.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.del(this.output(cap[1]));
          continue;
        }

        // text
        if (cap = this.rules.text.exec(src)) {
          src = src.substring(cap[0].length);
          out += escape(this.smartypants(cap[0]));
          continue;
        }

        if (src) {
          throw new
            Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
      }

      return out;
    }

  });

  /*
   * Extends marked.Parser, substitutes lexer options for markdown config
   */
  var Parser = function(options) {
    options || (options = {});
    this.lexerOptions = options;
    marked.Parser.call(this, options);
  };
  _.extend(Parser.prototype, marked.Parser.prototype, {

    // PATCH: custom inline lexer (lexerOptions)
    parse: function(src) {
      // this.inline = new InlineLexer(src.links, this.options, this.renderer);
      this.inline = new InlineLexer(src.links, this.lexerOptions, this.renderer);
      this.tokens = src.reverse();

      var out = '';
      while (this.next()) {
        out += this.tok();
      }

      return out;
    },

    // Verbatim, stub for extension
    tok: function() {
      return marked.Parser.prototype.tok.call(this);
    }

  });

  var FokusMarkdown = root.FokusMarkdown = function(options) {
    options = _.extend({}, FokusMarkedDefaults, options);
    this.blockLexer = new BlockLexer(options);
    this.parser     = new Parser(options); // instantiates InlineLexer
  };
  _.extend(FokusMarkdown.prototype, {

    lex: function(text) {
      return this.blockLexer.lex(text);
    },

    parse: function(tokens) {
      return this.parser.parse(tokens);
    },

    render: function(text) {
      var tokens = this.lex(text);
      /*
      console.log(text, tokens); // tokens = array with "links"
      _.each(tokens, function(tok) {
        console.log(tok);
      });
      */
      return this.parse(tokens);
    }

  });

  FokusMarkdown.Renderer = Renderer;

}).call({}, linkage);
