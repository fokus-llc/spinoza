
(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var GeographyCollection = mod.GeographyCollection = BB.Model.extend({

      idAttribute: 'link',

      url: function() {
        var urlRoot = app.Config.dataUrl('/public/linked/documents');
        return urlRoot + '/' + this.id + '/geography';
      }

    });

  });

}).call({}, linkage);
