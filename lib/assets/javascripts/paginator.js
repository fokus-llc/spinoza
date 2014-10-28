(function(root, undefined) {

  var _ = root._,
    BB = root.Backbone;

  function calculatePage(offset, limit) {
    return Math.floor(offset / limit) + 1;
  }

  function calculateMaximumPage(count, limit) {
    return count === 0 ? 1 : Math.ceil(count / limit);
  }

  function calculateOffset(pageSize, page) {
    return pageSize * (page - 1);
  }

  root.Paginator = BB.Model.extend({

    defaults : {
      offset : 0,
      limit  : 10
    },

    initialize: function(attributes) {
      this.defaults = _.extend({}, this.defaults, attributes);
      this.repaginate();
      this._initialEvents();
    },

    _initialEvents: function() {
      this.on('change:page', this.onPageChange);
      this.on('change:count', this.onCountChange);
      this.on('change:limit', this.onLimitChange);
    },

    repaginate: function(options) {
      this._repaginating = true;

      var page = this.calculatePage(),
        maximumPage = this.calculateMaximumPage();
      page = (page > maximumPage) ? maximumPage : page;
      this.set({ maximumPage : maximumPage, page : page }, options);

      delete this._repaginating;
    },

    calculatePage: function() {
      return calculatePage(this.get('offset'), this.get('limit'));
    },

    calculateMaximumPage: function() {
      return this.isPagingUnlimited() ?
        Infinity :
        calculateMaximumPage(this.get('count'), this.get('limit'));
    },

    isPagingUnlimited: function() {
      var count = this.get('count');
      return (count === null || _.isUndefined(count));
    },

    calculateOffsetForPage: function(page) {
      return calculateOffset(this.get('limit'), page);
    },

    // don't recalculate offset if repaginating
    // (repagination sets page from offset and limit)
    onPageChange: function(model, page) {
      if (!this._repaginating && this.isPageValid(page)) {
        this.set('offset', this.calculateOffsetForPage(page));
      }
    },

    onCountChange: function() {
      this.repaginate();
    },

    onLimitChange: function() {
      this.repaginate();
    },

    isPageValid: function(page) {
      return ((page >= 1) &&
              (this.isPagingUnlimited() ||
               page <= this.calculateMaximumPage()));
    },

    incrementPage: function(step) {
      step || (step = 1);
      this.set('page', this.nextPage(step));
    },

    decrementPage: function(step) {
      step || (step = -1);
      this.set('page', this.nextPage(step));
    },

    nextPage: function(step) {
      step || (step = 1);
      return this.nearestValidPage(step);
    },

    hasNextPage: function(step) {
      step || (step = 1);
      return this.get('page') !== this.nextPage(step);
    },

    nearestValidPage: function(range) {
      var i, step = (range >= 1 ? -1 : 1),
        cur = this.get('page');
      for (i = (cur + range); i !== cur; i += step) {
        if (this.isPageValid(i)) { break; }
      }
      return i;
    },

    reset: function(opts) {
      this.unset('count', opts);
      this.set(this.defaults, opts);
      this.repaginate(opts);
      this.trigger('reset');
    }

  });


}).call({}, linkage);
