(function(root, undefined) {

  var app = root.Spinoza,
    MarkdownViewMixin = app.Components.MarkdownViewMixin;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.Preview = BM.ItemView.extend(_.defaults({

      tagName  : 'article',

      className : 'fx-document-preview',

      ui : {
        body      : '.fx-article-body',
        relations : '.fx-links'
      },

      template : 'jst:document_preview',

      initialize: function() {
        this._configureMarkdown();
      },

      _configureMarkdown: function() {
        var linker = new FokusLinks.PlainTextFormatter();
        var renderer = this._buildMarkdownRenderer(null, null, linker);
        this._initializeMarkdown(renderer);
      },

      serializeData : function() {
        var json = this.model.toJSON();
        return {
          type         : this.model.displayType(),
          title        : json.title,
          date         : this.model.displayDate(),
          body         : this.renderBody(json.body)
        };
      }

    }, MarkdownViewMixin));

  });

}).call({}, window);
