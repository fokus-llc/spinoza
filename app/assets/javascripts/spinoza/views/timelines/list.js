(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Timelines", function(mod, app, BB, BM, $, _) {

    mod.ListEmpty = BM.ItemView.extend({
      template : 'jst:timelines_empty'
    });

    mod.ListItem = BM.ItemView.extend({
      template : 'jst:timeline_item'
    });

    mod.List = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : mod.ListItem,
      emptyView : mod.ListEmpty
    });

  });

}).call({}, window);
