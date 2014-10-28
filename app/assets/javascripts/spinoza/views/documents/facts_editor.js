(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.FactsEditor = BM.ItemView.extend({

      template : 'jst:document_facts_editor'

    });

  });

}).call({}, window);
