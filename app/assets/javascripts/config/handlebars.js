(function(root, undefined) {

  var Handlebars = root.Handlebars,
    _            = root._,
    $            = root.$,
    moment       = root.moment;

  function makeUnsafeLink(text, target) {
    return '<a href="' + target + '" title="' + text + '">' + text + '</a>';
  }

  function makeLink(text, target, suffix) {
    var linkText = makeUnsafeLink(text, target);
    return new Handlebars.SafeString(linkText + (suffix || ''));
  }

  Handlebars.registerHelper('parameterize', function(value) {
    return parameterize(value);
  });

  Handlebars.registerHelper('ago', function(value) {
    return moment(value).fromNow();
  });

  Handlebars.registerHelper('mdy', function(value) {
    return moment(value).format('ll');
  });

  Handlebars.registerHelper('capitalize', function(val) {
    return val ? _.str.capitalize(val) : '';
  });

  Handlebars.registerHelper('list', function(val) {
    return val.join(', ');
  });

  Handlebars.registerHelper('deslugify', function(val) {
    return _.str.capitalize(val.replace(/-/g, ' '));
  });

  Handlebars.registerHelper('locusPlace', function(val) {
    return val ? val.split('@')[0] : '';
  });

  Handlebars.registerHelper('locusDate', function(val) {
    return val ? val.split('@')[1] : '';
  });

  Handlebars.registerHelper('linkDocument', function() {
    var title = this.title,
      link = (this.target_link || this.link),
      target = ('/articles/' + parameterize(title) + '?' + $.param({ document_link : link }));
    return makeLink(title, target);
  });

  Handlebars.registerHelper('linkParticipant', function() {
    var title = this.title,
      link = this.target_link,
      target = ('/articles/' + parameterize(title) + '?' + $.param({ document_link : link }));

    var suffix = '';
    if (this.link_type === 'has-active-participant') {
      suffix = ' (active)';
    }
    else if (this.link_type === 'has-passive-participant') {
      suffix = ' (passive)';
    }
    else if (this.link_type === 'has-authority') {
      suffix = ' (source)';
    }
    else if (this.link_type === 'has-observer') {
      suffix = ' (observer)';
    }

    return makeLink(title, target, suffix);
  });

  Handlebars.registerHelper('linkEvent', function() {
    var title = this.title,
      link = this.target_link,
      target = ('/articles/' + parameterize(title) + '?' + $.param({ document_link : link }));

    var suffix = '';
    if (this.link_type === 'has-active-participant') {
      suffix = ' (active participant)';
    }
    else if (this.link_type === 'has-passive-participant') {
      suffix = ' (passive participant)';
    }
    else if (this.link_type === 'has-authority') {
      suffix = ' (source)';
    }
    else if (this.link_type === 'has-observer') {
      suffix = ' (observer)';
    }

    return makeLink(title, target, suffix);
  });

  Handlebars.registerHelper('linkConcept', function() {
    var title = this.title,
      link = this.target_link,
      target = ('/concepts/' + parameterize(title) + '?' + $.param({ concept_link : link }));
    return makeLink(title, target);
  });

  Handlebars.registerHelper('eachRelation', function(relations, opts) {
    var result = '';
    _.each(relations, function(rels, relType) {
      _.each(rels, function(rel) {
        result += opts.fn({ type: relType, data: rel });
      });
    });
    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper('linkRelation', function() {
    var data = this.data,
      datatype = this.type,
      suffix = ' (' + datatype + ')';
    var title = data.title,
      link = data.target_link;
    if (link) {
      var target = ('/articles/' + parameterize(title) + '?' + $.param({ document_link : link }));
      return makeLink(title, target, suffix);
    }
    else {
      return title + suffix;
    }
  });

}).call({}, linkage);
