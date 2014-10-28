(function(root, undefined) {

  var $ = root.jQuery,
    BB = root.Backbone;

  function nullsync() {
    var deferred = new $.Deferred().resolve();
    return deferred.promise();
  }

  var LocalModel = root.LocalModel = BB.Model.extend({
    sync: nullsync
  });

}).call({}, linkage);
