(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Concepts", function(mod, app, BB, BM, $, _) {

    var Row = BM.ItemView.extend({

      template : 'jst:concepts_row',
      tagName  : 'tr',

      serializeData: function() {
        var json = this.model.toJSON();
        if (json.name == json.short_name) {
          delete json.short_name;
        }
        return json;
      }

    });

    var EmptyRow = BM.ItemView.extend({
      template  : 'jst:concepts_empty_row',
      className : 'fg-empty',
      tagName   : 'tr'
    });

    var Table = mod.Table = BM.CompositeView.extend({

      tagName           : 'table',
      template          : 'jst:concepts_table',

      itemView          : Row,
      emptyView         : EmptyRow,
      itemViewContainer : 'tbody',

      showEmptyView: function() {
        return BM.CompositeView.prototype.showEmptyView.apply(this, arguments);
      },

      closeEmptyView: function() {
        return BM.CompositeView.prototype.closeEmptyView.apply(this, arguments);
      }

    });

  });

}).call({}, window);
