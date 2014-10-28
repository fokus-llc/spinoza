(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var Row = BM.ItemView.extend({

      template : 'jst:documents_row',
      tagName  : 'tr',

      serializeData: function() {
        var json = this.model.toJSON();
        if (json.document_type === 'collection' && json.entity_type === 'event') {
          json.entity_type = 'timeline';
        }
        return json;
      }

    });

    var EmptyRow = BM.ItemView.extend({
      template  : 'jst:documents_empty_row',
      className : 'fg-empty',
      tagName   : 'tr'
    });

    var Table = mod.Table = BM.CompositeView.extend({

      tagName           : 'table',
      template          : 'jst:documents_table',

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

    var CollectionsRow = Row.extend({
      template : 'jst:collections_row'
    });

    var CollectionsEmptyRow = EmptyRow.extend({
      template : 'jst:collections_empty_row'
    });

    mod.CollectionsTable = Table.extend({
      template  : 'jst:collections_table',
      itemView  : CollectionsRow,
      emptyView : CollectionsEmptyRow
    });

  });

}).call({}, window);
