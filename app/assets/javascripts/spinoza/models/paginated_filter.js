(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    mod.PaginatedFilter = BB.Model.extend({

      initialize: function(attr, options) {
        this.paginator = options.paginator;
      },

      fetchOptions: function() {
        var opts = this.paginationOptions();
        return _.extend(opts, this.toJSON());
      },

      paginationOptions: function() {
        return this.paginator ?
          _.pickCompact(this.paginator.toJSON(), 'offset', 'limit') : {};
      },

      resetPagination: function() {
        this.paginator.reset();
      }

    });

  });

}).call({}, linkage);
