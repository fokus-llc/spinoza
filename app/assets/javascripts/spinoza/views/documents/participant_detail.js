(function(root, undefined) {

  var app = root.Spinoza,
    CSLRenderer = app.Components.CSLRenderer,
    MarkdownViewMixin = app.Components.MarkdownViewMixin;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var EventDocumentDetail = BM.ItemView.extend(_.defaults({

      tagName  : 'article',

      template : 'jst:participant_event_detail',

      ui : {
        'body'    : '.fx-article-body',
        relations : '.fx-links'
      },

      initialize: function() {

        this.links            = this.model.documentLinks();
        this.references       = this.model.references();
        this.images           = this.model.images();

        this._initializeCitationRenderer();

        this._configureMarkdown();

      },

      _initializeCitationRenderer: function() {
        this.cslRenderer = new CSLRenderer(this.references);
      },

      _configureMarkdown: function() {
        var citer = new app.Components.InlineCitationFormatter(this.references),
          imager = new app.Components.ImageFormatter(this.images),
          linker = new FokusLinks.LinkedFormatter(this.links);
        var renderer = this._buildMarkdownRenderer(citer, imager, linker);
        this._initializeMarkdown(renderer);
      },

      serializeData : function() {
        var json = this.model.toJSON(),
          links = (json.links || {});
        return {
          id           : json.link,
          title        : json.title,
          aliases      : _.keys(links['aliased-by']),
          date         : this.model.displayDate(),
          body         : this.renderBody(json.body)
        };
      },

      onRender: function() {
        this._renderRelations();
        this._postProcessImages();
      },

      _renderRelations: function() {
        var relationsView = new app.Views.Documents.Relations({ model: this.model });
        this.ui.relations.append( relationsView.render().$el );
      },

      _postProcessImages: function() {
        this.ui.body.find('.fg-img-container').each(function(i, div) {
          var $div = $(div), img = $div.find('img'), width = $(img).attr('width');
          if (width) { $div.css('width', width); }
        });
      }

    }, MarkdownViewMixin));

    mod.ParticipantDetail = BM.CompositeView.extend(_.defaults({

      tagName  : 'article',

      template : 'jst:document_detail',

      itemViewContainer : '.fx-article-members',
      itemView          : EventDocumentDetail,

      ui : {
        body   : '.fx-article-body',
        filter : '.fx-filter',
        geography : '.fx-geography'
      },

      initialize: function(options) {

        this.collection = this.model.participations();
        this.references = this.model.references();

        this._initializeCitationRenderer();

        this._configureMarkdown();

        this.filter = options.filter || this._buildFilter();
        this.filter.on('change', this.onFilterChange, this);
      },

      _initializeCitationRenderer: function() {
        this.cslRenderer = new CSLRenderer(this.references);
      },

      _configureMarkdown: function() {
        var citer = new app.Components.InlineCitationFormatter(this.references),
          imager = new app.Components.ImageFormatter(this.images),
          linker = new FokusLinks.LinkedFormatter(this.links);
        var renderer = this._buildMarkdownRenderer(citer, imager, linker);
        this._initializeMarkdown(renderer);
      },

      _buildFilter: function() {
        return new app.Models.PaginatedFilter({}, {
          paginator : this.collection.paginator
        });
      },

      onFilterChange: function() {
        var opts = this.filter.fetchOptions();
        this.collection.fetch(opts);
      },

      serializeData: function() {
        var json = this.model.toJSON(),
          links = (json.links || {}),
          incomingLinks = (json.incoming_links || {});
        return {
          type         : this.model.displayType(),
          entity_type  : this.model.get('entity_type'),
          title        : json.title,
          aliases      : _.keys(links['aliased-by']),
          roles        : _.keys(links['has-role']),
          relations    : this.serializeRelations(links, incomingLinks),
          date         : this.model.displayDate(),
          parties      : this.serializeParties(links),
          concepts     : links['related-to-concept'],
          associations : links['associated-with'],
          body         : this.renderBody(json.body),
          project      : json.project,
          assessed     : json.assessed,
          user         : json.user
        };
      },

      serializeParties: function(links) {
        var partyCount = 0, parties = {}, party_roles = [
          'has-participant',
          'has-observer',
          'has-authority',
          'has-passive-participant',
          'has-active-participant' // overrides others
        ];
        _.each(party_roles, function(party_role) {
          var partyLinks = links[party_role];
          if (partyLinks) {
            _.each(partyLinks, function(link, title) {
              partyCount += 1;
              parties[title] = link;
            });
          }
        });
        return partyCount === 0 ? null : parties;
      },

      serializeRelations: function(links, incomingLinks) {

        var excluded = {
          'linked-to'               : true,
          'aliased-by'              : true,
          'has-collection-member'   : true,
          'related-to-concept'      : true,
          'associated-with'         : true,
          'has-locus'               : true,
          'has-role'                : true,
          'has-participant'         : true,
          'has-observer'            : true,
          'has-authority'           : true,
          'has-passive-participant' : true,
          'has-active-participant'  : true
        };

        var incomingMap = {
          'in-place' : 'contains-place'
        };

        relations = {};

        _.each(links, function(typedRelations, relType) {
          if (!excluded[relType]) {
            relations[relType] = _.values(typedRelations);
          }
        });

        _.each(incomingLinks, function(typedRelations, relType) {
          var mappedType = incomingMap[relType];
          if (mappedType) {
            var rels = relations[mappedType];
            relations[mappedType] = rels ? rels.concat(typedRelations) : typedRelations;
          }
        });

        return _.isEmpty(relations) ? null : relations;
      },

      onRender: function() {
        this._setDocumentType();
        this._insertSidebar();
        this._postProcessImages();
        this._renderFilter();

        if (this.model.hasGeography()) { this._renderGeography(); }

        if (! this.collection.isEmpty()) {
          var $container = this.getItemViewContainer(this);
          $container.before('<h4>Timeline</h4>');
        }
      },

      _setDocumentType: function() {
        $('#fv-articles').addClass('fv-collections');
      },

      _insertSidebar: function() {
        var sidebar = this._buildSidebar();
        $('#fl-primary').before(sidebar.render().$el);
        sidebar.resetTabContentHeight();
        $(window).resize(function() { sidebar.resetTabContentHeight(); });
      },

      _buildSidebar: function() { // region?
        return new mod.ParticipationSidebar({ model : this.model, filter : this.filter });
      },

      _postProcessImages: function() {
        this.ui.body.find('.fg-img-container').each(function(i, div) {
          var $div = $(div), img = $div.find('img'), width = $(img).attr('width');
          if (width != null) { // ==
            $div.css('width', width);
          }
        });
      },

      _renderGeography: function() {
        var el = this.ui.geography[0],
          features = this.model.features();
        features.fetch().then(function() {
          var view = new app.Views.Geography.Map({
            el    : el,
            model : features
          });
          view.render();
        });
      },

      _renderFilter: function() {
        var filterView = new mod.MemberFilter({
          model : this.filter,
          el    : this.ui.filter
        });
        filterView.render();
      }

    }, MarkdownViewMixin));

  });

}).call({}, window);
