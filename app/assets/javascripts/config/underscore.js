(function(root, undefined) {

  var _ = root._,
    ArrayProto = Array.prototype,
    slice = ArrayProto.slice,
    concat = ArrayProto.concat;

  _.mixin({

    pickCompact: function(obj) {
      var copy = {},
        keys = concat.apply(ArrayProto, slice.call(arguments, 1));
      _.forEach(keys, function(key) {
        if (key in obj) {
          var val = obj[key];
          if (val) { copy[key] = val; }
        }
      });
      return copy;
    }

  });

}).call({}, linkage);
