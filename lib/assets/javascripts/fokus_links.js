(function(root, undefined) {

  var _ = root._,
    $ = root.jQuery,
    BB = root.Backbone,

    mod = root.FokusLinks = {},

    BaseRenderer = function() {
      if (this.initialize) {
        this.initialize.apply(this, arguments);
      }
    },

    escape = function(html, encode) { // verbatim from marked.js
      return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

  BaseRenderer.extend = BB.Model.extend;

  mod.PlainTextFormatter = BaseRenderer.extend({

    render: function(target, text) {
      return text || target;
    }

  });

  var DefaultFormatter = mod.DefaultFormatter = BaseRenderer.extend({

    initialize: function(links) {
      this.links = links || new BB.Collection();
    },

    render: function(target, text) {
      target = _.str.trim(target);
      text || (text = target);

      var link = this.getLink(target),
        opts = (text === target) ? {} : { title : target },
        linkableId = link ? link.get('target_link') : null;

      if (linkableId) {
        var url = this.clientArticleUrl(target, linkableId);
        return this.outputArticleLink(url, text, opts);
      }
      else {
        return this.outputRedLink(text, opts);
      }
    },

    getLink: function(target) {
      return this.links.get(target);
    },

    setLink: function(target, link) {
      var linkModel = this.links.add(link);
      linkModel.set('id', target);
    },

    clientArticleUrl: function(title, linkableId) {
      return [
        '/articles/',
        _.str.slugify(title),
        '?',
        $.param({ document_link : linkableId })
      ].join('');
    },

    outputArticleLink: function(url, text, opts) {
      return '<a href="'
        + url
        + '"'
        + (opts.title
        ? ' title="'
        + escape(opts.title)
        + '"'
        : '')
        + '>'
        + text
        + '</a>';
    },

    outputRedLink: function(text, opts) {
      return '<a href="#"'
        + (opts.title
        ? ' title="'
        + escape(opts.title)
        + '"'
        : '')
        + '>'
        + text
        + '</a>';
    }

  });

  mod.LinkedFormatter = DefaultFormatter;

  mod.EditingFormatter = DefaultFormatter.extend({

    render: function(target, text) {
      this._setLink(target, text);
      return DefaultFormatter.prototype.render.call(this, target, text);
    },

    _setLink: function(target, text) {
      var link = this.getLink(target);
      if (!link) {
        link = this.setLink(target, { link_type : "linked-to", target: target });
        // document_id, document_type, entity_id, entity_type, target_link, title
      }
    }

  });

  mod.GuiEditingFormatter = DefaultFormatter.extend({

    render: function(target, text) {
      var link = this.getLink(target);
      if (link) { // TODO: handle error case
        text || (text = target);
        return this._renderGuiEditableLink(link, text);
      }
    },

    _renderGuiEditableLink: function(link, text) {
      return '<a href="'
        + '#'
        + '"'
        + ' contentEditable="false"'
        + ' data-link-cid="'
        + link.cid
        + '"'
        + ' title="'
        + escape(link.get("title"))
        + '"'
        + '>'
        + text
        + '</a>';
    }

  });

}).call({}, linkage);
