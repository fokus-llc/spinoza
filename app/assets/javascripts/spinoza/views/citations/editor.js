(function(root, undefined) {

  /*
   *
   * CSL variables
   * also consider HC1 interface
   *
   * note parameters:
   *
   * id
   * type (csl_source_type)
   * - article | book | gazette | code | document | database | archive | entry |
   * - document | memo | report | interview | code | hearing | bill | debate |
   * - work | statement | briefing | speech | episode | contract | web-page
   * title
   * note ("descriptor")
   *
   * issued (date format)
   * - date-parts [ YYYY, MM, DD ]
   * - literal
   *
   * author (contributors format)
   * - (family, given, non-dropping-particle, dropping-particle, suffix)
   * - literal
   *
   * container-title
   * publisher
   * publisher-location
   * volume
   * issue
   * page
   * ISBN
   * number
   * archive
   * annote (?)
   * URL
   *
   * citation parameters:
   * page
   *
   */

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Citations", function(mod, app, BB, BM, $, _) {

    mod.Editor = BM.Layout.extend({

      template : 'jst:citation_editor',

      className : 'fx-citation-editor',

      regions : {
        'typedCitation' : '.fx-source-details'
      },

      ui : {
        //'properties'   : '.fx-cite-properties',
        'typeSelector' : '.fx-citation-type',
        'pages'        : '.fx-print-only'
      },

      events : {
        'change .fx-citation-type' : 'onSourceTypeChange',
        'click .fx-submit'         : 'onSubmit',
        'click .fx-cancel'         : 'onCancel'
      },

      serializeData: function() {
        return {
          hasName : ! _.isEmpty(this.model.get('name')),
          isNew   : this.model.id == null
        };
      },

      initialize: function() {
        this._rememberCitationState();
        this.revision = this.options.revision;
      },

      _rememberCitationState: function() {
        this.savedReference = _.clone(this.model.attributes);
        // NOTE: assuming simple object
      },

      onRender: function() {
        var sourceType = this.model.get('source_type');
        this.ui.typeSelector.val(sourceType);
        this._renderTypedCitation();
        this._bindRivets();
      },

      _renderTypedCitation: function() {
        var view = new mod.TypedEditor({ model : this.model });
        this.typedCitation.show(view);
      },

      _bindRivets: function() {
        if (this.rivets) this.rivets.unbind();
        // NOTE: not using bound UI elements, since some elements are dynamically built
        var targets = this.$el.find('.fx-cite-binding');
        this.rivets = rivets.bind(targets, { citation : this.model });
      },

      onSourceTypeChange: function(e) {
        var sourceType = $(e.target).val();
        this.model.set('source_type', sourceType);
        // this._resetModel();
        //this._renderSourceEditor(sourceType);
      },

      /*
      _resetModel: function() { // name is not reset
        this.model.set('source', null);
        this.model.set('cited_extent', null);
        this.model.set('excerpt', null);
      },
      */

      _renderSourceEditor: function(sourceType) {

        // this.togglePages(sourceType);
      },

      togglePages: function(sourceType) {
        if (sourceType === 'WebPage') {
          this.ui.pages.hide();
        }
        else {
          this.ui.pages.show();
        }
      },

      onSubmit: function() {
        /*
        var errors = this.validateCitation();
        if (errors) { this.showErrors(errors); }
        else { this.$el.trigger('close'); }
        */
        this.submit = true;
        this.$el.trigger('close');
      },

      validateCitation: function() {
        var errors = {};
        if (_.isEmpty(this.model.get("name"))) {
          errors["Citation name"] = "can't be blank."
        }

        var source = this.model.get('source');
        var sourceType = source.get("source_type");
        if (_.isEmpty(source.get("name"))) {
          var displayType = (sourceType === "WebPage") ?
            "Web page" : sourceType;
          errors[displayType + " name"] = "can't be blank."
        }

        switch(sourceType) {
          case "Article":
            if (_.isEmpty(source.get("publication_name"))) {
              errors["Publication name"] = "can't be blank."
            }
            break;
          case "WebPage":
            if (_.isEmpty(source.get("publication_name"))) {
              errors["Web site name"] = "can't be blank."
            }
            if (_.isEmpty(source.get("urls"))) {
              errors["URL"] = "can't be blank."
            }
            break;
        }

        return _.isEmpty(errors) ? null : errors;
      },

      showErrors: function(errors) {
        var message = '';
        _.each(errors, function(v, k) {
          message += k + " " + v + " ";
        });
        alert(message);
      },

      onCancel: function() {
        this.restoreCitationState();
        this.onClose = null;
        this.$el.trigger('close');
      },

      restoreCitationState: function() {
        if (this.savedReference) {
          this.model.set(this.savedReference);
        }
      }

    });

  });

}).call({}, window);
