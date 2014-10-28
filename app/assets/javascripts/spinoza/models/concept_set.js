(function(root, undefined) {

  var app = root.Spinoza,
    LocalPaginatedCollection = root.LocalPaginatedCollection;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var ConceptSet = mod.ConceptSet = BB.Model.extend({

      idAttribute : 'concept_set_id',

      urlRoot : app.Config.dataUrl('/public/concept-sets'),

      children: function() {
        return this._children || (this._children = this._buildChildren());
      },

      _buildChildren: function() {
        return new app.Collections.ConceptSets(this.get('children'));
      }

    });

    mod.NullConceptSet = BB.Model.extend({

      children: function() {
        return this._children || (this._children = this._buildChildren());
      },

      _buildChildren: function() {
        return new LocalPaginatedCollection();
      },

      sync: function(method, model, options) {
        var deferred = new $.Deferred().resolve();
        return deferred.promise();
      }

    });

    var ConceptSets = app.Collections.ConceptSets = BB.Collection.extend({
      model : ConceptSet
    });

  });

}).call({}, linkage);
