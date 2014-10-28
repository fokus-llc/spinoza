(function(root, undefined) {

  var app = root.Spinoza,
    PaginatedCollection = root.PaginatedCollection;

  app.module("Models", function(mod, app, BB, BM, $, _) {
    mod.Revision = BB.Model.extend({

    });
  });

  app.module("Collections", function(mod, app, BB, BM, $, _) {

    mod.Revisions = PaginatedCollection.extend({

      initialize: function(models, options) {
        options || (options = {});

        var documentId = this.documentId = options.documentId;
        this.url = app.Config.dataUrl('/public/linked/documents/' + documentId + '/revisions');
      },

      model: app.Models.Revision,

      fetch: function(options) {
        options || (options = {});

        var query = this.queryOptions(options);
        options.url = _.result(this, 'url') + '?' + $.param(query);
        return PaginatedCollection.prototype.fetch.call(this, options);
      },

      queryOptions: function(options) {
        return _.pickCompact((options || {}), 'sort', 'offset', 'limit');
      }

    });

  });


}).call({}, linkage);
