(function(root, undefined) {

  var app  = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Timelines", function(mod, app, BB, BM, $, _) {

    mod.Editor = BM.Layout.extend({

      template : 'jst:timeline_editor',

      serializeData : function() {
        return {
          branches      : this.options.branches,
          branchId      : this.revision.get('branch_id'),
          parentId      : this.options.parentId,
          parentName    : this.options.parentName,
          eventArticles : this.options.eventArticles,
          isPublishable : this.options.isPublishable
        };
      },

      regions : {
        oldEventEditor : '.fx-old-event-editor',
        newEventEditor : '.fx-new-event-editor'
      },

      ui : {
        tabs               : '#fg-tabs',
        publicationControl : '.fx-published'
      },

      events : {
        'submit form' : 'onFormSubmit',
        'change select' : 'togglePublicationControls'
      },

      initialize: function() {
        this.revision = this.options.revision;
        this.oldEvents = new BB.Collection(this.options.eventArticles);
        this.oldEvents.each(function(evt) { evt.selected = true; });
        this.newEvents = new BB.Collection();
      },

      onRender: function() {

        this.ui.tabs.tabs();

        this.oldEventEditor.show(new app.Views.Timelines.EventSelector({
          collection : this.oldEvents
        }));

        this.newEventEditor.show(new app.Views.Timelines.EventSelector({
          collection : this.newEvents,
          revision   : this.revision
        }));

        this.bindRivets();
        if (this.revision.get('branch_id') !== 1) {
          this.ui.publicationControl.show();
        }
      },

      bindRivets: function() {
        rivets.bind(this.$el, {
          timeline : this.model,
          rev      : this.revision
        });
      },

      togglePublicationControls: function() {
        if (this.revision.get('branch_id') == 1) {
          this.ui.publicationControl.hide();
        }
        else {
          this.ui.publicationControl.show();
        }
      },

      onFormSubmit: function(e) {
        e.preventDefault();
        var view = this;
        this.saveEditedModel().then(function() {
          window.location =
            '/branches/' + view.revision.get('branch_id') +
            view.model.url();
        });
      },

      saveEditedModel: function() {
        var model = this.model;

        model.set('revision', this.revision);

        var events = [];
        this.oldEvents.each(function (te) {
          if (te.selected) { events.push(te.id); }
        });
        this.newEvents.each(function (te) {
          if (te.selected) { events.push(te.id); }
        });
        model.set('event_ids', events);

        return model.save();
      }

    });

  });

}).call({}, window);
