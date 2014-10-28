(function(root, undefined) {

  var app = root.Spinoza,
    MarkdownViewMixin = app.Components.MarkdownViewMixin,
    CiteUtilities = app.Views.Citations.Utilities;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.Detail = BM.ItemView.extend(_.defaults({

      tagName  : 'article',

      ui : {
        body      : '.fx-article-body',
        geography : '.fx-geography',
        relations : '.fx-links'
      },

      template : 'jst:document_detail',

      initialize: function(citer, imager, linker) {
        this.links      = this.model.documentLinks();
        this.references = this.model.references();
        this.images     = this.model.images();

        this._configureCitations();
        this._configureMarkdown();
      },

      _configureMarkdown: function() {
        var imager = (this.options.imager ||
                      new app.Components.ImageFormatter(this.images)),
          linker = (this.options.linker ||
                    new FokusLinks.LinkedFormatter(this.links));
        var renderer = this._buildMarkdownRenderer(this.citer, imager, linker);
        this._initializeMarkdown(renderer);
      },

      _configureCitations: function() {
        this.citer = (this.options.citer ||
                      new app.Components.InlineCitationFormatter(this.references));
      },

      serializeData : function() {
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
        this._renderRelations();
        this._insertSidebar();
        this._postProcessImages();
        this._configureCitationPopups();
        // if (this.model.hasGeography()) { this._renderGeography(); }
      },

      _setDocumentType: function() {
        $('#fv-articles').addClass('fv-narratives');
      },

      _renderRelations: function() {
        var relationsView = new app.Views.Documents.Relations({ model: this.model });
        this.ui.relations.append( relationsView.render().$el );
      },

      _postProcessImages: function() {
        this.ui.body.find('.fg-img-container').each(function(i, div) {
          var $div = $(div), img = $div.find('img'), width = $(img).attr('width');
          if (width != null) { // ==
            $div.css('width', width);
          }
        });
      },

      _configureCitationPopups: function() {
        var view = this;
        CiteUtilities.configureTooltips(view, 'cite', function() {
          var title = $(this).attr('data-reference-title');
          return view.citer.renderBibliography(title);
        });
        $('body').delegate('.csl-entry a', 'click', function(e) {
          $(e.target).attr('target', 'blank');
        });
      },

      _insertSidebar: function() {
        var sidebar = this._buildSidebar();
        $('#fl-primary').before(sidebar.render().$el);
        sidebar.resetTabContentHeight();
        $(window).resize(function() { sidebar.resetTabContentHeight(); });
      },

      _buildSidebar: function() {
        return new mod.Sidebar({ model : this.model });
      }

      /*
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
      }
      */

    }, MarkdownViewMixin));

  });

}).call({}, window);
