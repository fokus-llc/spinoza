(function(root, undefined) {

  var app = root.Spinoza,
    FokusLinks = root.FokusLinks,
    RandomAccessCompositeView = root.RandomAccessCompositeView,
    CSLRenderer  = app.Components.CSLRenderer,
    MarkdownViewMixin = app.Components.MarkdownViewMixin;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var CollectionMemberDocumentDetail = BM.ItemView.extend(_.defaults({

      tagName  : 'article',

      template : 'jst:collection_member_document_detail',

      ui : {
        body      : '.fx-article-body',
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

    mod.CollectionDocumentDetail = RandomAccessCompositeView.extend(_.defaults({

      tagName  : 'article',

      template : 'jst:document_detail',

      itemViewContainer : '.fx-article-members',
      itemView          : CollectionMemberDocumentDetail,

      ui : {
        headerList : 'header dl',
        body       : '.fx-article-body',
        geography  : '.fx-geography',
        filter     : '.fx-filter',
        relations  : '.fx-links'
      },

      initialize: function(options) {

        this.collection       = this.model.members();
        this.filter           = options.filter || this._buildFilter();
        this.references       = this.model.references();

        this._initializeCitationRenderer();

        this._configureMarkdown();

        this.listenTo(this.filter, 'change', this.onFilterChange);
        this.listenTo(this.model, 'demandMember', this.onDemandMember);
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
        var filter = this.filter;
        filter.resetPagination();
        this.collection.reset(null, { silent :true }); // defer re-render
        this.collection.fetch(filter.fetchOptions());
      },

      onDemandMember: function(memberId, index) {
        var member = this.collection.get(memberId);
        if (member) {
          this.scrollToMember(member);
        }
        else {
          var view = this;
          this.loadMemberPage(memberId, index).then(function() {
            member = view.collection.get(memberId);
            view.scrollToMember(member);
          });
        }
      },

      scrollToTop: function() {
        $('#fl-main').scrollTo({ top : 0, left : 0 });
      },

      scrollToMember: function(member) {
        var anchorDomId = '#' + member.id,
          $anchor = $(anchorDomId),
          anchor = $anchor[0];
        $('#fl-main').scrollTo(anchor.offsetTop);
        $anchor.next('header').effect('highlight', { color : 'wheat' });
      },

      loadMemberPage: function(memberId, index) {
        var offset = this.offsetForIndex(index);
        return this.collection.fetch({ offset: offset, limit: 10 });
      },

      offsetForIndex: function(index) {
        return (index / 10) * 10;
      },

      serializeData : function() {
        var json = this.model.toJSON(),
          links = (json.links || {}),
          incomingLinks = (json.incoming_links || {});
        return {

          type            : this.model.displayType(),
          entity_type     : this.model.get('entity_type'),
          collection_type : this._collectionType(),

          title           : json.title,
          aliases         : _.keys(links['aliased-by']),
          date            : this.model.displayDate(),
          body            : this.renderBody(json.body),

          // project         : json.project,
          assessed        : json.assessed,
          user            : json.user

        };
      },

      _collectionType: function() {
        return (this.model.get('document_type') === 'collection') ? 'timeline' : null;
      },

      onRender: function() {
        this._renderProjectSummary();
        this._renderRelations();
        this._setContainerClass();
        this._insertSidebar();
        this._renderFilter();
      },

      _renderProjectSummary: function() {
        var project = this.model.project(),
          projectView = new app.Views.Projects.Summary({ model: project });
        this.ui.headerList.prepend( projectView.render().$el );
      },

      _renderRelations: function() {
        var relationsView = new app.Views.Documents.Relations({ model: this.model });
        this.ui.relations.append( relationsView.render().$el );
      },

      _setContainerClass: function() {
        $('#fv-articles').addClass('fv-collections');
      },

      _insertSidebar: function() {
        var sidebar = this._buildSidebar();
        $('#fl-primary').before(sidebar.render().$el);
        sidebar.resetTabContentHeight();
        $(window).resize(function() { sidebar.resetTabContentHeight(); });
      },

      _buildSidebar: function() {
        return new mod.CollectionSidebar({
          model  : this.model,
          filter : this.filter
        });
      },

      _renderFilter: function() {
        return new mod.MemberFilter({
          model : this.filter,
          el    : this.ui.filter
        }).render();
      }

    }, MarkdownViewMixin));

  });

}).call({}, window);
