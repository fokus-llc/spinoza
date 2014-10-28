(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Concepts", function(mod, app, BB, BM, $, _) {

    var Browser = mod.Browser = BM.Layout.extend({

      className: 'fx-publications-browser',
      template: 'jst:concepts_browser',

      ui: {
        header : 'header'
      },

      regions: {
        filterRegion : '.fr-filter',
        tableRegion  : '.fr-table',
        pagerRegion  : '.fr-pager'
      },

      initialize: function(options) {
        var filter = this.filter = options.filter,
          paginator = this.paginator = options.paginator;

        if (filter) {
          this.prepareFilter(options);
          if (paginator) { this.listenTo(filter, 'change', this.resetPaginator); }
          this.listenTo(filter, 'change', this.fetchFilteredCollection);
        }
        if (paginator) {
          this.listenTo(paginator, 'change:offset', this.fetchFilteredCollection);
          this.listenTo(paginator, 'change:limit', this.fetchFilteredCollection);
        }
      },

      prepareFilter: function(options) {
        var deferred = $.Deferred();
        if (options.loadProjects) {
          this.loadProjectOptions().
            then(function() { deferred.resolve(); }).
            fail(function() { deferred.reject(); });
        }
        else {
          deferred.resolve();
        }
        this.filterPrepared = deferred.promise();
      },

      loadProjectOptions: function() {
        this.projectOptions = new app.Collections.PublicProjects([
          { name : 'All', slug : '' }
        ]);
        return this.projectOptions.fetch({ remove : false }).
          fail(function() {
            console.log("Failed to load projects for filter");
          });
      },

      resetPaginator: function() {
        this.paginator.reset({ silent : true });
      },

      fetchFilteredCollection: function() {
        var collection = this.collection,
          fetchOptions = this.filteredFetchOptions();
        return collection.fetch(fetchOptions).fail(function() {
          collection.reset();
        });
      },

      filteredFetchOptions: function() {
        var opts = this.paginatedFetchOptions();
        if (this.filter) { _.extend(opts, this.filter.toJSON()); }
        return opts;
      },

      paginatedFetchOptions: function() {
        return this.paginator ?
          _.pick(this.paginator.toJSON(), 'offset', 'limit') : {};
      },

      onRender: function() {
        this.addBlurbToHeader();
        if (this.filter) { this.showFilterView(); }
        this.showTableView();
        if (this.paginator) { this.showPagerView(); }
      },

      addBlurbToHeader: function() {
        var $blurb = $('.fx-blurb');
        if ($blurb.length) {
          this.ui.header.append($blurb.removeClass('hidden'));
        }
      },

      showFilterView: function() {
        var layout = this;
        this.filterPrepared.then(function() {
          var filterView = new app.Views.Concepts.Filter({
            model    : layout.filter,
            projects : layout.projectOptions
          });
          layout.filterRegion.show(filterView);
        });
      },

      showTableView: function() {
        var tableView = new app.Views.Concepts.Table({
          collection : this.collection
        });
        this.tableRegion.show(tableView);
      },

      showPagerView: function() {
        var pagerView = new app.Views.Pager({
          model : this.paginator
        });
        this.pagerRegion.show(pagerView);
      }

    });

  });

}).call({}, window);
