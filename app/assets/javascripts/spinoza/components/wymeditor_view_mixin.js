(function(root, undefined) {

  var app = root.Spinoza,
    WYMeditor = root.WYMeditor;

  // handle events:
  // * edit-citation
  // * edit-link

  app.module("Components", function(mod, app, BB, BM, $, _) {

    var GuiEditorOptions = {

      wymPath  : '/wymeditor/',
      basePath : '/wymeditor/',

      logoHtml : '',

      toolsItems: [ // exec(item.name)

        {
          name : 'Bold',
          title : 'Strong',
          css : 'wym_tools_strong'
        },

        {
          name : 'Italic',
          title : 'Emphasis',
          css : 'wym_tools_emphasis'
        },

        {
          name : 'InsertOrderedList',
          title : 'Ordered_List',
          css : 'wym_tools_ordered_list'
        },

        {
          name : 'InsertUnorderedList',
          title : 'Unordered_List',
          css : 'wym_tools_unordered_list'
        },

        {
          name : 'EditLink',
          title : 'Link',
          css : 'wym_tools_link'
        },

        {
          name: 'InsertCitation',
          title: 'Citation',
          css: 'wym_tools_indent'
        }

      ],

      containersItems: [

        {
          name  : 'P',
          title : 'Paragraph',
          css   : 'wym_containers_p'
        },

        {
          name  : 'H1',
          title : 'Heading_1',
          css   : 'wym_containers_h1'
        },

        {
          name  : 'H2',
          title : 'Heading_2',
          css   : 'wym_containers_h2'
        },

        {
          name  : 'H3',
          title : 'Heading_3',
          css   : 'wym_containers_h3'
        },

        {
          name  : 'BLOCKQUOTE',
          title : 'Blockquote',
          css   : 'wym_containers_blockquote'
        }

      ]

    };

    mod.WymeditorViewMixin = {

      renderEditorWidget: function($target, opts) {
        var wymeditorOpts = this._buildEditorOptions(opts);
        $target.wymeditor(wymeditorOpts);
      },

      _buildEditorOptions: function(opts) {
        var wymeditorOpts = _.extend({}, GuiEditorOptions, opts);
        wymeditorOpts.customCommands = this._buildCustomCommands();
        return wymeditorOpts;
      },

      _buildCustomCommands: function() {
        var view = this;
        return [

          {
            name : 'EditLink',
            run : function() { view.trigger('edit-link', this); }
          },

          {
            name : 'InsertCitation',
            run : function() { view.trigger('edit-citation', this); }
          }

        ];
      }

    };

  });

}).call({}, linkage);
