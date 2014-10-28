(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.AssetsEditor = BM.ItemView.extend({

      template  : 'jst:document_assets_editor',

      onRender: function() {
      }

    });

  });

}).call({}, window);
