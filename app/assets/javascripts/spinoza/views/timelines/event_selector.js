(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Timelines", function(mod, app, BB, BM, $, _) {

    mod.EventOption = BM.ItemView.extend({
      template      : 'jst:event_option',
      tagName       : 'li',
      serializeData : function() {
        var model = this.model;
        return {
          id      : model.get('id'),
          name    : model.get('name'),
          checked : !! model.selected
        };

      }
    });

    mod.EventOptionEmpty = BM.ItemView.extend({
      template : 'jst:event_option_empty'
    });

    mod.EventSelector = BM.CollectionView.extend({

      tagName   : 'ul',
      className : 'fg-undecorated',

      itemView : mod.EventOption,
      emptyView : mod.EventOptionEmpty,

      events : {
        'change input[type="checkbox"]' : 'selectEvent'
      },

      initialize: function() {
        this.revision = this.options.revision;
        this.initialEvents();
        if (this.revision) { this.loadOptions(); }
      },

      initialEvents: function() {
        if (this.revision) {
          this.listenTo(this.revision, 'change', this.resetSelections);
        }
      },

      sourceUrl: function() {
        return '/branches/' + this.revision.get('branch_id') + '/events?' +
          $.param({
            complete  : 'standalone', // ???
            published : this.revision.get('is_published') ? 'true' : 'false'
          });
      },

      loadOptions: function() {
        this.collection.url = this.sourceUrl();
        this.collection.fetch();
      },

      resetSelections: function() {
        this.collection.each(function(tl) { tl.selected = false; });
        this.loadOptions();
      },

      selectEvent: function(evt) {
        if ($(evt.target).prop('checked')) {
          var eventId = $(evt.target).val(),
            tlEvent = this.collection.get(eventId);
          if (tlEvent) { tlEvent.selected = true };
        }
        else {
          var eventId = $(evt.target).val(),
            tlEvent = this.collection.get(eventId);
          if (tlEvent) { tlEvent.selected = false };
        }
      }

    });

  });

}).call({}, window);
