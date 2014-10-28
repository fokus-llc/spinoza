(function(root, undefined) {

  var rivets = root.rivets,
    _ = root._;

  rivets.configure({
    prefix      : 'data-bind',
    preloadData : true
  });

  rivets.adapters[':'] = {

    subscribe: function(obj, keypath, callback) {
      obj.on('change:' + keypath, callback);
    },

    unsubscribe: function(obj, keypath, callback) {
      obj.off('change:' + keypath, callback);
    },

    read: function(obj, keypath) {
      return obj.get(keypath);
    },

    publish: function(obj, keypath, value) {
      obj.set(keypath, value);
    }

  };

  rivets.adapters['#'] = {

    subscribe: function(obj, keypath, callback) {
      obj.on('change:' + keypath, callback);
    },

    unsubscribe: function(obj, keypath, callback) {
      obj.off('change:' + keypath, callback);
    },

    read: function(obj, keypath) {
      return obj[keypath]();
    },

    publish: function(obj, keypath, value) {
      return obj[keypath](value);
    }

  };

  _.extend(rivets.formatters, {

    list : {
      publish: function(val) { return val ? val.split(/\s*,\s*/) : []; },
      read: function(val) { return val ? val.join(', ') : ''; }
    },

    commified : {
      read: function(val) { return _.str.numberFormat(val); }
    },

    capitalized : {
      read: function(val) { return _.str.capitalize(val); }
    }

  });

}).call({}, linkage);
