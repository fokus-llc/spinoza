(function(root, undefined) {

  var app = root.Spinoza,
    AuthorizedPaginatedCollection = app.Components.AuthorizedPaginatedCollection;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var Project = mod.WritableProject = BB.Model.extend({
      idAttribute: 'slug'
    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      mod.WritableProjects = AuthorizedPaginatedCollection.extend({

        model : Project,

        initialize: function(models, opts) {
          this.options = opts || {};
        },

        url : app.Config.dataUrl('/auth/projects'),

        fetch: function(opts) {
          opts || (opts = {});
          var query = this.queryOptions(opts);
          opts.url = _.result(this, 'url') + '?' + $.param(query);
          return PaginatedCollection.prototype.fetch.call(this, opts);
        },

        queryOptions: function(opts) {
          return _.pickCompact((opts || {}), 'offset', 'limit');
        }

      });

    });

  });

}).call({}, linkage);
