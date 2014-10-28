(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Categories", function(mod, app, BB, BM, $, _) {

    mod.Selector = BM.Layout.extend({

      template : 'jst:category_selector',

      className : 'fx-category-selector',

      ui : {
        'targetInput' : 'input.fx-target'
      },

      regions : {
        'typeSelector' : '.fx-type-selector'
      },

      events : {
        'click .fx-cancel' : 'onCancel',
        'click .fx-submit' : 'onSubmit'
      },

      /*
      initialize: function(options) {
        this._initializeDomain(options.domain);
      },

      _initializeDomain: function(domain) {
        this.domain = domain;
      },
      */

      onRender: function() {
        this._bindRivets();
        this._configureAutocomplete();
      },

      _bindRivets: function() {
        if (this.rivets) this.rivets.unbind();
        this.rivets = rivets.bind(this.$el, { category : this.model });
      },

      // ASSUME: link types loaded
     _configureAutocomplete: function() {
        var view = this;
        view.ui.targetInput.
          autocomplete({
            source : function(req, res) {
              view._autocompleteSource(req, res);
            },
            select : function(evt, ui) {
              return view._onAutocompleteSelect(evt, ui);
            }
          });
      },

      _autocompleteSource: function(req, res) {
        this._autocompleteCategory(req, res);
      },

      _autocompleteCategory: function(req, res) {
        var params = this._configureAutocompleteParameters(req.term),
          url = app.Config.dataUrl('/public/concepts' + '?' + $.param(params));
        $.getJSON(url, function(data) {
          var items = data.items;
          res(_.map(items, function(s) {
            return {
              label  : s.name,
              value  : s.name,
              data   : s
            };
          }));
        });
      },

      _configureAutocompleteParameters: function(term) {
        var params = { prefix : term };
        return params;
      },

      _onAutocompleteSelect: function(evt, ui) {
        evt.preventDefault();
        this._setCategory(ui.item.data);
        this._submit();
      },

      _setCategory: function(cat) {
        if (!this._categoryIsTarget(cat)) {
          this._setLinkTarget(cat);
        }
      },

      _categoryIsTarget: function(cat) {
        var target = this.model.get('target');
        return target && (target.target_link === cat.link);
      },

      _setLinkTarget: function(cat) {
        this.model.set({
          title  : cat.name,
          target : this._buildTarget(cat)
        });
      },

      _buildTarget: function(cat) {
        return {
          title       : cat.name,
          target_link : cat.link
        };
      },

      _submit: function() {
        this.submit = true;
        this.$el.trigger('close');
      },

      onCancel: function(e) {
        e.preventDefault();
        this.submit = false;
        this.$el.trigger('close');
      },

      onSubmit: function(e) {
        e.preventDefault();
        this._submit();
      }

    });

  });

}).call({}, window);
