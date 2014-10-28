(function(root, undefined) {

  var jQuery  = root.jQuery,
    WYMeditor = root.WYMeditor;

  //
  // Patching WYMeditor
  //
  // WYMeditor.WymClassExplorer
  // WYMeditor.WymClassMozilla
  // WYMeditor.WymClassOpera
  // WYMeditor.WymClassSafari // includes chrome
  //

  function patchPrototype(klass, attr, fn) {
    var original = klass.prototype[attr],
      originalAttr = 'original_' + attr;
    klass.prototype[originalAttr] = original;
    klass.prototype[attr] = fn;
  }

  var patchedFixBodyHtml = function() {
    var wym = this;

    // mark non-editable elements

    jQuery(wym._doc.body).
      find('a').
      attr('contentEditable', false);

    jQuery(wym._doc.body).
      find('.fg-img-container').
      attr('contentEditable', false);

    jQuery(wym._doc.body).
      find('cite').
      attr('contentEditable', false);

    jQuery(wym._doc.body).
      find('dfn').
      attr('contentEditable', false);

    return wym.original_fixBodyHtml();
  };
  patchPrototype(WYMeditor.editor, 'fixBodyHtml', patchedFixBodyHtml);

  var patchedMousedown = function(evt) { // this == editor
    var wym = this;

    jQuery(wym._element).trigger('fokus-mousedown', evt);

    if (jQuery.browser.mozilla) { // needed? works while focusing?
      if (jQuery(evt.target).attr('contentEditable') === 'false') {
        evt.preventDefault();
      }
    }

    return evt.isDefaultPrevented() ? false : wym.original_mousedown(evt);
  };
  patchPrototype(WYMeditor.editor, 'mousedown', patchedMousedown);

  var patchedKeydown = function(evt) { // this = iframe document
    var editorIndex = this.title,
      wym = WYMeditor.INSTANCES[editorIndex],
      container = wym.selected();

    jQuery(wym._element).trigger('fokus-keydown', evt);

    return evt.isDefaultPrevented() ? false : wym.original_keydown(evt);
  };
  patchPrototype(WYMeditor.WymClassMozilla, 'keydown', patchedKeydown);
  patchPrototype(WYMeditor.WymClassOpera,   'keydown', patchedKeydown);
  patchPrototype(WYMeditor.WymClassSafari,  'keydown', patchedKeydown); // also chrome

  var _stringsPatched = false;
  var _patchStrings = function(wym) {
    _loadStrings(wym);
    WYMeditor.STRINGS.en.Citation = 'Citation';
    _stringsPatched = true;
  };

  var _loadStrings = function(wym) {
    if (!WYMeditor.STRINGS[wym._options.lang]) {
      try {
        eval(jQuery.ajax({
          url:   wym._options.langPath + wym._options.lang + '.js',
          async: false
        }).responseText);
      } catch (e) {
        WYMeditor.console.error("WYMeditor: error while parsing language file.");
      }
    }
  };

  var patchedReplaceStrings = function(sVal) {
    if (!_stringsPatched) { _patchStrings(this); }
    return this.original_replaceStrings(sVal);
  };
  patchPrototype(WYMeditor.editor, 'replaceStrings', patchedReplaceStrings);

}).call({}, window);
