(function(root, undefined) {

  var app = root.Spinoza,
    AuthorizedModel = app.Components.AuthorizedModel;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    mod.Edition = AuthorizedModel.extend({

      initialize: function(options) {
        options || (options = {});
        this.document   = options.document;
        this.body       = options.body;
        this.links      = options.links;
        this.references = options.references;
        this.comments   = options.comments;
      },

      urlRoot: app.Config.dataUrl('/auth/revisions'),

      toJSON: function() {
        var dto = {}, doc = this.document;

        // either (parent) revision_id, or new document: project + document_type
        dto.parent_revision_id = doc.get("revision_id");
        dto.project = doc.get("project");
        dto.document_type = doc.get("document_type");

        dto.title = doc.get("title");

        // either entity_link, or if entity_type is provided, new entity
        dto.entity_link = doc.get("entity_link");
        dto.entity_type = doc.get("entity_type");

        dto.links = this.serializeLinks(doc.editedLinks()); // attributes
        dto.assets = this.serializeAssets(doc.get('assets'));

        dto.comments = this.comments;

        return dto;
      },

      serializeLinks: function(inputLinks) {
        return _.map(inputLinks, this.serializeLink, this);
      },

      serializeLink: function(inputLink) {
        var link = {};
        link.type = inputLink.link_type;
        link.title = inputLink.title;
        link.target_linkable_id = inputLink.target_link;
        link.time_range = inputLink.time_range;
        link.value = inputLink.value;
        return link;
      },

      serializeAssets: function(assetsByRole) {
        var edition = this, assets = [];
        if (this.body) {
          var bodyAsset = this.serializeBodyAsset(this.body);
          assets.push(bodyAsset);
        }
        if (this.references) {
          var referenceAssets = this.serializeReferenceAssets(this.references);
          assets = assets.concat(referenceAssets);
        }
        _.each(assetsByRole, function(assetsByName, assetRole) {
          _.each(assetsByName, function(namedAsset, assetName) {
            var asset = edition.serializeAsset(assetRole, assetName, namedAsset);
            assets.push(asset);
          });
        });
        return assets;
      },

      serializeBodyAsset: function(body) {
        return this.serializeAsset('main', 'definition', {
          type : 'text/vnd.fokus.markdown',
          data : body
        });
      },

      serializeReferenceAssets: function(refCollection) {
        var view = this;
        return refCollection.map(function(ref) {
          return view.serializeReferenceAsset(ref);
        });
      },

      serializeReferenceAsset: function(ref) {
        return this.serializeAsset('note', ref.id, {
          type : 'application/citeproc+json',
          data : JSON.stringify(ref.attributes)
        });
      },

      serializeAsset: function(assetRole, assetName, namedAsset) {
        var asset = {};
        asset.role    = assetRole;
        asset.title   = assetName;
        asset.type    = namedAsset.type;
        asset.content = namedAsset.data;
        return asset;
      }

    });

  });

}).call({}, linkage);
