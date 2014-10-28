(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Citations", function(mod, app, BB, BM, $, _) {

    mod.Bibliography =  BM.ItemView.extend({

      initialize: function(options) {
        this.renderer = options.renderer;
        this._initialEvents();
      },

      _initialEvents: function() {
        this.listenTo(this.collection, 'refresh', this.renderBibliography, this);
      },

      template: function() { return ''; },

      onRender: function() {
        this.renderBibliography();
      },

      renderBibliography: function() {
        if (this.collection.isEmpty()) {
          this.$el.html('');
        }
        else {
          var biblioHtml = this.renderer.renderBibliography();
          this.$el.html(biblioHtml);
        }
      }

    });

  });

}).call({}, window);
