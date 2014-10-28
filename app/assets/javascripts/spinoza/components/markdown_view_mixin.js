(function(root, undefined) {

  var app = root.Spinoza,
    FokusLinks            = root.FokusLinks,
    FokusMarkdown         = root.FokusMarkdown;

  app.module("Components", function(mod, app, BB, BM, $, _) {

    mod.MarkdownViewMixin = {

      // PROVIDES:
      // .markdown

      // ASSUMES:
      // .links
      // .ui.body (with cite tags)
      // .references (member)

      _buildMarkdownRenderer: function(citer, imager, linker) {
        linker || (linker = new FokusLinks.LinkedFormatter(this.links));
        return new FokusMarkdown.Renderer({
          linker        : linker,
          embedHandlers : this._configureEmbedHandlers(citer, imager)
        });
      },

      _configureEmbedHandlers: function(citer, imager) {
        var config = {};
        if (citer) {
          config.cite = function(id, props) { return citer.format(id, props); };
        }
        if (imager) {
          config.image = function(id, props) { return imager.render(id, props); };
        }
        return config;
      },

      _initializeMarkdown: function(renderer) {
        this.markdown = this._buildMarkdown(renderer);
        return this.markdown;
      },

      _buildMarkdown: function(renderer) {
        return new FokusMarkdown({ renderer : renderer });
      },

      renderBody: function(body) {
        return body ? this.markdown.render(body.text) : null;
      }

    };

  });

}).call({}, linkage);
