(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views", function(mod, app, BB, BM, $, _) {

    mod.Pager = BM.ItemView.extend({

      tagName  : 'fieldset',
      template : 'jst:browser_pager',

      ui : {
        'prev' : '.fx-prev',
        'next' : '.fx-next'
      },

      events: {
        "click .fx-next a" : "incrementPage",
        "click .fx-prev a" : "decrementPage"
      },

      initialize: function() {
        this.listenTo(this.model, 'change:page', this.onRepagination);
        this.listenTo(this.model, 'change:count', this.onRepagination);
        this.listenTo(this.model, 'reset', this.refreshRivets);
      },

      onRepagination: function() {
        if (this._isRendered) { this.toggleControls(); }
      },

      onRender: function() {
        this.bindRivets();
        this.toggleControls();
      },

      bindRivets: function() {
        if (this.$el) {
          if (this.rivets) { this.rivets.unbind(); }
          this.rivets = rivets.bind(this.$el, {
            pager : this.model
          });
        }
      },

      refreshRivets: function() {
        this.rivets.sync();
      },

      toggleControls: function() {
        if (this.model.hasNextPage(-1)) { this.ui.prev.show(); }
        else { this.ui.prev.hide(); }
        if (this.model.hasNextPage(1)) { this.ui.next.show(); }
        else { this.ui.next.hide(); }
      },

      incrementPage: function(e) {
        e.preventDefault();
        this.model.incrementPage();
      },

      decrementPage: function(e) {
        e.preventDefault();
        this.model.decrementPage();
      }

    });

  });

}).call({}, window);
