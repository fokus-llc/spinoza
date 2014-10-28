(function(root, undefined) {

  var BB = root.Backbone;

  // OVERRIDDEN functions from Backbone.js 1.1.2, except where PATCHED
  //
  // Underscore explicitly doesn't support sparse arrays since 1.4.0,
  // so mischief is to be expected, especially where the lenfth of the
  // array and/or iteration is involved.

  // required by #set
  var setOptions = {add: true, remove: true, merge: true};

  // also required by #set
  var Model = BB.Model;

  root.SparseCollection = BB.Collection.extend({

    // OVERRIDDEN
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.models.length; i < l; ++i) { // PATCHED: use models.length
          model = this.models[i]; // PATCHED
          if ((model !== undefined) && (!modelMap[model.cid])) toRemove.push(model); // PATCHED: skip sparse slots
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          this.models[at] = (void 0); // PATCHED: expand sparse array to index
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 1, toAdd[i]); // PATCHED: overwrite
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // OVERRIDDEN
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        var model = this.models[i]; // PATCHED
        if (model !== undefined) this._removeReference(model, options); // PATCHED
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // OVERRIDDEN
    push: function(model, options) {
      return this.add(model, _.extend({at: this.models.length}, options)); // PATCHED
    },

    // OVERRIDDEN
    pop: function(options) {
      var model = this.at(this.models.length - 1); // PATCHED
      this.remove(model, options);
      return model;
    },

    cappedIndices: function(max) {
      var i, models = this.models, indices = [];
      for (i in models) {
        if (models.hasOwnProperty(i)) {
          if (i >= max) break;
          indices.push(i);
        }
      }
      return indices;
    }

  });

}).call({}, linkage);
