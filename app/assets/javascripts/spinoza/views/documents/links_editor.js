(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.LinksEditor = BM.ItemView.extend({

      template  : 'jst:document_links_editor'

    });

  });

}).call({}, window);
