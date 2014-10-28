(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Components", function(mod, app, BB, BM, $, _) {

    mod.InfiniteScroll = {

      configure: function($container, collection, filter, opts) {
        var paginator = filter.paginator;
        (function configureScrollingPagination() {
          $container.smack(opts).done(function() {
            if (paginator.hasNextPage()) {
              paginator.incrementPage();
              var fetchOpts = filter.fetchOptions();
              fetchOpts = _.extend({ remove : false }, fetchOpts);
              collection.fetch(fetchOpts).then(function() {
                if (paginator.hasNextPage()) {
                  configureScrollingPagination();
                }
              });
            }
          });
        })();
      }

    };

  });

}).call({}, window);
