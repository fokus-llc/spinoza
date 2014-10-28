(function(root, undefined) {

  var app = root.Spinoza,
    CSL = root.CSL,
    FokusCSL = root.FokusCSL,

    Styles = FokusCSL.Styles,
    CiteprocSystem = FokusCSL.System,

    defaultStyle = 'mhra',
    defaultFormat = 'html';

  app.module("Components", function(mod, app, BB, BM, $, _) {

    var CSLRenderer = mod.CSLRenderer = function(references, style, format) {
      references || (references = new BB.Collection());
      style      || (style  = defaultStyle);
      format     || (format = defaultFormat);
      this.engine = this._initializeEngine(references, style, format);
    };

    _.extend(CSLRenderer.prototype, {

      _initializeEngine: function(references, style, format) {
        var engine = new CSL.Engine(new CiteprocSystem(), Styles[style]);
        _.extend(engine.opt.development_extensions, { wrap_url_and_doi : true });
        engine.setOutputFormat(format);
        engine.sys.setReferences(references);
        return engine;
      },

      renderInlineCitation: function(ref, cite) {
        var text = this._renderInlineCitationText(ref, cite);
        return this._ensureInlineCitation(text, ref, cite);
      },

      _renderInlineCitationText: function(ref, cite) {
        var cluster = this._makeCitationCluster(ref, cite),
          out = this._appendCitationCluster(cluster);
        return out[0][1]; // array of tuples: [ position, text ]
      },

      _makeCitationCluster: function(ref, cite) {
        var item = this._makeCitationItem(ref, cite);
        return {
          citationItems : [ item ],
          properties    : { noteIndex : 0 }
        };
      },

      _makeCitationItem: function(ref, cite) {
        var item = {
          id     : ref.id,
          prefix : '[',
          suffix : ']'
        };
        if (cite.attributes.locator) {
          _.extend(item, _.pick(cite.attributes, 'label', 'locator'));
        }
        return item;
      },

      _appendCitationCluster: function(cluster) {
        return this.engine.appendCitationCluster(cluster);
      },

      _ensureInlineCitation: function(text, ref, cite) {
        return (/CSL STYLE ERROR/.test(text) ? ('(' + ref.id + ')') : text);
      },

      renderBibliography: function(referenceId) {
        this.engine.updateItems([ referenceId ]);
        var out = this.engine.makeBibliography();
        return out[1].join('');
      },

      reset: function() {
        this.restoreProcessorState([]);
      }

    });

  });

}).call({}, linkage);
