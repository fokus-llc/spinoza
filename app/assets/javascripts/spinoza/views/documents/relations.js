(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.Relations = BM.ItemView.extend({

      className: 'fv-relations',

      template: 'jst:document_relations',

      serializeData : function() {
        var json = this.model.toJSON(),
          links = (json.links || {}),
          incomingLinks = (json.incoming_links || {});
        return {
          id              : this.model.id,
          roles           : _.keys(links['has-role']),
          relations       : this.serializeRelations(links, incomingLinks),
          parties         : this.serializePartyLinks(links),
          associations    : links['associated-with'],
          concepts        : links['related-to-concept'],
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
      },

      serializePartyLinks: function(links) {
        var parties = _.reduce(this._serializedPartyRoles, function(memo, party_role) {
          var partyLinks = links[party_role];
          if (partyLinks) {
            _.each(partyLinks, function(link, title) { memo[title] = link; });
          }
          return memo;
        }, {});
        return _.size(parties) > 0 ? parties : null;
      },

      _serializedPartyRoles: [
        'has-participant',
        'has-observer',
        'has-authority',
        'has-passive-participant',
        'has-active-participant'
      ],

      onRender: function() {
        this.$el.tabs();
      }

    });

  });

}).call({}, window);
