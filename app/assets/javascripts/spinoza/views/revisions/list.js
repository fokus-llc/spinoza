(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Revisions", function(mod, app, BB, BM, $, _) {

    var ListItem = BM.ItemView.extend({
      tagName  : 'li',
      template : 'jst:editions_item'
    });

    mod.List = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : ListItem
    });

  });

}).call({}, window);
