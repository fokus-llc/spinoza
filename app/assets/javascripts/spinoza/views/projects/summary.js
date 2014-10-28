(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Projects", function(mod, app, BB, BM, $, _) {

    mod.Summary = BM.ItemView.extend({

      template: 'jst:project_summary',

      onRender: function() {
        this._bindRivets();
      },

      _bindRivets: function() {
        rivets.bind(this.$el, {
          project : this.model
        });
      }

    });

  });

}).call({}, window);
