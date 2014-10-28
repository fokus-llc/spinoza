(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var Row = BM.ItemView.extend({
      template : 'jst:documents_timeline_row',
      tagName  : 'tr'
    });

    mod.TimelineTable = BM.CompositeView.extend({
      tagName           : 'table',
      template          : 'jst:documents_timeline_table',
      itemView          : Row,
      itemViewContainer : 'tbody'
    });

  });

}).call({}, window);
