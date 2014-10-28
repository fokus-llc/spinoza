(function(root, undefined) {

  var app = root.Spinoza,
    PaginatedCollection = root.PaginatedCollection;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var Concept = mod.Concept = BB.Model.extend({

      idAttribute: 'concept_id',

      urlRoot : app.Config.dataUrl('/public/concepts'),

      children: function() {
        return this._children || (this._children = this._buildChildren());
      },

      _buildChildren: function() {
        return new app.Collections.Concepts();
      }

    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      var Concepts = mod.Concepts = PaginatedCollection.extend({

        initialize : function(models, options) {
          this.options = options;
        },

        url : app.Config.dataUrl('/public/concepts'),

        model: Concept,

        fetch: function(options) {
          options || (options = {});
          var query = this.queryOptions(options);
          options.url = _.result(this, 'url') + '?' + $.param(query);
          return PaginatedCollection.prototype.fetch.call(this, options);
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}), 'project', 'parent', 'offset', 'limit');
        },

        linkChildren: function() {
          var conceptsByParent = this.conceptsByParent();
          this.each(function(concept) {
            var children = conceptsByParent[concept.id];
            concept._children = new app.Collections.Concepts(children);
          });
          return conceptsByParent[null][0];
        },

        conceptsByParent: function() {
          var conceptsByParent = {};
          this.each(function(concept) {
            var parentId = concept.get('parent_concept_id') || null,
              parentedConcepts = conceptsByParent[parentId] || (conceptsByParent[parentId] = []);
            parentedConcepts.push(concept);
          });
          return conceptsByParent;
        }

      });

    });

  });

}).call({}, linkage);
