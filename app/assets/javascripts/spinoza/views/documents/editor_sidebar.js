(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.EditorSidebar = BM.Layout.extend({

      className : 'fx-sidebar',
      template  : 'jst:document_editor_sidebar',

      regions : {
        factsPanel        : '#fx-facts div',
        associationsPanel : '#fx-associations div',
        categoriesPanel   : '#fx-categories div'
      },

      events : {
        'click #fx-facts button'        : 'onAddFactClick',
        'click #fx-associations button' : 'onAddAssociationClick',
        'click #fx-categories button'   : 'onAddCategoryClick'
      },

      onRender: function() {
        this.$el.tabs();
        this._renderPanels();
      },

      _renderPanels: function() {
        this._renderFactsPanel();
        this._renderAssociationsPanel();
        this._renderCategoriesPanel();
      },

      _renderFactsPanel: function() {
        var factListView = this._buildFactListView();
        this.factsPanel.show(factListView);
      },

      _buildFactListView: function() {
        var facts = this.model.factLinks();
        return new app.Views.Links.FactEditList({ collection : facts });
      },

      onAddFactClick: function() {
        this.factsPanel.currentView.editNewLink();
      },

      _renderAssociationsPanel: function() {
        var associationsListView = this._buildAssociationsListView();
        this.associationsPanel.show(associationsListView);
      },

      _buildAssociationsListView: function() {
        var associations = this.model.associationLinks();
        return new app.Views.Links.AssociationEditList({
          collection : associations,
          domain     : this.model
        });
      },

      onAddAssociationClick: function() {
        this.associationsPanel.currentView.editNewLink();
      },

      _renderCategoriesPanel: function() {
        var categoriesEditView = this._buildCategoriesListView();
        this.categoriesPanel.show(categoriesEditView);
      },

      _buildCategoriesListView: function() {
        var categories = this.model.categoryLinks();
        return new app.Views.Links.CategoryEditList({ collection : categories });
      },

      onAddCategoryClick: function() {
        this.categoriesPanel.currentView.editNewLink();
      }

    });

  });

}).call({}, window);
