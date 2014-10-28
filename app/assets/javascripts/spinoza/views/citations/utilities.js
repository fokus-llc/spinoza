(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Views.Citations", function(mod, app, BB, BM, $, _) {

    mod.Utilities = {

      configureTooltips: function(view, sel, textFn, $port) {
        $port || ($port = $(window));
        view.$(sel).qtip({
          content: {
            text : function() {
              return textFn.call(this);
            }
          },
          show: {
            solo : true
          },
          hide: {
            event: 'unfocus',
            inactive: 1500
          },
          position: {
            viewport: $port
          }
        });
      }

    };

  });

}).call({}, window);
