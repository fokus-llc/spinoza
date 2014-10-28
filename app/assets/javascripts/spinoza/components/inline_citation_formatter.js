(function(root, undefined) {

  var app = root.Spinoza,
    CSLRenderer = app.Components.CSLRenderer;

  app.module("Components", function(mod, app, BB, BM, $, _) {

    var AbstractFormatter = function(refs) {
      this.references = refs;
      this.renderer = new CSLRenderer(refs);
      this.initialize.apply(this, arguments);
    };
    AbstractFormatter.extend = BB.Model.extend;

    var Formatter = mod.InlineCitationFormatter = AbstractFormatter.extend({

      initialize: function() {
        this.template = BM.TemplateCache.get('jst:citation_inline');
      },

      format: function(name, props) {
        var formatted = this._format(name, props);
        if (!formatted) { console.log("Encountered unknown reference: " + name); }
        return formatted ? formatted : '';
      },

      _format: function(name, props) {
        var formatted, ref = this._getReference(name);
        if (ref) {
          var cite = this._getCitation(ref, props);
          if (cite) { formatted = this._formatTag(ref, cite); }
        }
        return formatted;
      },

      _getReference: function(name) {
        return this.references.get(name);
      },

      _getCitation: function(ref, props) {
        var parsed = new app.Models.Citation(props, { parse : true }),
          cites = ref.citations(),
          cite = (cites.get(parsed) || cites.add(parsed));
        return cite;
      },

      _formatTag: function(ref, cite) {
        return this.template({
          ref      : ref,
          cite     : cite,
          inline : {
            contents : this.renderInlineCitation(ref, cite)
          }
        });
      },

      renderInlineCitation: function(ref, cite) {
        return this.renderer.renderInlineCitation(ref, cite);
      },

      renderBibliography: function(title) {
        return this.renderer.renderBibliography(title);
      }

    });

    mod.EditingInlineCitationFormatter = Formatter.extend({

      constructor: function(citeManager) {
        this.citeManager = citeManager;
        this.references = citeManager.references;
      },

      format: function(id, props) {
        var refCite = this.citeManager.handleCitation(id, props);
        return Formatter.prototype.format.call(this, id, props);
      }

    });

    mod.GuiEditingCitationFormatter = Formatter.extend({

      initialize: function() {
        this.template = BM.TemplateCache.get('jst:citation_inline_edit');
      }


    });

  });

}).call({}, window);
