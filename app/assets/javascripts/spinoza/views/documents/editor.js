(function(root, undefined) {

  var window = root.window,
    console = root.console,
    app = root.Spinoza,
    rivets = root.rivets,
    FokusWysiwymControls = root.FokusWysiwymControls,
    FokusLinks = root.FokusLinks,
    MarkdownViewMixin = app.Components.MarkdownViewMixin,
    CSLRenderer = app.Components.CSLRenderer,

    maxDelay = 3000; // conversions

  // favor the bottom when the text first overflows the window
  function getScrollPos (element) {
    return (element.scrollHeight <= element.clientHeight) ?
      1.0 : (element.scrollTop / (element.scrollHeight - element.clientHeight));
  }

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    mod.Editor = BM.ItemView.extend(_.defaults({

      tagName  : 'form',
      template : 'jst:document_editor',

      ui : {
        projects          : '.fx-projects',
        markdownContainer : '.fx-markdown-input',
        markdownInput     : '.fx-markdown-input textarea',
        previewContainer  : '.fx-preview',
        preview           : '.fx-output'
      },

      initialize: function() {
        this._initializeDynamicProjects();
        this._initializeManagedReferences();

        this.images = this.model.images();

        this._configureMarkdownRenderer();
        this._initialEvents();
      },

      _initializeDynamicProjects: function() {
        this.projects = new app.Collections.PublicProjects();
        this._projectsLoaded = this._loadProjects();
      },

      _loadProjects: function() {
        return this.projects.fetch().fail(function() {
          console.log("Failed to load projects");
        });
      },

      _initializeManagedReferences: function() {
        var references = this.references = this.model.references();
        this.citeManager = this._initializeCitationManager(references);
        this.cslRenderer = new CSLRenderer(references);
      },

      _initializeCitationManager: function(references) {
        return new app.Components.EditingCitationManager(null, {
          references : references
        });
      },

      _configureMarkdownRenderer: function() {
        var citeFormatter = this._buildCitationFormatter(),
          imager = new app.Components.ImageFormatter(this.images),
          linker = new FokusLinks.EditingFormatter(this.model.documentLinks());
        return this.initializeMarkdownRenderer(citeFormatter, imager, linker);
      },

      _buildCitationFormatter: function() {
        var citeManager = this.citeManager;
        return new app.Components.EditingInlineCitationFormatter(citeManager);
      },

      _initialEvents: function() {
        this.on('edit', this._refreshMarkdownPreview, this); // widget-triggered
      },

      onRender: function() {
        this._bindRivets();
        this._renderProjectsSelector();
        this._initializeMarkdownEditor();
        this._insertSidebar();
      },

      _bindRivets: function() {
        rivets.bind(this.$el, {
          document : this.model
        });
      },

      _renderProjectsSelector: function() {
        var view = this;
        this._projectsLoaded.then(function() {
          var selectorView = new app.Views.Projects.Selector({
            // selectAttributes : { 'data-bind-value' : 'filter:project' },
            collection : view.projects
          });
          view.ui.projects.append(selectorView.render().$el);
        });
      },

      _initializeMarkdownEditor: function() {
        this._initializeMarkdownInterface(); // only run once
        this._bindMarkdownEditorEvents(); // un/re-bound on mode change
        this._refreshMarkdownPreview(); // IfStale ???
      },

      _initializeMarkdownInterface: function() {
        if (!this._initializedMarkdownInterface) {
          this._initializeWysiwym();
          this._initializeMarkdownPreview();
          this._initializedMarkdownInterface = true;
        }
      },

      _initializeWysiwym: function() {
        this.ui.markdownInput.val(this.model.markdown());
        this.ui.markdownInput.wysiwym(FokusWysiwymControls, {
          helpEnabled : true
        });
        this.ui.markdownInput.markup.listener = this; // receives "edit" event
        this.ui.markdownContainer.removeClass('hidden');
      },

      _initializeMarkdownPreview: function() {
        this._refreshMarkdownPreview();
        this._markdownPreviewScrollPos = 0.0;
        this._restoreScrollPositions();
        this.ui.previewContainer.removeClass('hidden');
      },

      _refreshMarkdownPreview: function() {
        var markdown = this.ui.markdownInput.val(),
          html = this._renderMarkdownTimed(markdown);
        this._setMarkdownPreviewHtml(html);
        this._lastMarkdown = markdown;
      },

      _renderMarkdownTimed: function(text, opts) {
        var endTime, startTime = new Date().getTime();
          html = this._renderMarkdownWithReferences(text, opts);
        endTime = new Date().getTime();
        this.lastRenderDuration = endTime - startTime;
        return html;
      },

      _renderMarkdownWithReferences: function(markdown, opts) {
        this._invalidateReferences();
        var $html = $(this.markdownRenderer.render(markdown, opts));
        this.renderInlineCitations($html);
        return $html;
      },

      _invalidateReferences: function() {
        this.citeManager.invalidateReferences();
      },

      // override
      renderInlineCitations: function($html) {
        var view = this;
        this.$el.find('cite').each(function(i, el) {
          var $cite = $(el), refCite = view._dataForCiteElement($cite);
          if (refCite) {
            $cite.html(view._renderInlineCitation(refCite[0], refCite[1]));
            $cite.after(view._renderBibliographicalEntry(refCite[0].id));
          }
        });
      },

      _setMarkdownPreviewHtml: function(html) {
        this._markdownPreviewScrollPos = getScrollPos(this.ui.preview[0]);
        this.ui.preview.html(html);
        this._restoreScrollPositions();
      },

      _restoreScrollPositions: function() {
        // hack for IE: setting scrollTop ensures scrollHeight
        // has been updated after a change in contents
        var previewPane = this.ui.preview[0];
        previewPane.scrollTop =
          (previewPane.scrollHeight - previewPane.clientHeight) *
          this._markdownPreviewScrollPos;
      },

      _insertSidebar: function() {
        var sidebar = this._buildSidebar();
        $('#fl-primary').before(sidebar.render().$el);
      },

      _buildSidebar: function() {
        return new mod.EditorSidebar({ model : this.model });
      },

      _bindMarkdownEditorEvents: function() {
        this._bindKeyUp();
        this._bindPaste();
        this._bindInput();
        this._bindCustom();
      },

      _bindKeyUp: function() {
        var editor = this;
        this.oldWindowOnKeyUp = window.onkeyup;
        window.onkeyup = this.ui.markdownInput[0].onkeyup =
          function() { return editor.onTextInput.apply(editor, arguments); }
      },

      onTextInput: function() {
        this._cancelScheduledConversion();
        this._scheduleConversion();
      },

      _cancelScheduledConversion: function() {
        var timer = this.convertTextTimer;
        if (timer) {
          window.clearTimeout(timer);
          delete this.convertTextTimer;
        }
      },

      _scheduleConversion: function() {
        var editor = this,
          timeUntilConvertText = this.lastRenderDuration || 0;
        if (timeUntilConvertText > maxDelay) timeUntilConvertText = maxDelay;

        this.convertTextTimer = window.setTimeout(function() {
          editor._refreshMarkdownPreviewIfStale();
        }, timeUntilConvertText);
      },

      _refreshMarkdownPreviewIfStale: function() {
        if (this._markdownPreviewIsStale()) { this._refreshMarkdownPreview(); }
      },

      _markdownPreviewIsStale: function() {
        var text = this.ui.markdownInput.val();
        return (text && (text !== this._lastMarkdown)); // blank?
      },

      _bindPaste: function() {
        var editor = this;
        this._startPastePoll();
        this.ui.markdownInput.bind('paste', function() {
          editor._onPaste.apply(editor, arguments);
        });
      },

      _startPastePoll: function() {
        var editor = this;
        this.pollingFallback = window.setInterval(function() {
          if (editor.ui.markdownInput.val() !== editor._lastMarkdown) {
            editor.onTextInput();
          }
        }, 1000);
      },

      _onPaste: function() {
        this._cancelPastePoll();
        this.onTextInput();
      },

      _cancelPastePoll: function() {
        var pollingFallback = this.pollingFallback;
        if (pollingFallback !== undefined) {
          window.clearInterval(pollingFallback);
          delete this.pollingFallback;
        }
      },

      _bindInput: function() {
        var markdownInput = this.ui.markdownInput[0];
        if (markdownInput.addEventListener) {
          var editor     = this;
            boundOnPaste = function() { return editor._onPaste(); };
          markdownInput.addEventListener('input', boundOnPaste, false);
          this.inputListener = boundOnPaste;
        }
      },

      _bindCustom: function() {
        var editor     = this;
          boundOnPaste = function() { return editor._onPaste(); };
        this.ui.markdownInput.bind('wysiwym', boundOnPaste);
        this.customListener = boundOnPaste;
      }

    }, MarkdownViewMixin));

  });

}).call({}, window);
