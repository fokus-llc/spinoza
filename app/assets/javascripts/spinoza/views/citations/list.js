(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Citations", function(mod, app, BB, BM, $, _) {

    mod.ListItem = BM.ItemView.extend({

      template : 'jst:citation_item',

      events : {
        'click .fx-edit' : 'onEdit'
      },

      initialize: function() {
        this.listenTo(this.model, 'change:source', this.bindRivets());
      },

      onRender: function() {
        this.bindRivets();
      },

      bindRivets: function() {
        if (this.rivets) { this.rivets.unbind(); }
        this.rivets = rivets.bind(this.$el, {
          cite   : this.model,
          source : this.model.get('source')
        });
      },

      onEdit: function() {
        this.trigger('edit', this.model);
      }

    });

    mod.EditListItem = BM.ItemView.extend({

      tagName: 'li',
      template : 'jst:citation_edit_item',

      events: {
        'click a' : 'onAnchorClick'
      },

      onAnchorClick: function(e) {
        e.preventDefault();
        this.openEditor();
      },

      openEditor: function() {
        var editor = new mod.Editor({ model : this.model, citation: new BB.Model() });
        editor.render().$el.lightbox_me({
          closeEsc   : false,
          closeClick : false,
          onClose    : function() { editor.close(); },
          zIndex     : 99999,
          modalCSS   : { top : '80px' }
        });
      }

    });

    mod.ListEmpty = BM.ItemView.extend({
      template : 'jst:citations_empty'
    });

    mod.List = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : mod.ListItem,
      emptyView : mod.ListEmpty
    });

    mod.EditList = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : mod.EditListItem,
      emptyView : mod.ListEmpty
    });

  });

}).call({}, window);
