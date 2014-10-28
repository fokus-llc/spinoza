(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Links", function(mod, app, BB, BM, $, _) {

    mod.EditListItem = BM.ItemView.extend({

      tagName  : 'li',
      template : 'jst:link_edit_item',

      initialize: function() {
        var view = this;
        this.listenTo(this.model, "update", function() {
          view.render();
        });
      },

      events: {
        'click a'    : 'onAnchorClick',
        'click span' : 'onRemoveClick'
      },

      onAnchorClick: function(evt) {
        evt.preventDefault();
        var $target = $(evt.target);
        this.trigger("editLink");
      },

      onRemoveClick: function(e) {
        e.preventDefault();
        this.trigger("removeLink");
      }

    });

    mod.EditList = BM.CollectionView.extend({

      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : mod.EditListItem,

      initialize: function(options) {
        this._initializeCustomEvents();
      },

      _initializeCustomEvents: function() {
        var view = this;
        this.on("itemview:removeLink", function(itemView) {
          view.collection.remove(itemView.model);
        });
        this.on("itemview:editLink", function(itemView) {
          view._editLink(itemView.model);
        });
      },

      _editLink: function(link) {
        var editableLink = this._buildEditableLink(link);
        this._openLinkEditorForUpdate(editableLink, link);
      },

      _buildEditableLink: function(link) {
        var target_link = link.get('target_link'),
          editableLink = new BB.Model({
            title        : link.get('title'),
            link_type    : link.get('link_type'),
            value        : link.get('value'),
            time_range   : link.get('time_range')
          });
        if (target_link) {
          editableLink.set('target', this._buildLinkTarget(link));
        }
        return editableLink;
      },

      _buildLinkTarget: function(link) {
        return {
          title       : link.get('title'),
          target_link : link.get('target_link')
        };
      },

      _openLinkEditorForUpdate: function(editableLink, link) {
        var listView = this,
          editor = this._openLinkEditor(editableLink);
        editor.on('close', function() {
          if (editor.submit) {
            listView._updateEditedLink(link, editableLink);
            link.trigger("update");
          }
        });
      },

      _openLinkEditor: function(editableLink) {
        var linkEditor = this._buildLinkEditor(editableLink);
        this._renderLightboxView(linkEditor);
        return linkEditor;
      },

      // ABSTRACT: _buildLinkEditor: function(editableLink)

      _renderLightboxView: function(view) {
        view.render().$el.lightbox_me({
          closeEsc   : false,
          closeClick : false,
          onClose    : function() { view.close(); },
          zIndex     : 99999,
          modalCSS   : { top : '80px' }
        });
      },

      _updateEditedLink: function(link, editableLink) {
        var title = editableLink.get('title');
        if (! _.str.isBlank(title)) {
          this._updateLink(link, editableLink);
        }
      },

      // ABSTRACT: _updateLink: function(link, editableLink)

      editNewLink: function() {
        var link = this._buildLink(),
          editableLink = this._buildEditableLink(link);
        this._openLinkEditorForAdd(editableLink, link);
      },

      _buildLink: function() {
        return new BB.Model({
          title       : null,
          link_type   : null,
          value       : null,
          time_range  : null
        });
      },

      _openLinkEditorForAdd: function(editableLink, link) {
        var listView = this,
          editor = this._openLinkEditor(editableLink);
        editor.on('close', function() {
          if (editor.submit) {
            var link = listView._buildLink();
            listView._updateLink(link, editableLink);
            listView.collection.add(link);
          }
        });
      }

    });

    ////

    mod.FactEditListEmpty = BM.ItemView.extend({
      template : 'jst:facts_empty'
    });

    mod.FactEditList = mod.EditList.extend({

      emptyView : mod.FactEditListEmpty,

      _buildLinkEditor: function(editableLink) {
        return new app.Views.Facts.Editor({ model : editableLink });
      },

      _updateLink: function(link, editableLink) {
        var title = editableLink.get('title');
        link.set('title', title);
        link.set('value', title);
        link.set('link_type',  editableLink.get('link_type'));
        link.set('time_range', editableLink.get('time_range'));
      }

    });

    mod.AssociationEditListEmpty = BM.ItemView.extend({
      template : 'jst:associations_empty'
    });

    mod.AssociationEditList = mod.EditList.extend({

      emptyView : mod.AssociationEditListEmpty,

      _buildLinkEditor: function(editableLink) {
        return new app.Views.Associations.Editor({
          model  : editableLink,
          domain : this.options.domain
        });
      },

      _updateLink: function(link, editableLink) {
        var target = editableLink.get('target');
        link.set('title',       target.title);
        link.set('target_link', target.target_link);
        link.set('link_type',   editableLink.get('link_type'));
        link.set('time_range',  editableLink.get('time_range'));
      }

    });

    mod.CategoryEditListItem = mod.EditListItem.extend({
      template : 'jst:category_edit_item'
    });

    mod.CategoryEditListEmpty = BM.ItemView.extend({
      template : 'jst:categories_empty'
    });

    mod.CategoryEditList = mod.EditList.extend({

      itemView  : mod.CategoryEditListItem,
      emptyView : mod.CategoryEditListEmpty,

      _buildLinkEditor: function(editableLink) {
        return new app.Views.Categories.Selector({ model : editableLink });
      },

      _buildLink: function() {
        return new BB.Model({
          title       : null,
          link_type   : 'related-to-concept',
          target_link : null
        });
      },

      _updateLink: function(link, editableLink) {
        var target = editableLink.get('target');
        link.set('title',       target.title);
        link.set('target_link', target.target_link);
        link.set('link_type',   editableLink.get('link_type'));
      }

    });

  });

}).call({}, window);
