(function(root, undefined) {

  var app = root.Spinoza,
    CSLRenderer = app.Components.CSLRenderer,
    MarkdownViewMixin = app.Components.MarkdownViewMixin;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.DetailMember = BM.ItemView.extend(_.defaults({

      tagName  : 'article',

      ui : {
        'body' : '.fx-article-body'
      },

      template : 'jst:document_detail_member',

      serializeData : function() {
        var json = this.model.toJSON(),
          links = (json.links || {});
        return {
          id           : json.link,
          title        : json.title,
          aliases      : _.keys(links['aliased-by']),
          date         : this.model.displayDate(),
          parties      : this.serializeParties(links),
          concepts     : links['related-to-concept'],
          associations : links['associated-with'],
          body         : this.renderBody(json.body)
        };
      },

      serializeParties: function(links) {
        var partyCount = 0, parties = {}, party_roles = [
          'has-participant',
          'has-observer',
          'has-authority',
          'has-passive-participant',
          'has-active-participant' // overrides others
        ];
        _.each(party_roles, function(party_role) {
          var partyLinks = links[party_role];
          if (partyLinks) {
            _.each(partyLinks, function(link, title) {
              partyCount += 1;
              parties[title] = link;
            });
          }
        });
        return partyCount === 0 ? null : parties;
      },

      initialize: function() {
        this.links = this.model.documentLinks();
        this.references = this.model.references();
        this.images = this.model.images();
        this.cslRenderer = new CSLRenderer(this.references);

        var citer = new app.Components.InlineCitationFormatter(this.references),
          imager = new app.Components.ImageFormatter(this.images);
        this.markdownRenderer = this.initializeMarkdownRenderer(citer, imager);
      },

      onRender: function() {
        this._postProcessImages();
      },

      _postProcessImages: function() {
        this.ui.body.find('.fg-img-container').each(function(i, div) {
          var $div = $(div), img = $div.find('img'), width = $(img).attr('width');
          if (width != null) { // ==
            $div.css('width', width);
          }
        });
      }

    }, MarkdownViewMixin));

  });

}).call({}, window);
