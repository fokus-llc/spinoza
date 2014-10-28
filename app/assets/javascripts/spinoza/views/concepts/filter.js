(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Concepts", function(mod, app, BB, BM, $, _) {

    mod.Filter = BM.ItemView.extend({

      tagName  : 'fieldset',
      template : 'jst:concepts_filter',

      initialize: function(options) {
        this.projects = options.projects;
      },

      onRender: function() {
        if (this.projects) { this.prependProjectSelector(this.projects); }
        this.bindRivets();
      },

      prependProjectSelector: function(projects) {
        this.$el.prepend(this.$renderProjectSelector(projects));
      },

      $renderProjectSelector: function(projects) {
        var view = new app.Views.Projects.Selector({
          selectAttributes : { 'data-bind-value' : 'filter:project' },
          collection       : projects
        });
        return view.render().$el;
      },

      bindRivets: function() {
        if (this.$el) {
          if (this.rivets) { this.rivets.unbind(); }
          this.rivets = rivets.bind(this.$el, { filter : this.model });
        }
      }

    });

  });

}).call({}, window);
