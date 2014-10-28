/*
 * Key-value pairs, separated by colons, delimited by pipes
 * Keys may not contain spaces or colons
 * Values may not contain pipes and are trimmed of whitespace
 */
(function(root, undefined) {

  var _ = root._,
    BB = root.Backbone,
    mod = root.FokusProperties = {};

  var matcher = /\s*([^:\s]+)\s*:\s*(\S.*)/;

  mod.parse = function(text) {
    var pairs = text.split('|');
    return _.reduce(pairs, function(memo, pair) {
      var match = matcher.exec(pair);
      if (match) {
        memo[match[1]] = match[2].replace(/\s*$/, '');
      }
      return memo;
    }, {});
  };

}).call({}, linkage);
