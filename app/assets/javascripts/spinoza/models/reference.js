(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var Reference = mod.Reference = BB.Model.extend({

      parse: function(attrs, options) {
        var parsed = _.omit(attrs, 'page', 'pages');
        this._addCitationToReference(attrs);
        return parsed;
      },

      citations: function() {
        return this._citations || this._initializeCitations();
      },

      _initializeCitations: function() {
        this._citations = this._citations = new BB.Collection();
        return this._citations;
      },

      _addCitationToReference: function(attrs) {
        var cite = new mod.Citation(attrs, { parse : true });
        this.citations().add(cite);
      }

    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      mod.References = BB.Collection.extend({
        model : Reference
      });

    });

  });

}).call({}, linkage);
