(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.TitleItem = BM.ItemView.extend({
      tagName  : 'li',
      template : 'jst:document_title_item'
    });

  });

}).call({}, window);
