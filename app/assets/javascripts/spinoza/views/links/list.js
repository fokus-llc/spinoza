(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Links", function(mod, app, BB, BM, $, _) {

    var ListItem = BM.ItemView.extend({
      template : 'jst:link_item'
    });

    mod.List = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : ListItem
    });

  });

}).call({}, window);
