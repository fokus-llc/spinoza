(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Associations", function(mod, app, BB, BM, $, _) {

    mod.Editor = BM.Layout.extend({

      template : 'jst:association_editor',

      className : 'fx-facts-editor',

      ui : {
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

      initialize: function(options) {
        // model: editable fact
        this._initializeDomain(options.domain);
        this._initializeAssociationTypes();
      },

      _initializeDomain: function(domain) {
        this.domain = domain; // ASSUME: domain entity type stable
      },

      _initializeAssociationTypes: function() {
        this.factTypes = new app.Collections.LinkTypes();
        this._fetchAssociationTypes();
      },

      _fetchAssociationTypes: function() {
        var factTypes = this.factTypes,
          entityType = this._getDomainEntityType();
        factTypes._fetched = factTypes.fetch({
          domain : entityType,
          range  : 'entity'
        });
        return factTypes._fetched;
      },

      _getDomainEntityType: function() {
        return this.domain.get('entity_type');
      },

      onRender: function() {
        this._configurePostFactTypesRender();
      },

      _configurePostFactTypesRender: function() {
        var view = this;
        view.factTypes._fetched.then(function() {
          view._postFactTypesRender();
        });
      },

      _postFactTypesRender: function() {
        this._renderTypeSelector();
        this._bindRivets();
        this._configureAutocomplete();
        this._previewCurrentDocument();
      },

      _renderTypeSelector: function() {
        var selectorView = new app.Views.Facts.TypeSelector({
          collection : this.factTypes,
          attributes : { 'data-bind-value' : 'fact:link_type' }
        });
        this.typeSelector.show(selectorView);
      },

      _bindRivets: function() {
        if (this.rivets) this.rivets.unbind();
        this.rivets = rivets.bind(this.$el, { fact : this.model });
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
            },
            focus: function(evt, ui) {
              return view._onAutocompleteFocus(evt, ui);
            }
          });
      },

      _autocompleteSource: function(req, res) {
        var targetType = this._selectedLinkTargetType();
        if (targetType === 'document') {
          this._autocompleteDocumentTitle(req, res);
        }
        else {
          res([]);
        }
      },

      _selectedLinkTargetType: function() {
        var linkType = this._selectedLinkType(),
          targetType = (linkType ? linkType.get('target-type') : null);
        return targetType;
      },

      _selectedLinkType: function() {
        var linkType = this.model.get('link_type');
        if (linkType) {
          return this.factTypes.findWhere({ slug : linkType });
        }
      },

      _autocompleteDocumentTitle: function(req, res) {
        var params = this._configureAutocompleteParameters(req.term),
          url = app.Config.dataUrl('/public/documents' + '?' + $.param(params));
        $.getJSON(url, function(data) {
          var items = data.items;
          res(_.map(items, function(s) {
            return {
              label  : s.title,
              value  : s.title,
              data   : s
            };
          }));
        });
      },

      _configureAutocompleteParameters: function(term) {
        var params = { prefix : term },
          linkType = this._selectedLinkType(),
          entityType = (linkType ? linkType.get('range') : null);
        if (entityType) { params.entity_type = entityType; }
        return params;
      },

      _onAutocompleteSelect: function(evt, ui) {
        evt.preventDefault();
        this._setLinkForDocument(ui.item.data);
        this._submit();
      },

      _setLinkForDocument: function(doc) {
        if (!this._docIsTarget(doc)) {
          this._setLinkTarget(doc);
        }
      },

      _docIsTarget: function(doc) {
        var target = this.model.get('target');
        return target && (target.target_link == doc.link);
      },

      _setLinkTarget: function(doc) {
        this.model.set({
          title  : doc.title,
          target : this._buildTarget(doc)
        });
      },

      _buildTarget: function(doc) {
        return {
          title       : doc.title,
          target_link : doc.link
        };
      },

      _submit: function() {
        this.submit = true;
        this.$el.trigger('close');
      },

      _onAutocompleteFocus: function(evt, ui) {
        var linkId = ui.item.data.link;
        this._previewDocument(linkId);
      },

      _previewDocument: function(linkId) {
        var view = this,
          document = new app.Models.LinkedDocument({ link : linkId });
        document.fetch().then(function() {
          var documentPreview = new app.Views.Documents.Preview({ model : document });
          view.targetPreview.show(documentPreview);
        });
      },

      // ASSUME: link types loaded
      _previewCurrentDocument: function() {
        var preview = false;
        if (this._selectedLinkTargetType() === 'document') {
          var target = this.model.get('target'),
            linkId = (target ? target.target_link : null);
          if (linkId) {
            preview = true;
            this._previewDocument(linkId);
          }
        }
        if (!preview) {
          this._resetPreview();
        }
      },

      _resetPreview: function() {
        this.targetPreview.close();
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
