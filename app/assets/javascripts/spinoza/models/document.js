(function(root, undefined) {

  var app = root.Spinoza,
    PaginatedCollection = root.PaginatedCollection,
    LocalPaginatedCollection = root.LocalPaginatedCollection,
    TYPE_MARKDOWN = 'text/vnd.fokus.markdown';

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var Document = mod.Document = mod.LinkedDocument = BB.Model.extend({

      urlRoot : app.Config.dataUrl('/public/linked/documents'),

      idAttribute: 'link',

      titleSlug: function() {
        return _.str.slugify(this.get('title'));
      },

      clientUrl: function() {
        var entityId = this.get('entity_id');
        return entityId ? this.clientEntityUrl() : this.clientArticleUrl();
      },

      clientEntityUrl: function() {
        return [
          '/topics/',
          this.titleSlug(),
          '?',
          $.param({ topic_id : this.get('entity_id') })
        ].join('');
      },

      clientArticleUrl: function() {
        return [
          '/articles/',
          this.titleSlug(),
          '?',
          $.param({ document_link : this.get('link') })
        ].join('');
      },

      toJSON: function() {
        var json = BB.Model.prototype.toJSON.apply(this, arguments);
        json.url = this.clientArticleUrl();
        return json;
      },

      markdown : function() {
        var body = this.get('body');
        if (body && (body.type === TYPE_MARKDOWN)) {
          return body.text;
        }
      },

      project: function() {
        return this._project || (this._project = this._buildProject());
      },

      _buildProject: function() {
        return new app.Models.Project({ slug : this.get('project') });
      },

      members: function() {
        return this._members || (this._members = this._buildMembers());
      },

      _buildMembers: function() {
        return this.isCollectionDocument() ?
          new app.Collections.Members(null, { link : this.id }) :
          new LocalPaginatedCollection();
      },

      participations: function() {
        return this._participations || (this._participations = this._buildParticipations());
      },

      _buildParticipations: function() {
        var entityId = this.get('entity_id');
        return entityId ?
          new app.Collections.Participations(null, { entity_id : entityId }) :
          new LocalPaginatedCollection();
      },

      conceptSet: function() {
        return this._conceptSet || (this._conceptSet = this._buildConceptSet());
      },

      _buildConceptSet: function() {
        var conceptSet = this.get('concept_set');
        return conceptSet ?
          new app.Models.ConceptSet(conceptSet) :
          new app.Models.NullConceptSet();
      },

      references: function() {
        return this._references || this._initializeReferences();
      },

      _initializeReferences: function() {
        if (!this._references) this.on('change:notes', this._resetReferences, this);
        return this._resetReferences();
      },

      _resetReferences: function() {
        this._references = this._buildKeyedCollection(this.get('notes'),
                                                      app.Collections.References);
        return this._references;
      },

      _buildKeyedCollection: function(keyedAttrs, Collection, key) {
        Collection || (Collection = BB.Collection);
        key        || (key = 'id');
        var collection = new Collection();
        _.each(keyedAttrs, function(attrs, keyValue) {
          attrs[key] = keyValue;
          collection.add(attrs, { parse : true });
        });
        return collection;
      },

      images: function() {
        return this._images || (this._images = this._buildImages());
      },

      _buildImages: function() {
        var assets = (this.get('assets') || {}),
          images = (assets.img || {});
        return this._buildKeyedCollection(images);
      },

      features: function() {
        return this._features || (this._features = this._buildFeatures());
      },

      _buildFeatures: function() {
        return new mod.GeographyCollection({ link : this.id });
      },

      documentLinks: function() {
        return this._documentLinks ||
          (this._documentLinks = this._initializeDocumentLinks());
      },

      _initializeDocumentLinks: function() {
        var links = this.get('links');
        if (!links) { this.set('links', (links = {})); }
        var linksByTarget = links['linked-to'] || (links['linked-to'] = {});
        return this._makeDocumentLinkCollection(linksByTarget);
      },

      _makeDocumentLinkCollection: function(linksByTarget) {
        var collection = new BB.Collection();
        _.map(linksByTarget, function(linkData, target) {
          var model = collection.add(linkData);
          model.set('id', target);
          model.set('target', target);
        });
        return collection;
      },

      pruneDocumentLinks: function(targetsToKeep) {
        var links = this._documentLinks,
          newLinks = new BB.Collection();
        _.each(targetsToKeep, function(target) {
          var link = links.get(target);
          if (link) { newLinks.add(link); }
        });
        this._documentLinks = newLinks;
      },

      factLinks: function() {
        return this._factLinks ||
          (this._factLinks = this._initializeFactLinks());
      },

      _initializeFactLinks: function() {
        var links = this.get('links');
        if (!links) { this.set('links', (links = {})); }
        return this._makeFactsCollection(links);
      },

      _makeFactsCollection: function(links) {
        var model = this,
          linkCollection = new BB.Collection(),
          linkTypes = _.keys(links).sort();
        _.each(linkTypes, function(linkType) {
          if (model._linkTypeIsFact(linkType)) {
            var typedLinks = links[linkType];
            _.each(typedLinks, function(link) { linkCollection.add(link); });
          }
        });
        return linkCollection;
      },

      // NOTE: ReleasedLinkPresenter already filtered has-prototype, defines
      _linkTypeIsFact: function(linkType) {
        // filtering: link_target_type is not document, less related-to-concept
        return (linkType === 'aliased-by') ||
          (linkType === 'has-locus') ||
          (linkType === 'established') || // ???
          (linkType === 'disestablished') ||
          (linkType === 'has-un-m-49-code') ||
          (linkType === 'has-iso-3166-alpha-2-code') ||
          (linkType === 'has-population') ||
          (linkType === 'has-role');
      },

      associationLinks: function() {
        return this._associationLinks ||
          (this._associationLinks = this._initializeAssociationLinks());
      },

      _initializeAssociationLinks: function() {
        var links = this.get('links');
        if (!links) { this.set('links', (links = {})); }
        return this._makeAssociationsCollection(links);
      },

      _makeAssociationsCollection: function(links) {
        var model = this,
          linkCollection = new BB.Collection(),
          linkTypes = _.keys(links).sort();
        _.each(linkTypes, function(linkType) {
          if (model._linkTypeIsAssociation(linkType)) {
            var typedLinks = links[linkType];
            _.each(typedLinks, function(link) { linkCollection.add(link); });
          }
        });
        return linkCollection;
      },

      // NOTE: ReleasedLinkPresenter already filtered has-prototype, defines
      _linkTypeIsAssociation: function(linkType) {
        // filtering where link_target_type is not document + linked-to
        return !this._linkTypeIsFact(linkType) &&
          (linkType !== 'related-to-concept') &&
          (linkType !== 'linked-to');
      },

      categoryLinks: function() {
        return this._categoryLinks ||
          (this._categoryLinks = this._initializeCategoryLinks());
      },

      _initializeCategoryLinks: function() {
        var links = this.get('links');
        if (!links) { this.set('links', (links = {})); }
        return this._makeCategoriesCollection(links);
      },

      _makeCategoriesCollection: function(links) {
        var model = this,
          linkCollection = new BB.Collection(),
          linkTypes = _.keys(links).sort();
        _.each(linkTypes, function(linkType) {
          if (linkType === 'related-to-concept') {
            var typedLinks = links[linkType];
            _.each(typedLinks, function(link) { linkCollection.add(link); });
          }
        });
        return linkCollection;
      },

      editedLinks: function() {
        var collection = [];
        this.documentLinks().each(function(link) {
          var attrs = _.omit(link.attributes, 'id', 'target'); // target used any more?
          collection.push(attrs);
        });
        this.factLinks().each(function(link) {
          collection.push(link.attributes);
        });
        this.associationLinks().each(function(link) {
          collection.push(link.attributes);
        });
        this.categoryLinks().each(function(link) {
          collection.push(link.attributes);
        });
        return collection;
      },

      // TODO: extract to helper
      displayType: function() {
        var type, documentType = this.get('document_type');
        if (this.isCollectionDocument()) {
          var collectionType = this.get('entity_type');
          if (collectionType === 'event') {
            type = 'timeline';
          }
          else {
            type = 'collection';
          }
        }
        else if (documentType === 'perspective') {
          type = this.get('entity_type');
        }
        return type;
      },

      isCollectionDocument: function() {
        return this.get('document_type') === 'collection';
      },

      documentEntityType: function(value) {
        if (arguments.length > 0) {
          this.setDocumentEntityType(value);
        }
        else {
          return [
            this.get('document_type'),
            this.get('entity_type')
          ].join(':');
        }
      },

      setDocumentEntityType: function(value) {
        if (value) {
          var tuple = value.split(":"),
            values = {
              document_type : tuple[0],
              entity_type   : tuple[1]
            };
          this.set(values);
        }
        else {
          this.unset('document_type');
          this.unset('entity_type');
        }
      },

      hasEntity: function() {
        return !! this.get('entity_id');
      },

      hasParticipantEntity: function() {
        return this.hasEntity() && this.get('entity_type') != 'event';
      },

      hasGeography: function() {
        var links = this.get('links') || {},
          loci = links['has-locus'],
          locusTitle = _.find(loci, function(v) { return v.target_link; });
        return !!locusTitle;
      },

      displayDate: function() {
        var links = this.get('links') || {},
          firstDate = _.keys(links['has-locus'])[0];
        return firstDate ? firstDate.split(/\s*@\s*/)[1] : null;
      }

    });

    var Collection = mod.Collection = Document.extend({

      clientUrl: function() {
        return [
          '/collections/',
          this.titleSlug(),
          '?',
          $.param({ document_link : this.get('link') })
        ].join('');
      }

    });

    var Member = mod.Member = Document.extend({

    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      var Documents = mod.Documents = PaginatedCollection.extend({

        initialize : function(models, options) {
          this.options = options;
        },

        url : app.Config.dataUrl('/public/documents'),

        model: Document,

        fetch: function(options) {
          options || (options = {});

          var query = this.queryOptions(options);
          options.url = _.result(this, 'url') + '?' + $.param(query);
          return PaginatedCollection.prototype.fetch.call(this, options);
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}),
                               'project', 'concept',
                               'document_type', 'entity_type',
                               'sort', 'offset', 'limit');
        }

      });

      var SparseDocuments = mod.SparseDocuments = SparsePaginatedCollection.extend({

        initialize : function(models, options) {
          this.options = options;
        },

        url : app.Config.dataUrl('/public/documents'),

        model: Document,

        fetch: function(options) {
          options || (options = {});

          var query = this.queryOptions(options);
          options.url = _.result(this, 'url') + '?' + $.param(query);
          return SparsePaginatedCollection.prototype.fetch.call(this, options);
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}),
                               'project', 'concept',
                               'document_type', 'entity_type',
                               'sort', 'offset', 'limit');
        }

      });

      // collection documents
      mod.Collections = Documents.extend({

        model: Collection,

        queryOptions: function(options) {
          options = _.extend({}, options, { document_type : 'collection' });
          return Documents.prototype.queryOptions.call(this, options);
        }

      });

      mod.Members = SparseDocuments.extend({

        // not inherited
        constructor: function(models, options) {
          options || (options = {});
          this.paginator = options.paginator || new Paginator();
          SparseCollection.apply(this, arguments);
        },

        model: Member,

        url : function() {
          var link = this.options.link;
          return app.Config.dataUrl('/public/linked/documents/' + link + '/members');
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}), 'concept', 'offset', 'limit');
        }

      });

      mod.Participations = Documents.extend({

        model: Member,

        url : function() {
          var entity_id = this.options.entity_id;
          return app.Config.dataUrl('/public/entities/' + entity_id + '/participation');
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}), 'offset', 'limit');
        }

      });

    });

  });

}).call({}, linkage);
