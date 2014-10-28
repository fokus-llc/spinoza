(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Facts", function(mod, app, BB, BM, $, _) {

    mod.FactTypeOptionView = BM.ItemView.extend({
      tagName    : 'option',
      template   : 'jst:fact_type_option',
      attributes : function() {
        return { value : this.model.get('slug') };
      }
    });

    mod.TypeSelector = BM.CollectionView.extend({
      tagName: 'select',
      itemView: mod.FactTypeOptionView
    });

  });

}).call({}, window);
