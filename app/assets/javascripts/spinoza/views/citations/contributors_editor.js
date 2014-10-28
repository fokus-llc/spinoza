(function(root, undefined) {

  var app = root.Spinoza,
    rivets = root.rivets;

  app.module("Views.Citations", function(mod, app, BB, BM, $, _) {

    mod.ContributorEditor = BM.ItemView.extend({

      template : 'jst:citation_contributor_editor',

      tagName : 'fieldset',

      events : {
        'click .fx-delete' : 'onClickDelete'
      },

      onRender: function() {
        this._bindRivets();
      },

      _bindRivets: function() {
        rivets.bind(this.$el, {
          contributor : this.model
        });
      },

      onClickDelete: function(e) {
        e.preventDefault();
        this.trigger('removeContributor');
      }

    });

    mod.ContributorsEditor = BM.CompositeView.extend({

      template : 'jst:citation_contributors_editor',

      ui : {
        'body'            : 'dd',
        'contributorRole' : 'select[name="contributorRole"]'
      },

      events : {
        'click button' : 'onButtonClick'
      },

      itemViewContainer : '.fx-instances',
      itemView          : mod.ContributorEditor,

      initialize: function() {
        this.on('itemview:removeContributor', function(itemView) {
          this.collection.remove(itemView.model);
        });
      },

      onButtonClick: function(e) {
        e.preventDefault();
        this._addBlankContributor();
      },

      _addBlankContributor: function() {
        var contributor = this._buildBlankContributor();
        this.collection.add(contributor);
      },

      _buildBlankContributor: function() {
        var contributorRole = this.ui.contributorRole.val();
        return new app.Models.Contributor({
          contributorRole : contributorRole
        });
      }

    });

  });

}).call({}, window);
