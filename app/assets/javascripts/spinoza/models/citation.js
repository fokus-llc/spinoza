(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    var contributorTypes = [
      'author', 'editor', 'translator'
    ];

    mod.Citation = BB.Model.extend({

      parse: function(props) {
        var parsed = this._locatorProperties(props);
        parsed.id = this._calculateId(parsed);
        return parsed;
      },

      _locatorProperties: function(props) {
        var parsed = {};
        if (props.pages || props.page) {
          parsed.label = 'page';
          parsed.locator = (props.pages || props.page);
        }
        return parsed;
      },

      _calculateId: function(props) {
        return (props.label === 'page') ? ('pp.' + props.locator) : 'default';
      },

      contributors: function() {
        return (this._contributors ||
                (this._contributors = this._buildContributors()));
      },

      _buildContributors: function() {
        var model = this,
          contributors = new mod.Contributors();
        _.each(contributorTypes, function(contributorType) {
          if (model.has(contributorType)) {
            var typedContributors = model._parseTypedContributors(contributorType);
            contributors.add(typedContributors);
          }
        });
        return contributors;
      },

      _parseTypedContributors: function(contributorType) {
        var contributorData = this.get(contributorType);
        return _.map(contributorData, function(contributorDatum) {
          return _.extend({}, contributorDatum, {
            contributorType : contributorType
          });
        });
      }

    });

  });

}).call({}, linkage);
