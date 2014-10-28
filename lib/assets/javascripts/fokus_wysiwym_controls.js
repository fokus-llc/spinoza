(function(root, undefined) {

  var _ = root._,
    BB = root.Backbone,
    Wysiwym = root.Wysiwym;

  /*
   * Implements Wysiwym.Markdown
   * Passed to $.wysiwym as a constructor
   * Initialized with textarea
   * Listener is an extension
   */
  var FokusWysiwymControls = root.FokusWysiwymControls = function(textarea) {
    this.textarea = textarea;

    // Evented Wysiwym.span
    this.span = function() {
      Wysiwym.span.apply(this, arguments);
      if (this.listener) { this.listener.trigger('edit'); }
    };

    // Evented Wysiwym.list
    this.list = function() {
      Wysiwym.list.apply(this, arguments);
      if (this.listener) { this.listener.trigger('edit'); }
    };

    this.buttons = [

      new Wysiwym.Button('Bold', this.span, {
        prefix : '**',
        suffix : '**',
        text   : 'strong text'
      }),
      new Wysiwym.Button('Italic', this.span, {
        prefix : '_',
        suffix : '_',
        text   : 'italic text'
      }),

      '|',

      new Wysiwym.Button('Bullet List', this.list, {
        prefix : '* ',
        wrap   : true
      }),
      new Wysiwym.Button('Number List', this.list, {
        prefix : '0. ',
        wrap   : true,
        regex  : /^\s*\d+\.\s/
      }),

      '|',

      /*
      new Wysiwym.Button('Heading 1',  this.list,  {
        prefix : '# ',
        wrap   : true
      }),

      new Wysiwym.Button('Heading 2',  this.list,  {
        prefix : '## ',
        wrap   : true
      }),

      new Wysiwym.Button('Heading 3',  this.list,  {
        prefix : '### ',
        wrap   : true
      }),
      */

      new Wysiwym.Button('Quote',  this.list,  {
        prefix : '> ',
        wrap   : true
      }),

    ];

    this.exitindentblankline = true;
    this.autoindents = [
      /^\s*\*\s/,
      /^\s*(\d+)\.\s/,
      /^\s*\>\s/
    ];

    this.help = [

      { label: 'Bold',   syntax: '**bold**' },
      { label: 'Italic', syntax: '_italics_' },

      { label: 'Bullet List', syntax: '* list item' },
      { label: 'Number List', syntax: '1. list item' },

      /*
      { label: 'Heading 1', syntax: '# Heading 1' },
      { label: 'Heading 2', syntax: '## Heading 2' },
      { label: 'Heading 3', syntax: '### Heading 3' },
      */

      { label: 'Quote', syntax: '&gt; quoted text' }

    ];

  };

  _.extend(FokusWysiwymControls, BB.Events);

}).call({}, window);
