(function(root, undefined) {

  var BB = root.Backbone,
    SparseCollection = root.SparseCollection,
    Paginator = root.Paginator,
    LocalModel = root.LocalModel;

  var PaginatedCollectionMixin = {

    constructor: function(models, options) {
      options || (options = {});
      this.paginator = options.paginator || new Paginator();
      BB.Collection.apply(this, arguments);
    },

    parse: function(resp, options) {
      this.resetPaginator(resp);
      return resp.items;
    },

    resetPaginator: function(config) {
      this.paginator.set('offset', config.offset);
      this.paginator.set('limit', config.limit);
      this.paginator.set('count', config.count);
    }

  };

  var PaginatedCollection = root.PaginatedCollection =
    BB.Collection.extend(PaginatedCollectionMixin);

  root.LocalPaginatedCollection = PaginatedCollection.extend({
    model: LocalModel,
    sync: LocalModel.prototype.sync
  });

  root.SparsePaginatedCollection = SparseCollection.extend(_.defaults({

    fetch: function(options) {
      options = _.extend({}, options, {
        remove : false,
        add    : true,
        at     : options.offset
      });
      return BB.Collection.prototype.fetch.call(this, options);
    }

  }, PaginatedCollectionMixin));


}).call({}, linkage);
