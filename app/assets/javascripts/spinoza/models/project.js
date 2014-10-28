(function(root, undefined) {

  var app = root.Spinoza,
    PaginatedCollection = root.PaginatedCollection;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var Project = mod.Project = BB.Model.extend({
      urlRoot : app.Config.dataUrl('/public/projects'),
      idAttribute: 'slug'
    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      mod.Projects = mod.PublicProjects = PaginatedCollection.extend({

        model : Project,

        initialize: function(models, opts) {
          this.options = opts || {};
        },

        url : app.Config.dataUrl('/public/projects'),

        fetch: function(opts) {
          opts || (opts = {});
          var query = this.queryOptions(opts);

          var lastSort = this.options.sort;
          if (lastSort !== query.sort) {
            opts.reset = true;
          }
          this.options.sort = query.sort;

          opts.url = _.result(this, 'url') + '?' + $.param(query);
          return PaginatedCollection.prototype.fetch.call(this, opts);
        },

        queryOptions: function(opts) {
          return _.pickCompact((opts || {}), 'sort', 'offset', 'limit');
        }

      });

    });

  });

}).call({}, linkage);
