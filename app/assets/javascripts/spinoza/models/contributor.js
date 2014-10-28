(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    mod.Contributor = BB.Model.extend({
    });

    mod.Contributors = BB.Collection.extend({
      model : mod.Contributor
    });

  });

}).call({}, linkage);
