(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var LinkType = mod.LinkType = BB.Model.extend({
      idAttribute: 'slug'
    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      var LinkTypes = mod.LinkTypes = BB.Collection.extend({

        initialize : function(models, options) {
          this.options = options;
        },

        url : app.Config.dataUrl('/public/link-types'),

        model: LinkType,

        fetch: function(options) {
          options || (options = {});
          var query = this.queryOptions(options);
          options.url = _.result(this, 'url') + '?' + $.param(query);
          return BB.Collection.prototype.fetch.call(this, options);
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}), 'domain', 'range', 'target-type');
        }

      });

    });

  });

}).call({}, linkage);
