(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Concepts", function(mod, app, BB, BM, $, _) {

    var SetOutline = mod.SetOutline = BM.CompositeView.extend({

      tagName           : 'ul',
      template          : 'jst:concept_set_outline',

      itemView          : SetOutline,
      itemViewContainer : 'li.fx-children',

      initialize: function() {
        if (!this.collection) { this.collection = this.model.children(); }
      },

      showEmptyView: function() {
        this.getItemViewContainer(this).hide();
      }

    });

  });

}).call({}, window);
