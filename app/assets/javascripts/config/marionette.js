(function(root, undefined) {

  var BM = root.Backbone.Marionette,
    Handlebars = root.Handlebars;

  function raiseNoTemplateError(templateId) {
    var msg = "Could not find template: '" + templateId + "'",
      err = new Error(msg);
    err.name = "NoTemplateError";
    throw err;
  }

  function raiseNoCompilerError() {
    var err = new Error("No compiler is present");
    err.name = "NoCompilerError";
    throw err;
  }

  function jstPath(templateId) {
    var path = templateId.replace(/^jst:/, '');
    return 'spinoza/templates/' + path;
  }

  function loadTemplateFromJst(templateId) {
    var compiledTemplate = JST[jstPath(templateId)];
    if (!compiledTemplate){
      raiseNoTemplateError(templateId);
    }
    return compiledTemplate;
  }

  function loadTemplateFromDom(templateId){
    var template = $(templateId).html();
    if (!template || template.length === 0){
      raiseNoTemplateError(templateId);
    }
    return template;
  }

  BM.TemplateCache.prototype.loadTemplate = function(templateId) {
    return /^jst:/.test(templateId) ?
      loadTemplateFromJst(templateId) : loadTemplateFromDom(templateId);
  };

  BM.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    return typeof rawTemplate == 'function' ?
      rawTemplate : raiseNoCompilerError();
  };

}).call({}, linkage);
