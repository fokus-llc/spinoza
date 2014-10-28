(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.MemberFilter = BM.ItemView.extend({

      template : 'jst:documents_member_filter',

      onRender: function() {
        this.bindRivets();
      },

      bindRivets: function() {
        if (this.$el) {
          if (this.rivets) { this.rivets.unbind(); }
          this.rivets = rivets.bind(this.$el, { filter : this.model });
        }
      },

      events: {
        "click a" : "onAnchorClick"
      },

      onAnchorClick: function() {
        this.model.unset('concept');
      }

    });

  });

}).call({}, window);
