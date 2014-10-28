(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Citations", function(mod, app, BB, BM, $, _) {

    var source_type_config = {

      "article" : [
        { "name" : "title", "required" : true },
        { "name" : "container-title", "required" : true, "label" : "Publication", "entity" : "periodical" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        //{ "name" : "contributor", "type" : "contributor", "plural" : true, "entity" : "agent", "link" : "has-authority", "tab" : "contributor" },
        { "name" : "contributors", "type" : "contributor", "tab" : "contributor" },
        { "name" : "volume", "tab" : "other" },
        { "name" : "issue", "tab" : "other" },
        { "name" : "page", "label" : "Page(s)", "tab" : "other" },
        //{ "name" : "URL", "plural" : true, "type" : "url", "tab" : "other" },
        { "name" : "URL", "type" : "url", "tab" : "other" },
        { "name" : "cited_extent", "label" : "Cited page(s)", "tab" : "extent" },
        { "name" : "excerpt", "label" : "Excerpt", "type" : "text", "tab" : "extent" }
      ],

      "book" : [
        { "name" : "title", "required" : true },
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "translator", "type" : "name", "plural" : true },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "publisher", "required" : true },
        { "name" : "publisher-location", "required" : true },
        { "name" : "ISBN" }, // TODO: lookup!
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "code" : [
        { "name" : "title", "required" : true },
        { "name" : "annote", "label" : "Legal citation" },
        { "name" : "issued", "label" : "Date", "type" : "date" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      // contract ???

      "document" : [
        { "name" : "title", "required" : true },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" }, // court
        { "name" : "editor", "type" : "name", "label" : "Preparer", "plural" : true },
        { "name" : "container-title", "label" : "Publication" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "note" }, // required: executive, "descriptor"
        { "name" : "number", "label" : "Document ID" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "archive" : [
        { "name" : "title", "required" : true },
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "editor", "type" : "name", "label" : "Preparer", "plural" : true },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "container-title", "label" : "Series" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "volume" },
        { "name" : "issue" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "entry" : [
        { "name" : "title", "required" : true },
        { "name" : "container-title", "required" : true, "label" : "Title of collection" },
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "editor", "type" : "name", "plural" : true }, // required for essay
        { "name" : "volume" },
        { "name" : "issued", "label" : "Date", "type" : "date" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "ISBN" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "film" : [
        { "name" : "title", "required" : true },
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "label" : "Director", "entity" : "agent", "link" : "has-authority" },
        { "name" : "issued", "label" : "Date", "type" : "date" },
        { "name" : "container-title", "label" : "Series" },
        { "name" : "publisher", "label" : "Publisher or studio" },
        { "name" : "volume" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "bill" : [
        { "name" : "title", "required" : true },
        { "name" : "author", "required" : true, "plural" : true, "label" : "Body or chamber" },
        { "name" : "annote", "required" : true, "label" : "Cohort and session" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "debate" : [
        { "name" : "title", "required" : true },
        { "name" : "author", "required" : true, "plural" : true, "label" : "Body or chamber" },
        { "name" : "annote", "required" : true, "label" : "Cohort and session" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "volume" },
        { "name" : "issue" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "hearing" : [
        { "name" : "title", "required" : true },
        { "name" : "author", "required" : true, "plural" : true, "label" : "Body or committee" },
        { "name" : "annote", "required" : true, "label" : "Cohort and session" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "gazette" : [
        { "name" : "title", "required" : true },
        { "name" : "container-title", "required" : true, "label" : "Publication" },
        { "name" : "author", "required" : true, "plural" : true, "label" : "Body or committee" },
        { "name" : "annote", "required" : true, "label" : "Cohort and session" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "volume" },
        { "name" : "issue" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "interview" : [
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "label" : "Interviewee", "entity" : "person", "link" : "has-authority" },
        { "name" : "editor", "type" : "name", "required" : true, "plural" : true, "label" : "Interviewer" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "title", "required" : true }, // ?!
        { "name" : "container-title", "required" : true, "label" : "Publication" },
        { "name" : "volume" },
        { "name" : "issue" },
        { "name" : "note" }, // required?!, "descriptor"
        { "name" : "publisher" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      // letter
      // manuscript

      "memo" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "editor", "type" : "name", "plural" : true, "label" : "Preparer" },
        { "name" : "number", "label" : "Document ID" },
        { "name" : "archive", "label" : "Document location" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      // policy

      "briefing" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "required" : true, "plural" : true, "label" : "Organization", "entity" : "organization", "link" : "has-authority" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "note" }, // required?!, "descriptor"
        { "name" : "number", "label" : "Document ID" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "statement" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "required" : true, "plural" : true, "label" : "Organization", "entity" : "organization", "link" : "has-authority" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "number", "label" : "Document ID" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "report" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "editor", "type" : "name", "required" : true, "plural" : true },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "number", "label" : "Document ID" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "speech" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "label" : "Speaker", "entity" : "person", "link" : "has-authority" },
        { "name" : "translator", "type" : "name", "plural" : true },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "container-title", "required" : true, "label" : "Publication" }, // required?!
        { "name" : "volume" },
        { "name" : "issue" },
        { "name" : "note" }, // required?!, "descriptor"
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "documentation" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "number", "label" : "Document ID" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "episode" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "container-title", "required" : true, "label" : "Program name" },
        { "name" : "publisher", "required" : true, "label" : "Network or station" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "note", "label" : "Format" }, // required?!, "descriptor"
        { "name" : "number", "label" : "Document ID" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "treaty" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "required" : true, "plural" : true, "label" : "Ministry or body" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "web-page" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "container-title", "required" : true, "label" : "Web site name" },
        { "name" : "author", "type" : "name", "required" : true, "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ],

      "work" : [
        { "name" : "title", "required" : true }, // ?!
        { "name" : "author", "type" : "name", "plural" : true, "entity" : "agent", "link" : "has-authority" },
        { "name" : "issued", "required" : true, "label" : "Date", "type" : "date" },
        { "name" : "container-title", "required" : true, "label" : "Publication" },
        { "name" : "publisher" },
        { "name" : "publisher-location" },
        { "name" : "editor", "type" : "name", "plural" : true },
        { "name" : "translator", "type" : "name", "plural" : true },
        { "name" : "volume" },
        { "name" : "issue" },
        { "name" : "note" }, // "descriptor"
        { "name" : "number", "label" : "Document ID" },
        { "name" : "page", "label" : "Page(s)" },
        { "name" : "URL", "plural" : true, "type" : "url" }
      ]

    };

    mod.TypedEditor = BM.ItemView.extend({

      template : 'jst:citation_typed_editor',

      ui : {
        'mainProperties'        : '#fx-cite-main .fg-properties',
        'contributorProperties' : '#fx-cite-contributor',
        'otherProperties'       : '#fx-cite-other .fg-properties',
        'extentProperties'      : '#fx-cite-extent .fg-properties'
      },

      /*
      events : {
        'click .fx-different' : 'onDifferentButton'
      },
      */

      initialize: function() {
        // this.revision = this.options.revision;
        this.citationType = this.model.get('source_type') || 'article';
        this.listenTo(this.model, 'change:source_type', this.resetSourceType);
      },

      resetSourceType: function() {
        this._resetProperties();
        this.citationType = this.model.get('source_type');
        this._renderTypedInputs();
      },

      _resetProperties: function() {
        this.ui.mainProperties.empty();
        this.ui.contributorProperties.empty();
        this.ui.otherProperties.empty();
        this.ui.extentProperties.empty();
      },

      serializeData: function() {
        return {
          hasId : (this.model.id !== null)
        };
      },

      onRender: function() {
        this.$el.tabs();
        this._renderTypedInputs();
        // ASSUME: rivets bound by parent editor
      },

      _renderTypedInputs: function() {
        var view = this, typedConfig = source_type_config[this.citationType];
        _.each(typedConfig, function(inputConfig) {
          var $def = view._buildEditableProperty(inputConfig),
            tab = view._tabForConfig(inputConfig.tab);
          tab.append($def);
        });
      },

      _tabForConfig: function(tab) {
        if (tab === "contributor") {
          return this.ui.contributorProperties;
        }
        else if (tab === "other") {
          return this.ui.otherProperties;
        }
        else if (tab === "extent") {
          return this.ui.extentProperties;
        }
        else {
          return this.ui.mainProperties;
        }
      },

      _buildEditableProperty: function(inputConfig) {
        if (inputConfig.type === 'contributor') {
          var contributorsEditor = new app.Views.Citations.ContributorsEditor({
            collection : this.model.contributors(),
            model      : this.model
          });
          return contributorsEditor.render().$el;
        }
        else {
          return this._buildSimpleProperty(inputConfig);
        }
      },

      _buildSimpleProperty: function(inputConfig) {
        var $input = this._buildTypedInput(inputConfig),
          name = (inputConfig.label || inputConfig.name),
          title = _.str.capitalize(name.replace('-', ' ')),
          $def = $('<dt/>').text(title).append($('<dd/>').append($input));
        return $def;
      },

      _buildTypedInput: function(inputConfig) {
        if (inputConfig.plural) {
          return this._buildPluralInputFieldset(inputConfig);
        }
        else {
          return this._buildSingleTypedInput(inputConfig);
        }
      },

      _buildPluralInputFieldset: function(inputConfig) {
        var $fieldset = $('<fieldset/>'),
          $add = $('<span/>').text('+'),
          $input = this._buildSingleTypedInput(inputConfig);
        $fieldset.append($input);
        $fieldset.append($add);
        return $fieldset;
      },

      _buildSingleTypedInput: function(inputConfig) {
        var $wrapper;
        if (inputConfig.type === "name") {
          $wrapper = this._buildNameInput(inputConfig);
        }
        else if (inputConfig.type === "text") {
          $wrapper = this._buildTextInput(inputConfig);
        }
        else {
          console.log("building generic");
          $wrapper = this._buildGenericInput(inputConfig);
        }
        return $wrapper;
      },

      _buildNameInput: function(inputConfig) {
        var $wrapper = $('<fieldset/>'),
          $input = $('<input type ="text" />').attr('size', '70'),
          $personName = this._buildPersonNameDialog(),
          $selector = this._buildNameTypeSelector(inputConfig);
        this._configureInput($input, inputConfig);
        $wrapper.append($input).append($('<br/>'));
        $wrapper.append($personName).append($('<br/>'));
        $wrapper.append($selector);
        return $wrapper;
      },

      _buildTextInput: function(inputConfig) {
        var $wrapper = $('<span/>'),
          $input = $('<textarea type ="text" />').attr('rows', '4');
        this._configureInput($input, inputConfig);
        $wrapper.append($input);
        return $wrapper;
      },

      _buildContributorInput: function(inputConfig) {
        // ...
      },

      _buildGenericInput: function(inputConfig) {
        var $wrapper = $('<span/>'),
          $input = $('<input type ="text" />').attr('size', '70');
        this._configureInput($input, inputConfig);
        $wrapper.append($input);
        return $wrapper;
      },

      _configureInput: function($input, inputConfig) {
        if (inputConfig.type === "date") {
          this._configureDateInput($input, inputConfig);
        }
        else if (inputConfig.entity) {
          this._configureEntityInput($input, inputConfig);
        }
        else {
          $input.attr('data-bind-value', 'citation:' + inputConfig.name);
        }
      },

      _configureDateInput: function($input, inputConfig) {
        var dateName = inputConfig.name,
          issued = this.model.get(dateName),
          editableDate = this._buildEditableDate(issued);
        this._bindEditableDate(editableDate, dateName);
        $input.datepick({
          dateFormat : 'd MM yyyy',
          onSelect   : function(dates) {
            var date = dates[0];
            if (date) { editableDate.configureForDate(date); }
            else { editableDate.clear(); }
          }
        });
        if (!_.isEmpty(editableDate.attributes)) {
          $input.datepick('setDate', editableDate.toDate());
        }
      },

      _buildEditableDate: function(issued) {
        var dateParts, date = new app.Models.EditableDate();
        if (issued && (dateParts = issued['date-parts'])) {
          date.set({
            year  : dateParts[0],
            month : dateParts[1],
            day   : dateParts[2]
          });
        }
        return date;
      },

      _bindEditableDate: function(editableDate, dateName) {
        var view = this;
        editableDate.on('change', function() {
          var dateParts = editableDate.toDateParts();
          view.model.set(dateName,  { 'date-parts' : dateParts });
        });
      },

      _configureEntityInput: function($input, inputConfig) {
        if (inputConfig.type === "name") {
          var namesAttr = inputConfig.name,
            names = this.model.get(namesAttr),
            name = (_.isArray(names) ? names[0] : names),
            editableName = this._buildEditableName(name);
          this._bindEditableName($input, editableName, namesAttr);
        }
        else {
          $input.attr('data-bind-value', 'citation:' + inputConfig.name);
        }
        this.configureAutocomplete($input, inputConfig);
      },

      _buildEditableName: function(name) {
        return new BB.Model(name);
      },

      _bindEditableName: function($input, editableName, namesAttr) {
        var literal = editableName.get('literal'),
          given = editableName.get('given'),
          family = editableName.get('family');
        if (literal) {
          //
        }
        else if (given || family) {
          literal = _.compact([ given, family ]).join(' ');
        }
        $input.val(literal);
      },

      _buildPersonNameDialog: function() {
        var $name = $('<span/>'),
          $givenLabel = $('<label/>').text('Given name'),
          $givenInput = $('<input type ="text" />'),
          $familyLabel = $('<label/>').text('Family name'),
          $familyInput = $('<input type ="text" />');
        $name.
          append($givenLabel).append($givenInput).
          append($familyLabel).append($familyInput);
        return $name;
      },

      // TODO: move this into separate view
      _buildNameTypeSelector: function(inputConfig) {
        var selectorName = 'nameType-' + inputConfig.name,
          $selector = $('<span/>'),
          $personRadio = $('<input/>').attr('type', 'radio').
            attr('name', selectorName).attr('value', 'person'),
          $orgRadio = $('<input/>').attr('type', 'radio').
            attr('name', selectorName).attr('value', 'organization'),
          $eitherRadio = $('<input/>').attr('type', 'radio').
            attr('name', selectorName).attr('value', 'either');

        $personRadio.prop('checked', true);

        $selector.
          append($personRadio).append($('<label/>').text('Person')).
          append($orgRadio).append($('<label/>').text('Organization')).
          append($eitherRadio).append($('<label/>').text('Either'));

        return $selector;
      },

      configureAutocomplete: function($input, inputConfig) {
        var view = this;

        $input.
          autocomplete({

            source : function(req, res) {

              var url = app.Config.
                dataUrl('/public/documents' + '?' + $.param({
                  document_type : 'perspective',
                  entity_type   : inputConfig.entity,
                  prefix        : req.term
                }));

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

            select : function(evt, ui) {
              evt.preventDefault();
              view._resetModel(ui.item.data);
              var $next = view.nextInput($input[0], 2); // skip autocomplete input
              if ($next) { $next.focus(); }
              return false;
            }

          });
      },

      _resetModel: function(data) {
        var sourceType = this.model.get('source_type') || 'Book';
        // findOrCreate to avoid creating duplicate models
        this.model = app.Models.Source.findOrCreate(data);
        this.model.set('source_type', sourceType);
        this.trigger('replace', this.model);
      },

      nextInput: function($cur, inc) {
        var $next = null, $inputs = this.$(':input');
        for (var i=0; i<$inputs.length; i++) {
          var $i = $inputs[i];
          if ($cur !== $i) continue;
          $next = $inputs[i + (inc ? inc : 1)];
          break;
        }
        return $next;
      },

      onDifferentButton: function() {
        this._resetModel({ name : this.model.get("name") });
      }

    });

  });

}).call({}, window);
