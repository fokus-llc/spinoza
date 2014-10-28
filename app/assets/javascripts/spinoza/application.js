(function(root, undefined) {

  var _ = root._,
    BM = root.Backbone.Marionette,
    context = root.SpinozaContext || {},
    app = root.Spinoza = new BM.Application();

  app.module("Utilities", function(mod, app, BB, BM, $, _) {

    mod.throwError = function(msg, name) {
      var error = new Error(msg);
      error.name = name || 'Error';
      throw error;
    };

  });

  app.module("Config", function(mod, app, BB, BM, $, _) {

    mod.getTemplate = function(path) {
      return BM.TemplateCache.get(path);
    },

    mod.dataUrl = function(suffix) {
      var base = context.dataUrl || '';
      return /^\//.test(suffix) ? (base + suffix) : (base + '/' + suffix);
    };

  });

  app.module("UI", function(mod, app, BB, BM, $, _) {

    mod.fetchBranchOptions = function() {
      var defer = new $.Deferred(),
        branches = new app.Collections.Branches();

      branches.fetch().

        then(function() {
          var branchOptions = branches.map(function(branch) {
            return $('<option>').
              attr('value', branch.get('slug')).
              text('Workspace: ' + branch.get('name'));
          });
          defer.resolve(branchOptions);
        }).

        fail(function() {
          defer.reject("Failed to fetch public branches", arguments);
        });

      return defer.promise();
    };

  });

}).call({}, linkage);
