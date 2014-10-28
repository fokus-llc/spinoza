(function(root, undefined) {

  var window = root.window,
    app = root.Spinoza;

  app.module("Components", function(mod, app, BB, BM, $, _) {

    mod.EditingCitationManager = BB.Model.extend({

      initialize: function(model, options) {
        this.references      = options.references;
        this.priorReferences = new BB.Collection();
      },

      handleCitation: function(referenceId, props) {
        var ref = this._findOrCreateReference(referenceId),
          cite = this._findOrCreateCitation(ref, props);
        return [ ref, cite ];
      },

      _findOrCreateReference: function(referenceId) {
        return this._reuseReference(referenceId) ||
          this._recoverElapsedReference(referenceId) ||
          this._createReference(referenceId);
      },

      _reuseReference: function(referenceId) {
        return this.references.get(referenceId);
      },

      _recoverElapsedReference: function(referenceId) {
        var ref = this.priorReferences.get(referenceId);
        if (!ref) {
          // TODO: use levenshtein distance to locate best match in priors
          //       and/or modify parser to track offsets of citations
        }
        if (ref) {
          ref.citations().reset();
          this.references.add(ref);
        }
        return ref;
      },

      _createReference: function(refId) {
        var ref = new app.Models.Reference({
          id    : refId,
          name  : refId,
          title : refId
        });
        this.references.add(ref);
        return ref;
      },

      _findOrCreateCitation: function(ref, props) {
        var citations = ref.citations(),
          parsed = new app.Models.Citation(props, { parse : true }),
          cite = citations.get(parsed);
        if (!cite) {
          // if citation does not already exist, create it
          cite = citations.add(parsed);
        }
        return cite;
      },

      getReference: function(refCid) {
        return this.references.get(refCid);
      },

      getReferenceAndCitation: function(refCid, citeCid) {
        var refCite, ref = this.getReference(refCid);
        if (ref) {
          var cite = ref.citations().get(citeCid);
          if (cite) { refCite = [ ref, cite ]; }
        }
        return refCite;
      },

      invalidateReferences: function() {
        this.priorReferences.reset(this.references.models);
        this.references.reset();
      }

    });

  });

}).call({}, window);
