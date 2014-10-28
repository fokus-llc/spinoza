(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var LinkEditListItem = BM.ItemView.extend({

      tagName: 'li',
      template : 'jst:link_edit_item',

      events: {
        'click a' : 'onClick'
      },

      onClick: function(e) {
        e.preventDefault();
        this.openEditor();
      },

      openEditor: function() {
        var editor = new app.Views.Links.Editor({ model : this.model });
        editor.render().$el.lightbox_me({
          closeEsc   : false,
          closeClick : false,
          onClose    : function() { editor.close(); },
          zIndex     : 99999,
          modalCSS   : { top : '80px' }
        });
      }

    });

    mod.LinksEditList = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : LinkEditListItem
    });

  });

}).call({}, window);
