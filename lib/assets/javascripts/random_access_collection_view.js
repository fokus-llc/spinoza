(function(root, undefined) {

  var _ = root._,
    Backbone = root.Backbone,
    Marionette = Backbone.Marionette;

  // OVERRIDDEN functions from Backbone.Marionette 1.7.4 except where PATCHED

  var RandomAccessMixin = {

    // OVERRIDDEN
    addItemView: function(item, ItemView, index){
      // get the itemViewOptions if any were specified
      var itemViewOptions = Marionette.getOption(this, "itemViewOptions");
      if (_.isFunction(itemViewOptions)){
        itemViewOptions = itemViewOptions.call(this, item, index);
      }

      // build the view
      var view = this.buildItemView(item, ItemView, itemViewOptions);

      // set up the child view event forwarding
      this.addChildViewEventForwarding(view);

      // this view is about to be added
      this.triggerMethod("before:item:added", view);

      // Store the child view itself so we can properly
      // remove and/or close it later
      this.children.add(view, index); // PATCHED: indexed by collection.models index

      // Render it and show it
      this.renderItemView(view, index);

      // call the "show" method if the collection view
      // has already been shown
      if (this._isShown && !this.isBuffering){
        Marionette.triggerMethod.call(view, "show");
      }

      // this view was added
      this.triggerMethod("after:item:added", view);

      return view;
    },

    // OVERRIDE
    initRenderBuffer: function() {
      // this.elBuffer = document.createDocumentFragment(); // PATCHED
      this._indexedBufferElements = []; // PATCHED
      this._bufferedChildren = [];
    },

    // OVERRIDE
    endBuffering: function() {
      this.isBuffering = false;
      this.appendBuffer(this, this._indexedBufferElements); // PATCHED
      this._triggerShowBufferedChildren();
      this.initRenderBuffer();
    },

    // OVERRIDE: totally rewritten
    appendBuffer: function(collectionView, indexedBuffers) {
      var i, lastIndex = null, insertIndex = null, elBuffer = null;
      for (i in indexedBuffers) { // native for: sparse array
        if (indexedBuffers.hasOwnProperty(i)) {
          var bufferedItemEl = indexedBuffers[i];
          if (elBuffer === null) {
            elBuffer = document.createDocumentFragment();
            insertIndex = i;
          }
          if (lastIndex === null || (lastIndex === (i-1))) {
            elBuffer.appendChild(bufferedItemEl);
          }
          else { // non-contiguous: append buffer
            collectionView._appendElementAt(insertIndex, elBuffer);
            elBuffer = document.createDocumentFragment();
            elBuffer.appendChild(bufferedItemEl);
            insertIndex = i;
          }
          lastIndex = i;
        }
      }
      if (insertIndex) {
        collectionView._appendElementAt(insertIndex, elBuffer);
      }
    },

    // OVERRIDE
    appendHtml: function(collectionView, itemView, index) {
      if (collectionView.isBuffering) {
        // buffering happens on reset events and initial renders
        // in order to reduce the number of inserts into the
        // document, which are expensive.
        // collectionView.elBuffer.appendChild(itemView.el); // PATCHED
        collectionView._indexedBufferElements[index] = itemView.el; // PATCHED
        collectionView._bufferedChildren.push(itemView);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        // collectionView.$el.append(itemView.el);
        collectionView._appendHtml(itemView, index);
      }
    },

    _appendHtml: function(itemView, index) {
      this._appendElementAt(index, itemView.el);
    },

    _appendElementAt: function(index, elBuffer) {
      var priorChildView = this._priorChildView(index);
      if (priorChildView) {
        priorChildView.$el.after(elBuffer);
      }
      else {
        this._prependChildElement(elBuffer);
      }
    },

    _prependChildElement: null, // must be overridden

    _priorChildView: function(index) {
      if (index < 1) return null;
      var indexedView = this.children.findByCustom(index - 1);
      if (indexedView) {
        return indexedView;
      }
      else {
        var j = this._priorChildIndex(index);
        return (j === null) ? null : this.children.findByCustom(j); // not found == first
      }
    },

    _priorChildIndex: function(index) {
      if (this.collection.cappedIndices) { // it's a sparse collection
        var indices = this.collection.cappedIndices(index);
        return indices[indices.length - 1];
      }
      else {
        return index - 1;
      }
    }

  };

  root.RandomAccessCollectionView = Marionette.CollectionView.extend(_.defaults({

    _prependChildElement: function(elBuffer) {
      this.$el.prepend(elBuffer);
    }

  }, RandomAccessMixin));

  root.RandomAccessCompositeView = Marionette.CompositeView.extend(_.defaults({

    _prependChildElement: function(elBuffer) {
      var $container = this.getItemViewContainer(this);
      $container.prepend(elBuffer);
    }

  }, RandomAccessMixin));

}).call({}, linkage);

