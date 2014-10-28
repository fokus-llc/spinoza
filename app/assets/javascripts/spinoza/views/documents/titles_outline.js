(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var OutlineEmpty = BM.ItemView.extend({
      tagName   : 'li',
      className : 'fg-empty',
      template  : function() { return ''; }
    });

    var OutlineItem = BM.ItemView.extend({
      tagName  : 'li',
      template : 'jst:collection_title_item',
      serializeData: function() {
        var json = this.model.toJSON(),
          links = json.links,
          dateLinks = links ? links['has-locus'] : {},
          dateLink = _.values(dateLinks)[0],
          date = dateLink ? dateLink.time_range : '';
        return {
          target_link : json.target_link,
          title       : json.title,
          date        : date
        };
      }
    });

    mod.TitlesOutline = BM.CollectionView.extend({
      tagName   : 'ul',
      className : 'fg-undecorated',
      itemView  : OutlineItem,
      emptyView : OutlineEmpty
    });

  });

}).call({}, window);
