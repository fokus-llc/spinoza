(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.Sidebar = BM.Layout.extend({

      className : 'fx-sidebar',
      template  : 'jst:document_sidebar',

      regions : {
        'bibliographyRegion' : '#fx-bibliography',
        'revisionsRegion'     : '#fx-revisions'
      },

      onRender: function() {
        this.$el.tabs();
        this._renderTabs();
        this.resetTabContentHeight();
      },

      _renderTabs: function() {
        this._renderBibliographyTag();
        this._renderRevisionsTab();
      },

      resetTabContentHeight: function() {
        var height = this.$el.height(),
          tabHeight = this.$('.ui-tabs-nav').height(),
          heightPx = '' + (height - (tabHeight + 30)) + 'px';
        this.$('.ui-tabs-panel').css({ height: heightPx });
      },

      _renderBibliographyTag: function() {
      },

      _renderRevisionsTab: function() {
        var revisions = new app.Collections.Revisions(null, {
            documentId : this.model.id
          }),
          revisionsView = new app.Views.Revisions.List({
            collection : revisions
          });
        this.revisionsRegion.show(revisionsView);

        revisions.fetch();
      }

    });

    var Link = BB.Model.extend({ idAttribute : 'target_link' }),
      LinkCollection = BB.Collection.extend({ model : Link });

    mod.CollectionSidebar = mod.Sidebar.extend({

      template  : 'jst:collection_sidebar',

      regions : {
        'conceptsRegion'   : '#fx-concepts',
        'titlesRegion'   : '#fx-titles',
        'datesRegion'    : '#fx-dates',
        'revisionsRegion' : '#fx-revisions'
      },

      initialize: function(options) {
        var links = this.model.get('links') || {},
          members = _.values(links['has-collection-member']);
        this.filter = options.filter;
        this.members = this._buildMembers(members);
      },

      _buildMembers: function(members) {
        members = _.sortBy(members, function(m) { return m.rank; });
        return new LinkCollection(members);
      },

      _renderTabs: function() {
        this._renderConceptsTab();
        this._renderTitlesTab();
        this._renderRevisionsTab();
      },

      _renderConceptsTab: function() {
        var sidebar = this,
          conceptSet = this.model.conceptSet(),
          conceptSetView = new app.Views.Concepts.SetOutline({
            model      : conceptSet,
            collection : conceptSet.children()
          });
        this.conceptsRegion.show(conceptSetView);
        conceptSetView.$('.fx-concept').click(function(e) {
          e.preventDefault();
          var slug = e.target.hash.replace('#', '');
          sidebar.filter.set({
            concept:       slug,
            concept_title: $(e.target).text()
          });
        });
      },

      _renderTitlesTab: function() {
        var sidebar = this,
          titlesView = new mod.TitlesOutline({ collection : this.members });
        this.titlesRegion.show(titlesView);
        titlesView.$('a').click(function(e) {
          e.preventDefault();
          var linkableId = e.target.hash.replace('#', '');
          sidebar._highlightMemberDocuments(linkableId);
        });
      },

      _highlightMemberDocuments: function(linkableId) {
        var member = this.members.get(linkableId),
          index = this.members.indexOf(member);
        this.model.trigger('demandMember', linkableId, index);
      }

    });

    mod.ParticipationSidebar = mod.Sidebar.extend({

      template  : 'jst:participation_sidebar',

      regions : {
        'titlesRegion'   : '#fx-titles'
      },

      initialize: function(options) {
        var links = this.model.get('links') || {},
          members = _.values(links['has-collection-member']);

        this.filter = options.filter;
        this.members = this._buildMembers(members);
      },

      _buildMembers: function(members) {
        members = _.sortBy(members, function(m) { return m.rank; });
        return new LinkCollection(members);
      },

      _renderTabs: function() {
      },

      serializeData : function() {
        var json = this.model.toJSON(),
          links = (json.links || {}),
          incomingLinks = (json.incoming_links || {});
        return {
          id              : this.model.id,
          roles           : _.keys(links['has-role']),
          relations       : this.serializeRelations(links, incomingLinks),
          // associations    : links['associated-with'],
          labels          : { associations : 'associations' }
        };
      },

      serializeRelations: function(links, incomingLinks) {
        var relations = {};
        this._serializeOutgoingLinks(links, relations);
        this._serializeIncomingLinks(incomingLinks, relations);
        return _.isEmpty(relations) ? null : relations;
      },

      _serializeOutgoingLinks: function(links, relations) {
        var excluded = this._excludedOutgoingLinks;
        _.each(links, function(typedRelations, relType) {
          if (!excluded[relType]) {
            relations[relType] = _.values(typedRelations);
          }
        });
      },

      _excludedOutgoingLinks: {
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
      },

      _serializeIncomingLinks: function(links, relations) {
        var incomingMap = this._incomingLinkMap;
        _.each(links, function(typedRelations, relType) {
          var mappedType = incomingMap[relType];
          if (mappedType) {
            var rels = relations[mappedType];
            relations[mappedType] = rels ? rels.concat(typedRelations) : typedRelations;
          }
        });
      },

      _incomingLinkMap: {
        'in-place' : 'contains-place'
      }

    });

  });

}).call({}, window);
