(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Facts", function(mod, app, BB, BM, $, _) {

    mod.Editor = BM.Layout.extend({

      template : 'jst:fact_editor',

      className : 'fx-facts-editor',

      ui : {
        'targetType'  : '.fx-type-selector select',
        'targetInput' : 'input.fx-target'
      },

      regions : {
        'targetPreview' : '.fx-target-preview',
        'typeSelector'  : '.fx-type-selector'
      },

      events : {
        'click .fx-cancel' : 'onCancel',
        'click .fx-submit' : 'onSubmit'
      },

      initialize: function(options) { // model: editable fact
        this._initializeFactTypes();
        this._ensureFactType();
      },

      _ensureFactType: function() {
        if (_.str.isBlank(this.model.get('link_type'))) {
          var defaultFactType = this.factTypes.models[0].get('slug');
          this.model.set('link_type', defaultFactType);
        }
      },

      _initializeFactTypes: function() {
        this.factTypes = new app.Collections.LinkTypes([
          { slug : 'aliased-by' },
          { slug : 'has-locus' },
          { slug : 'has-un-m-49-code' },
          { slug : 'has-iso-3166-alpha-2-code' },
          { slug : 'has-population' },
          { slug : 'has-role' }
        ]);
      },
      // omitting hopefully unused (dis)established

      onRender: function() {
        this._renderTypeSelector();
        this._bindRivets();
      },

      _renderTypeSelector: function() {
        var selectorView = new app.Views.Facts.TypeSelector({
          collection : this.factTypes,
          attributes : { 'data-bind-value' : 'link:link_type' }
        });
        this.typeSelector.show(selectorView);
      },

      _bindRivets: function() {
        if (this.rivets) this.rivets.unbind();
        this.rivets = rivets.bind(this.$el, { link: this.model });
      },

      onCancel: function(e) {
        e.preventDefault();
        this.submit = false;
        this.$el.trigger('close');
      },

      onSubmit: function(e) {
        e.preventDefault();
        this.submit = true;
        this.$el.trigger('close');
      }

    });

  });

}).call({}, window);
