(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Projects", function(mod, app, BB, BM, $, _) {

    var SelectorOption = BM.ItemView.extend({

      tagName : 'option',

      template: function(data) { return data.name; },

      onRender: function() {
        this.$el.attr('value', this.model.get('slug'));
      }

    });

    mod.Selector = BM.CompositeView.extend({

      className : 'fg-labeled-input',
      template  : 'jst:selector',

      ui : { 'select' : 'select' },

      events : {
        'change select' : 'onSelectOption'
      },

      serializeData: function() {
        return {
          label : 'Project',
          name  : 'project'
        };
      },

      onRender: function() {
        var attributes = this.options.selectAttributes;
        if (attributes) { this.ui.select.attr(attributes); }
      },

      onSelectOption: function() {
        var selected = this.ui.select.val();
        this.trigger('change', selected);
      },

      itemViewContainer : 'select',
      itemView : SelectorOption

    });

  });

}).call({}, window);
