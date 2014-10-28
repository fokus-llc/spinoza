(function(root, undefined) {

  var app = root.Spinoza,
    L = root.L;

  app.module("Views.Geography", function(mod, app, BB, BM, $, _) {

    mod.Map = BM.ItemView.extend({

      template: 'jst:geography_map',

      initialize: function(options) {
        this.height = options.height || '400px';
      },

      serializeData : function() { return {}; },

      onRender: function() {
        this.$el.css({ height: this.height });
        this._renderMap();
      },

      _renderMap: function() {
        var map = this.map = L.map(this.$el[0]),
          tiles = this._makeOpenStreetMapTiles();
        map.addLayer(tiles);

        var features = this._makeFeatures();
        features.addTo(map);

        map.fitBounds(features.getBounds());

        return map;
      },

      _makeOpenStreetMapTiles: function(options) {
        var osm_template = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osm_url = 'http://openstreetmap.org',
          osm_credits = 'Map data © <a href="' + osm_url + '">OpenStreetMap</a> contributors',
          defaults = { attribution : osm_credits };
        return new L.TileLayer(osm_template, _.extend({}, defaults, options));
      },

      _makeFeatures: function() {
        var geo = this._geoJson(),
          popupName = function(feature, layer) {
            layer.bindPopup(feature.properties.name);
          };
        return L.geoJson(geo, { onEachFeature : popupName });
      },

      _geoJson: function() {
        var json = this.model.toJSON();
        delete json.link;
        //_.each(json.features, function(feature) {
        //});
        return json;
      }

    });

  });

}).call({}, window);
