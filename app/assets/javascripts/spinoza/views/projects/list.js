(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Projects", function(mod, app, BB, BM, $, _) {

    mod.ListEmpty = BM.ItemView.extend({
      template : 'jst:projects_empty'
    });

    mod.ListItem = BM.ItemView.extend({
      template : 'jst:project_item'
    });

    mod.List = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : mod.ListItem,
      emptyView : mod.ListEmpty
    });

  });

}).call({}, window);
