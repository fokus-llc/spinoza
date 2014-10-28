
(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Projects", function(mod, app, BB, BM, $, _) {

    var Row = BM.ItemView.extend({
      template : 'jst:projects_row',
      tagName  : 'tr'
    });

    var Table = mod.Table = BM.CompositeView.extend({

      tagName           : 'table',
      template          : 'jst:projects_table',

      itemView          : Row,
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
