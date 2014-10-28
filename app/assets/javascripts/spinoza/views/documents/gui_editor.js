(function(root, undefined) {

  var window = root.window,
    app = root.Spinoza,
    rivets = root.rivets,
    WYMeditor = root.WYMeditor,
    rangy = root.rangy,
    toMarkdown = root.toMarkdown,
    FokusLinks = root.FokusLinks,
    FokusMarkdown = root.FokusMarkdown;

  app.module("Views.Documents", function(mod, app, BB, BM, $, _) {

    var WymeditorViewMixin = app.Components.WymeditorViewMixin;

    mod.GuiEditor = BM.Layout.extend(_.defaults({

      template: 'jst:document_gui_editor',

      ui : {
        editor                 : 'textarea',
        articleProjectSelector : 'select[name="project"]',
        articleTypeSelector    : 'select[name="document_entity_type"]',
        cancelButton           : '.fx-cancel'
      },

      regions: {
        selectorRegion : '.fx-projects'
      },

      events : {
        'click .fx-submit' : 'onClickSubmit',
        'click .fx-cancel' : 'onClickCancel'
      },

      // initialize

      initialize: function() {
        this.citer = this._buildCitationFormatter();
        this.markdown = this._buildFokusMarkdown();
      },

      _buildCitationFormatter: function() {
        var refs = this.model.references();
        return new app.Components.GuiEditingCitationFormatter(refs);
      },

      _buildFokusMarkdown: function() {
        var renderer = this._buildMarkdownRenderer();
        return new FokusMarkdown({ renderer: renderer });
      },

      _buildMarkdownRenderer: function() {
        var links = this.model.documentLinks();
        return new FokusMarkdown.Renderer({
          linker        : new FokusLinks.GuiEditingFormatter(links),
          embedHandlers : this._configureEmbedHandlers()
        });
      },

      _configureEmbedHandlers: function() {
        var view = this,
          imager = new app.Components.EditingImageFormatter(this.model.images());
        return {
          cite  : function(name, props) { return view._formatCitation(name, props);  },
          image : function(name, props) { return imager.render(name, props); }
        };
      },

      _formatCitation: function(name, props) {
        return this.citer.format(name, props);
      },

      // onRender

      onRender: function() {
        this._bindRivets();
        this._initializeArticleProjectSelector();
        this._initializeEditorWidget();
        this._insertSidebar();
        this._configureArticleTypeSelector();
      },

      _bindRivets: function() {
        rivets.bind(this.$el, {
          document : this.model
        });
      },

      _initializeArticleProjectSelector: function() {
        if (! this.model.id) {
          var view = this,
            selector = this._buildArticleProjectSelector();
          selector.on('change', function(value) {
            view.model.set('project', value);
          });
          this.selectorRegion.show(selector);
        }
      },

      _buildArticleProjectSelector: function() {
        var view = this,
          projects = new app.Collections.WritableProjects();
        projects.fetch().then(function() {
          view._setDefaultProject(projects);
        });
        return new app.Views.Projects.Selector({ collection : projects });
      },

      _setDefaultProject: function(projects) {
        var defaultProject = projects.models[0];
        if (defaultProject) {
          this.model.set('project', defaultProject.get('slug'));
        }
      },

     _initializeEditorWidget: function() {
        var $target = this.ui.editor;
        this.renderEditorWidget($target, {
          html : this._renderHtmlContent()
        });
        this._bindWymeditorEvents($target);
      },

      _renderHtmlContent: function(text) {
        text || (text = this._markdownText());
        return text ? this.markdown.render(text) : '';
      },

      _markdownText: function() {
        return this.model.markdown();
      },

      // e.g. fokus-mousedown, fokus-keydown
      // for all events: this == textarea [ wym = this._doc ]
      _bindWymeditorEvents: function($target) {
        var view = this;
        $target.bind("fokus-mousedown", function(evt, originalEvt) {
          view._onElementClick(originalEvt);
        });
        view.on('edit-link', view._onEditLink);
        view.on('edit-citation', view._onEditCitation);
      },

      // link editor

      _onEditLink: function(wym) {
        var sel = this._getEditorSelection(wym);
        this._editSelectedLink(sel);
      },

      _getEditorSelection: function(wym) {
        var contentWindow = wym._iframe.contentWindow;
        return rangy.getSelection(contentWindow);
      },

      _editSelectedLink: function(sel) {
        var linkNode = this._firstLinkNodeInSelection(sel);
        if (linkNode) {
          this._editSelectedLinkForUpdate(sel, linkNode);
        }
        else {
          this._editSelectedLinkForAdd(sel);
        }
      },

      _firstLinkNodeInSelection: function(sel) {
        var range = sel.getRangeAt(0);
        if (range) {
          var linkNodes = this._linkNodesForRange(range);
          return linkNodes[0];
        }
      },

      _linkNodesForRange: function(range) {
        return range.getNodes([1], function(node) { // nodeType 1 == element
          return node.nodeName === 'A';
        });
      },

      _editSelectedLinkForUpdate: function(sel, linkNode) {
        this._selectNodeRange(sel, linkNode);
        var link = this._linkForNode(linkNode);
        this._openLinkEditorForUpdate(link, linkNode);
      },

      _selectNodeRange: function(sel, node) {
        var range = sel.getRangeAt(0);
        range.selectNode(node); // selectNodeContents ???
        this._replaceSelectionRange(sel, range);
      },

      _linkForNode: function(node) {
        var title = $(node).attr('title');
        return this._linkForId(title);
      },

      _linkForId: function(title) {
        var links = this.model.documentLinks();
        return links.get(title);
      },

      _openLinkEditorForUpdate: function(link, linkNode) {
        var editor = this,
          text = $(linkNode).text(),
          editableLink = editor._buildEditableLink(text, link),
          linkEditor = editor._openLinkEditor(editableLink, { enableRemove : true });
        linkEditor.on('close', function() {
          if (linkEditor.submit) {
            editor._updateLink(link, editableLink);
            editor._updateLinkNode(linkNode, editableLink.get('text'), editableLink.get('target_title'));
          }
          else if (linkEditor.removeLink) {
            // TODO: garbage collect unused links
            editor._unlinkNode(linkNode);
          }
        });
      },

      _buildEditableLink: function(text, link) {
        var title = link ? link.get('title') : undefined,
          target_link = link ? link.get('target_link') : undefined;
        return new BB.Model({
          text         : text,
          target_title : title,
          target_link  : target_link
        });
      },

      _openLinkEditor: function(editableLink, opts) {
        opts = _.extend({ model : editableLink }, opts);
        var linkEditor = new app.Views.Links.Editor(opts);
        this._renderLightboxView(linkEditor);
        return linkEditor;
      },

      _renderLightboxView: function(view) {
        view.render().$el.lightbox_me({
          closeEsc   : false,
          closeClick : false,
          onLoad     : function() {
            if (view.onLightbox) { view.onLightbox(); }
          },
          onClose    : function() {
            view.close();
          },
          zIndex     : 99999,
          modalCSS   : { top : '80px' }
        });
      },

      _updateLink: function(link, editableLink) {
        var targetTitle = editableLink.get('target_title');
        link.set({
          id          : targetTitle,
          title       : targetTitle,
          target_link : editableLink.get('target_link'),
          time_range  : editableLink.get('time_range')
        });
      },

      // corresponds to _addLinkToSelection
      _updateLinkNode: function(linkNode, linkText, title) {
        $(linkNode).
          text(linkText).
          attr('title', title);
      },

      _unlinkNode: function(linkNode) {
        var $linkNode = $(linkNode),
          $prev = $linkNode.prev(),
          $next = $linkNode.next();
        if (($prev.length > 0) && $prev[0].nodeType == 3) { // text node
          this._unlinkNodePrepend($linkNode, $prev);
        }
        else if (($next.length > 0) && $next[0].nodeType == 3) {
          this._unlinkNodeAppend($linkNode, $next);
        }
        else {
          this._unlinkNodeReplace($linkNode);
        }
      },

      _unlinkNodePrepend: function($linkNode, $prev) {
        var prevText = $prev.text();
        prevText += $linkNode.text();
        $linkNode.remove();
        $prev.text(prevText);
      },

      _unlinkNodeAppend: function($linkNode, $next) {
        var nextText = $next.text();
        nextText += linkText + nextText;
        $linkNode.remove();
        $next.text(nextText);
      },

      _unlinkNodeReplace: function($linkNode) {
        var $parent = $linkNode.parent(),
          linkText = $linkNode.text(),
          textNode = document.createTextNode(linkText);
        $linkNode.replaceWith(textNode);
      },

      _editSelectedLinkForAdd: function(sel) {
        var textNode = this._firstTextNodeInSelection(sel);
        if (textNode) {
          this._selectTextNodeRange(sel, textNode);
          var editableLink = this._buildEditableLinkForSelection(sel);
          this._openLinkEditorForAdd(editableLink, sel);
        }
      },

      _firstTextNodeInSelection: function(sel) {
        var range = sel.getRangeAt(0);
        return range ? this._firstTextNodeInRange(range) : undefined;
      },

      _firstTextNodeInRange: function(range) {
        var textNodes = this._textNodesForRange(range);
        return textNodes[0];
      },

      _textNodesForRange: function(range) {
        return range.getNodes([3]); // nodeType 3 == text
      },

      _selectTextNodeRange: function(sel, node) {
        var updateSelection = false,
          range = sel.getRangeAt(0);
        if (range.startContainer === node) {
          if (range.endContainer !== node) {
            updateSelection = true;
            this._setRangeEndToNode(range, node);
          }
        }
        else {
          updateSelection = true;
          this._setRangeBoundsToNode(range, node);
        }
        if (updateSelection) {
          this._replaceSelectionRange(sel, range);
        }
      },

      _setRangeEndToNode: function(range, node) {
        range.setEnd(node, node.length);
      },

      _setRangeBoundsToNode: function(range, node) {
        this._setRangeStartToNode(range, node);
        if (range.endContainer !== node) {
          this._setRangeEndToNode(range, node);
        }
      },

      _setRangeStartToNode: function(range, node) {
        range.setStart(node, 0);
      },

      _replaceSelectionRange: function(sel, range) {
        sel.removeAllRanges();
        sel.addRange(range);
      },

      _buildEditableLinkForSelection: function(sel) {
        var range = sel.getRangeAt(0);
        return this._buildEditableLinkForRange(range);
      },

      _buildEditableLinkForRange: function(range) {
        var text = this._textForSingleNodeRange(range);
        return this._buildEditableLink(text);
      },

      _textForSingleNodeRange: function(range) {
        // assume: range.startContainer === range.endContainer
        return this._nodeTextSubstring(range.startContainer,
                                       range.startOffset,
                                       range.endOffset);
      },

      _nodeTextSubstring: function(node, startOffset, endOffset) {
        var nodeText = $(node).text();
        return nodeText.substring(startOffset, endOffset);
      },

      _firstContainerTextForSelection: function(sel) {
        var range = sel.getRangeAt(0);
        return $(range.startContainer).text();
      },

      _openLinkEditorForAdd: function(editableLink, sel) {
        var editor = this,
          linkEditor = this._openLinkEditor(editableLink);
        linkEditor.on('close', function() {
          if (linkEditor.submit) {
            var link = editor._addEditedLink(editableLink);
            editor._addLinkToSelection(sel, editableLink.get('text'), link.id);
          }
        });
      },

      _addEditedLink: function(editableLink) {
        var link = this._buildNewLink(editableLink);
        this.model.documentLinks().add(link);
        return link;
      },

      _buildNewLink: function(editableLink) {
        var link = new BB.Model({ link_type : 'linked-to' });
        this._updateLink(link, editableLink);
        return link;
      },

      // corresponds to _updateLinkNode
      _addLinkToSelection: function(sel, linkText, title) {
        var range = sel.getRangeAt(0),
          $a = this._buildLinkNode(linkText, title),
          nodes = this._replaceRangeWithNode(range, $a[0]);
        $(range.startContainer).replaceWith(nodes);
      },

      _replaceRangeWithNode: function(range, node) {
        // assume: range.startContainer === range.endContainer
        var container = range.startContainer,
          texts = this._splitTextNodeAtRange(container, range),
          nodes = this._buildTextNodes(texts);
        if (texts[0] && (nodes.length > 1)) {
          nodes[1] = node;
        }
        else {
          nodes[0] = node;
        }
        return nodes;
      },

      _buildTextNodes: function(texts) {
        var node, nodes = [];
        _.each(texts, function(text) {
          if (text) {
            node = document.createTextNode(text);
            nodes.push(node);
          }
        });
        return nodes;
      },

      /*
      _lengthForSingleNodeRange: function(range) {
        return range.endOffset - range.startOffset;
      },
      */

      _splitTextNodeAtRange: function(node, range) {
        var prelude, interlude, postlude,
          text = $(node).text();
        if (range.startOffset) {
          prelude = text.substr(0, range.startOffset);
        }
        interlude = text.substring(range.startOffset, range.endOffset);
        if (text.length > range.endOffset) {
          postlude = text.substr(range.endOffset);
        }
        return [ prelude, interlude, postlude ];
      },

      _buildLinkNode: function(text, title) {
        return $('<a/>').
          attr('href', '#').
          text(text).
          attr('title', title);
      },

      _insertSidebar: function() {
        var sidebar = this._buildSidebar();
        $('#fl-primary').before(sidebar.render().$el);
      },

      _buildSidebar: function() {
        return new mod.EditorSidebar({ model : this.model });
      },

      _configureArticleTypeSelector: function() {
        if (this.model.id) { this._disableArticleTypeSelector(); }
      },

      _disableArticleTypeSelector: function() {
        this.ui.articleTypeSelector.
          prop('disabled', true).
          parent().
          qtip({
            content: { text : "The type of this article cannot be changed" },
            show: 'mouseover',
            position: {
              target: 'mouse'
            }
          });
      },

      ////

      _onEditCitation: function(wym) {
        this._editCitationForAdd();
      },

      _editCitationForAdd: function() {
        var editableCitation = this._buildEditableCitation();
        this._openCitationEditorForAdd(editableCitation);
      },

      _buildEditableCitation: function(cite) {
        return new app.Models.Citation({

          title        : (cite ? cite.id                  : ''),
          cited_extent : (cite ? cite.get('cited_extent') : ''),
          excerpt      : (cite ? cite.get('excerpt')      : ''),

          'container-title' : (cite ? cite.get('container-title') : ''),
          'issued'          : (cite ? cite.get('issued')          : ''),
          'author'          : (cite ? cite.get('author')          : ''),
          'translator'      : (cite ? cite.get('translator')      : ''),
          'volume'          : (cite ? cite.get('volume')          : ''),
          'issue'           : (cite ? cite.get('issue')           : ''),
          'page'            : (cite ? cite.get('page')            : ''),
          'URL'             : (cite ? cite.get('URL')             : '')

        });
      },

      _openCitationEditorForAdd: function(editableCitation) {
        var editor = this,
          citationEditor = this._openCitationEditor(editableCitation);
        citationEditor.on('close', function() {
          if (citationEditor.submit) {
            var citation = editor._addEditedCitation(editableCitation);
            editor._addCitation(editableCitation.get('text'), citation.id);
          }
        });
      },

      _openCitationEditor: function(editableCitation, opts) {
        opts = _.extend({ model : editableCitation }, opts);
        var citationEditor = new app.Views.Citations.Editor(opts); // ref/cite ???
        this._renderLightboxView(citationEditor);
        return citationEditor;
      },

      _addEditedCitation: function(editableCitation) {
        var citation = this._buildNewCitation(editableCitation);
        this.model.citations().add(citation);
        return citation;
      },

      _buildNewCitation: function(editableCitation) {
        var citation = new app.Models.Citation();
        this._updateCitation(citation, editableCitation);
        return citation;
      },

      _updateCitation: function(citation, editableCitation) {
        citation.set({

          title        : editableCitation.id,
          cited_extent : editableCitation.get('cited_extent'),
          excerpt      : editableCitation.get('excerpt'),

          'container-title' : editableCitation.get('container-title'),
          'issued'          : editableCitation.get('issued'),
          'author'          : editableCitation.get('author'),
          'translator'      : editableCitation.get('translator'),
          'volume'          : editableCitation.get('volume'),
          'issue'           : editableCitation.get('issue'),
          'page'            : editableCitation.get('page'),
          'URL'             : editableCitation.get('URL')

        });
      },

      ////

      onClickCancel: function(e) {
        e.preventDefault();
        if (confirm("Are you sure? Any changes will be lost.")) {
          window.history.back();
        }
      },

      onClickSubmit: function(e) {
        e.preventDefault();
        this.submitEdit();
      },

      submitEdit: function() {
        var view = this,
          edition = this.buildEdition();
        edition.save().
          then(function(receipt) {
            view._redirectToDocument(receipt.document_link);
          }).
          fail(function() {
            alert("edition failed to save");
            console.log("failed to save", arguments);
          });
      },

      buildEdition: function() {
        this._garbageCollectLinks();
        return new app.Models.Edition({
          document   : this.model,
          body       : this._renderMarkdownContent(),
          references : this.model.references(),
          comments   : this.model.get('comments')
        });
      },

      _garbageCollectLinks: function() {
        var targets = this._linkTargets();
        this.model.pruneDocumentLinks(targets);
      },

      _linkTargets: function() {
        var $body = $(this._body()),
          targets = {};
        $body.find('a').each(function(i, a) {
          var title = $(a).attr('title');
          targets[title] = 1;
        });
        return _.keys(targets);
      },

      _renderMarkdownContent: function() {
        var guiContent = this._xhtmlText();
        return toMarkdown(guiContent);
      },

      _xhtmlText: function() {
        return this._wymeditor().xhtml();
      },

      _body: function() {
        return this._wymeditor()._doc.body;
      },

      _wymeditor: function() {
        return WYMeditor.INSTANCES[0];
      },

      _redirectToDocument: function(docLink) {
        window.location = "/articles/" + docLink;
      },

      _onElementClick: function(evt) {
        var $target = $(evt.target);
        if ($target.is('a')) {
          this._onLinkClick(evt);
        }
        else if ($target.is('cite')) {
          this._onCitationClick(evt);
        }
      },

      _onLinkClick: function(evt) {
        evt.preventDefault();
        this._openLinkEditorForUpdateWithNode(evt.target);
      },

      _openLinkEditorForUpdateWithNode: function(linkNode) {
        var title = $(linkNode).attr('title'),
          link = this._linkForId(title);
        if (link) {
          this._openLinkEditorForUpdate(link, linkNode);
        }
      },

      _onCitationClick: function(evt) {
        evt.preventDefault();
        this._openCitationEditorForUpdateWithNode(evt.target);
      },

      _openCitationEditorForUpdateWithNode: function(citeNode) {
        var title = $(citeNode).attr('title'),
          cite = this._citationForId(title); // this is the reference; what about "citation"?
        if (cite) {
          this._openCitationEditorForUpdate(cite, citeNode);
        }
      },

      _citationForId: function(title) {
        return this.model.references().get(title);
        // cite = (citeCid ? this._getCitation(ref, citeCid) : null);
        // ref.citations().get(cid)
      },

      _openCitationEditorForUpdate: function(cite, citeNode) {
        var editor = this,
          editableCitation = editor._buildEditableCitation(cite),
          citationEditor = this._openCitationEditor(editableCitation);
        citationEditor.on('close', function() {
          if (citationEditor.submit) {
            editor._updateCitation(cite, editableCitation);
            editor._updateCitationNode(citeNode, editableCitation);
          }
        });
      },

      _updateCitationNode: function(citeNode, editableCitation) {
        var citeHtml = this._formatCitation(editableCitation.get('title'));
        $(citeNode).replaceWith(citeHtml);
      }

    }, WymeditorViewMixin));

  });

}).call({}, window);
