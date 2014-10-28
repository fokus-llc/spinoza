(function(root, undefined) {

  var $ = root.jQuery,
    config = root.FokusContext;

  if (!config.jqueryVerbose) {
    $.migrateMute = true;
    $.migrateTrace = false;
  }

}).call({}, window);
