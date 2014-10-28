(function(root, undefined) {

  var app = root.Spinoza,
    context = (root.SpinozaContext || {}),
    PaginatedCollection = root.PaginatedCollection;

  app.module("Components", function(mod, app, BB, BM, $, _) {

    var getCredentials = function() {
      return context.credentials;
    };

    mod.AuthorizedModel = BB.Model.extend({
      credentials : getCredentials
    });

    mod.AuthorizedCollection = BB.Collection.extend({
      credentials : getCredentials
    });

    mod.AuthorizedPaginatedCollection = PaginatedCollection.extend({
      credentials : getCredentials
    });

  });

}).call({}, linkage);
