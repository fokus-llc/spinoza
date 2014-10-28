(function(root, undefined) {

  var _ = root._,
    BB = root.Backbone,
    FokusProperties = root.FokusProperties,
    mod = root.FokusEmbedHandler = {};

  var BaseRenderer = function() {
    this.initialize.apply(this, arguments);
  };
  BaseRenderer.extend = BB.Model.extend;

  mod.NullRenderer = BaseRenderer.extend({

    initialize: function() {},

    render: function(text) {
      return '';
    }

  });

  mod.DispatchedRenderer = BaseRenderer.extend({

    initialize: function(opts) {
      opts || (opts = {});
      this.handlers = opts.handlers || {};
    },

    render: function(text) {
      return this._renderProperties(this._parse(text));
    },

    _parse: function(text) {
      return FokusProperties.parse(text);
    },

    _renderProperties: function(properties) {
      var rendered = '';
      _.find(this.handlers, function (handler, key) {
        if (properties.hasOwnProperty(key)) {
          rendered += handler(properties[key], properties);
          return true;
        }
      });
      return rendered;
    }

  });

}).call({}, linkage);
