(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Links", function(mod, app, BB, BM, $, _) {

    mod.Editor = BM.Layout.extend({

      template : 'jst:link_editor',

      className : 'fx-links-editor',

      ui : {
        'targetInput' : 'input.fx-target'
      },

      regions : {
        'targetPreview' : '.fx-target-preview'
      },

      events : {
        'click .fx-cancel' : 'onCancel',
        'click .fx-submit' : 'onSubmit',
        'click .fx-remove' : 'onRemove'
      },

      initialize: function() {
        // model: editable link
      },

      serializeData: function() {
        return {
          editLinkText : !! this.options.editLinkText,
          enableRemove : !! this.options.enableRemove
        };
      },

      onRender: function() {
        this._bindRivets();
        this._configureAutocomplete();
        this._previewCurrentDocument();
      },

      _bindRivets: function() {
        if (this.rivets) this.rivets.unbind();
        this.rivets = rivets.bind(this.$el, {
          editableLink : this.model,
          target       : this.model.get('target')
        });
      },

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
        this._clearLinkTarget();
        this._autocompleteDocumentTitle(req, res);
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

      _clearLinkTarget: function(doc) {
        this.model.unset('target_link');
        this.targetPreview.close();
      },

      _configureAutocompleteParameters: function(term) {
        return { prefix : term };
      },

      _onAutocompleteSelect: function(evt, ui) {
        evt.preventDefault();
        this._setLinkForDocument(ui.item.data);
      },

      _setLinkForDocument: function(doc) {
        if (!this._docIsTarget(doc)) {
          this._setLinkTarget(doc);
        }
      },

      _docIsTarget: function(doc) {
        var targetLink = this.model.get('target_link');
        return targetLink && (targetLink == doc.link);
      },

      _setLinkTarget: function(doc) {
        this.model.set({
          target_title : doc.title,
          target_link  : doc.link
        });
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

      _previewCurrentDocument: function() {
        var linkId = this.model.get('target_link');
        if (linkId) { this._previewDocument(linkId); }
      },

      onLightbox: function() {
        this.ui.targetInput.focus();
      },

      onCancel: function() {
        this.submit = false;
        this.$el.trigger('close');
      },

      onRemove: function() {
        this.removeLink = true;
        this.$el.trigger('close');
      },

      onSubmit: function(e) {
        e.preventDefault();
        this._submit();
      },

      _submit: function() {
        this.submit = true;
        this.$el.trigger('close');
      }

    });

  });

}).call({}, window);
