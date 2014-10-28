(function(root, undefined) {

  var window = root.window,
    app = root.Spinoza,
    FokusMarkdown = root.FokusMarkdown,
    CSLRenderer = app.Components.CSLRenderer;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.Body = BM.ItemView.extend({

      tagName  : 'article',

      template : 'jst:document_body',

      ui : {
        'body' : '.fx-article-body'
      },

      initialize: function() {
        this.references = this.model.references();
        this.cslRenderer = new CSLRenderer(this.references);
        this.markdownRenderer = this.initializeMarkdownRenderer();
      },

      serializeData : function() {
        var json = this.model.toJSON(),
          dateLinks = (json.links ? json.links['has-date'] : null);
        return {
          type    : this.model.displayType(),
          title   : json.title,
          date    : dateLinks ? _.keys(dateLinks)[0] : null,
          body    : this.renderBody(json.body),
          project : json.project,
          user    : json.user
        };
      },

      onRender: function() {
        this.renderInlineCitations();
        this.renderCitationPopups();
      },

      initializeMarkdownRenderer: function() {
        var view = this, markdownRenderer = new FokusMarkdown({
          embedHandlers : {
            cite : function(id, props) { return view.handleCitation(id, props); }
          }
        });
        return markdownRenderer;
      },

      renderBody: function(body) {
        return body ? this.markdownRenderer.render(body.text) : null;
      },

      handleCitation: function(referenceId, props) {
        var target, ref = this.references.get(referenceId);
        if (ref) {
          var parsed = app.Models.Citation.parse(props),
            cite = ref.citations().get(parsed);
          if (cite) { target = this._renderCitationTarget(ref, cite); }
        }
        if (!target) {
          console.log("Unloaded reference: " + referenceId);
          target = '';
        }
        return target;
      },

      _renderCitationTarget: function(ref, cite) {
        return '<cite' + 
          ' data-reference-cid="' + ref.cid + '"' +
          ' data-citation-cid="' + cite.cid + '"' +
          '></cite>';
      },

      renderInlineCitations: function() {
        var view = this;
        this.ui.body.find('cite').each(function(i, el) {
          var $cite = $(el), refCite = view._dataForCiteElement($cite);
          if (refCite) {
            $cite.html(view._renderInlineCitation(refCite[0], refCite[1]));
            $cite.after(view._renderBibliographicalEntry(refCite[0].id));
          }
        });
      },

      renderCitationPopups: function() {
        this.$('cite').qtip({
          content: {
            text : function() {
              return $(this).next('dfn').html();
            }
          },
          show: {
            solo : true
          },
          hide: {
            event: 'unfocus',
            inactive: 1500
          },
          position: {
            viewport: $(window)
          }
        });
        $('body').delegate('.csl-entry a', 'click', function(e) {
          $(e.target).attr('target', 'blank');
        });
      },

      _dataForCiteElement: function($cite) {
        var refCite,
          refCid = $cite.data('reference-cid'),
          citeCid = $cite.data('citation-cid'),
          ref = this.references.get(refCid);
        if (ref) {
          cite = ref.citations().get(citeCid);
          if (cite) { refCite = [ ref, cite ]; }
        }
        return refCite;
      },

      _renderInlineCitation: function(ref, cite) {
        return this.cslRenderer.renderInlineCitation(ref, cite);
      },

      _renderBibliographicalEntry: function(referenceId) {
        var bib = this.cslRenderer.renderBibliography(referenceId);
        return $('<dfn/>').css({ display : 'none' }).html(bib);
      }

    });

  });

}).call({}, window);
