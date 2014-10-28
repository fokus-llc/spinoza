(function(root, undefined) {

  var app = root.Spinoza,
    PaginatedCollection = root.PaginatedCollection,
    TYPE_MARKDOWN = 'text/vnd.fokus.markdown';

  app.module("Models", function(mod, app, BB, BM, $, _) {

    // shadows?
    var Entity = mod.Entity = BB.Model.extend({

      idAttribute: 'topic_id',

      titleSlug: function() {
        return _.str.slugify(this.get('title'));
      },

      clientUrl: function() {
        return [
          '/topics/',
          this.titleSlug(),
          '?',
          $.param({ topic_id : this.get('topic_id') })
        ].join('');
      },

      toJSON: function() {
        var json = BB.Model.prototype.toJSON.apply(this, arguments);
        json.url = this.clientUrl();
        return json;
      },

      urlRoot : app.Config.dataUrl('/public/topics'),

      documents: function() {
        return this._documents || (this._documents =
           new app.Collections.Documents(this.get('documents')));
      }

    });

    app.module("Collections", function(mod, app, BB, BM, $, _) {

      mod.Entity = PaginatedCollection.extend({

        url : app.Config.dataUrl('/public/topics'),

        model: Entity,

        fetch: function(options) {
          options || (options = {});

          var query = this.queryOptions(options);
          options.url = _.result(this, 'url') + '?' + $.param(query);
          return PaginatedCollection.prototype.fetch.call(this, options);
        },

        queryOptions: function(options) {
          return _.pickCompact((options || {}),
                               'entity_type', 'related_type',
                               'sort', 'offset', 'limit');
        }

      });

    });

  });

}).call({}, linkage);
