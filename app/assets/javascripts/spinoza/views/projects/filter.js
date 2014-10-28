(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Projects", function(mod, app, BB, BM, $, _) {

    mod.Filter = BM.ItemView.extend({

      tagName  : 'fieldset',
      template : 'jst:projects_filter',

      initialize: function(options) {
      },

      onRender: function() {
        this.bindRivets();
      },

      bindRivets: function() {
        if (this.$el) {
          if (this.rivets) { this.rivets.unbind(); }
          this.rivets = rivets.bind(this.$el, { filter : this.model });
        }
      }

    });

  });

}).call({}, window);
