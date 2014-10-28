(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Projects", function(mod, app, BB, BM, $, _) {

    mod.Browser = BM.Layout.extend({

      className: 'fx-projects-browser',
      template: 'jst:projects_browser',

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
          if (paginator) { this.listenTo(filter, 'change', this.resetPaginator); }
          this.listenTo(filter, 'change', this.fetchFilteredCollection);
        }
        if (paginator) {
          this.listenTo(paginator, 'change:offset', this.fetchFilteredCollection);
          this.listenTo(paginator, 'change:limit', this.fetchFilteredCollection);
        }
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
        var filterView = new app.Views.Projects.Filter({
          model : this.filter
        });
        this.filterRegion.show(filterView);
      },

      showTableView: function() {
        var tableView = new app.Views.Projects.Table({
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
