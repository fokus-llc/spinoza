(function(root, undefined) {

  var app = root.Spinoza;
  app.module("Components", function(mod, app, BB, BM, $, _) {

    var BaseImageFormatter = function(images) {
      this.images = images || new BB.Collection();
    };
    BaseImageFormatter.extend = BB.Model.extend;

    var ImageFormatter = mod.ImageFormatter = BaseImageFormatter.extend({

      get: function(id) {
        return this.images.get(id);
      },

      render: function(id, props) {
        var rendered, spec = this.get(id);
        if (spec) {
          rendered = this._renderImageContainer(id, spec, props);
        }
        if (!rendered) {
          console.log("Encountered unknown image: " + id);
          rendered = '';
        }
        return rendered;
      },

      _renderImageContainer: function(id, spec, props) {
        var rendered = '',
          attrs = this._renderImageContainerAttributes(props);
        rendered += '<div ' + attrs + '>';
        rendered += this._renderImageTag(id, spec, props);
        rendered += this._renderCaption(id, props);
        rendered += '</div>';
        return rendered;
      },

      _renderImageContainerAttributes: function(props) {
        var classes = 'fg-img-container';
        if (props.position) {
          classes += ' fg-img-' + props.position;
        }
        return 'class="' + classes + '"';
      },

      _renderImageTag: function(id, spec, props) {
        var dataUri = this._renderDataUri(spec),
          attrs = this._renderImageAttributes(id, props);
        return '<img ' + attrs + ' src="' + dataUri + '"/>';
      },

      _renderImageAttributes: function(id, props) {
        var attrs = '',
          title = id;

        title.replace(/"/g, '&quot;');
        title.replace(/'/g, '&apos;');
        attrs += 'title="' + title + '" ';

        if (props.width) {
          attrs += ('width="' + props.width + '" ');
        }

        if (props.height) {
          attrs += ('height="' + props.height + '" ');
        }

        return attrs;
      },

      _renderDataUri: function(spec) {
        return 'data:' + spec.get('type') + ';base64,' + spec.get('data');
      },

      _renderCaption: function(id, props) {
        var rendered = '';
        if (props.caption || props.credit) {
          rendered += '<div class="fg-img-caption">';
          if (props.caption) {
            rendered += '<span class="fg-img-description">' + props.caption + '</span>';
          }
          if (props.credit) {
            rendered += '<span class="fg-img-credit">Source: ' + props.credit + '</span>';
          }
          rendered += '</div>';
        }
        return rendered;
      }

    });

    mod.EditingImageFormatter = ImageFormatter.extend({

      _renderImageContainer: function(id, spec, props) {
        return this._renderImageTag(id, spec, props);
      }

    });

  });

}).call({}, window);
