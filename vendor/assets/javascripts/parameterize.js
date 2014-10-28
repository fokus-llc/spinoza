(function(root, undefined) {

  var LATIN_MAP = {
    'À':'A', 'Á':'A', 'Â':'A', 'Ã':'A', 'Ä':'A', 'Å':'A', 'Æ':'AE',
    'Ç':'C', 'È':'E', 'É':'E', 'Ê':'E', 'Ë':'E', 'Ì':'I', 'Í':'I',
    'Î':'I', 'Ï':'I', 'Ð':'D', 'Ñ':'N', 'Ò':'O', 'Ó':'O', 'Ô':'O',
    'Õ':'O', 'Ö':'O', 'Ő':'O', 'Ø':'O', 'Ù':'U', 'Ú':'U', 'Û':'U',
    'Ü':'U', 'Ű':'U', 'Ý':'Y', 'Þ':'TH', 'ß':'ss', 'à':'a', 'á':'a',
    'â':'a', 'ã':'a', 'ä':'a', 'å':'a', 'æ':'ae', 'ç':'c', 'è':'e',
    'é':'e', 'ê':'e', 'ë':'e', 'ì':'i', 'í':'i', 'î':'i', 'ï':'i',
    'ð':'d', 'ñ':'n', 'ò':'o', 'ó':'o', 'ô':'o', 'õ':'o', 'ö':'o',
    'ő':'o', 'ø':'o', 'ù':'u', 'ú':'u', 'û':'u', 'ü':'u', 'ű':'u',
    'ý':'y', 'þ':'th', 'ÿ':'y'
  };

  var LATIN_SYMBOLS_MAP = {
    '©':'(c)'
  };

  var GREEK_MAP = {
    'α':'a', 'β':'b', 'γ':'g', 'δ':'d', 'ε':'e', 'ζ':'z', 'η':'h', 'θ':'8',
    'ι':'i', 'κ':'k', 'λ':'l', 'μ':'m', 'ν':'n', 'ξ':'3', 'ο':'o', 'π':'p',
    'ρ':'r', 'σ':'s', 'τ':'t', 'υ':'y', 'φ':'f', 'χ':'x', 'ψ':'ps', 'ω':'w',
    'ά':'a', 'έ':'e', 'ί':'i', 'ό':'o', 'ύ':'y', 'ή':'h', 'ώ':'w', 'ς':'s',
    'ϊ':'i', 'ΰ':'y', 'ϋ':'y', 'ΐ':'i',
    'Α':'A', 'Β':'B', 'Γ':'G', 'Δ':'D', 'Ε':'E', 'Ζ':'Z', 'Η':'H', 'Θ':'8',
    'Ι':'I', 'Κ':'K', 'Λ':'L', 'Μ':'M', 'Ν':'N', 'Ξ':'3', 'Ο':'O', 'Π':'P',
    'Ρ':'R', 'Σ':'S', 'Τ':'T', 'Υ':'Y', 'Φ':'F', 'Χ':'X', 'Ψ':'PS', 'Ω':'W',
    'Ά':'A', 'Έ':'E', 'Ί':'I', 'Ό':'O', 'Ύ':'Y', 'Ή':'H', 'Ώ':'W', 'Ϊ':'I',
    'Ϋ':'Y'
  };

  var TURKISH_MAP = {
    'ş':'s', 'Ş':'S', 'ı':'i', 'İ':'I', 'ç':'c', 'Ç':'C', 'ü':'u', 'Ü':'U',
    'ö':'o', 'Ö':'O', 'ğ':'g', 'Ğ':'G'
  };

  var RUSSIAN_MAP = {
    'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo', 'ж':'zh',
    'з':'z', 'и':'i', 'й':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o',
    'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'c',
    'ч':'ch', 'ш':'sh', 'щ':'sh', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e', 'ю':'yu',
    'я':'ya',
    'А':'A', 'Б':'B', 'В':'V', 'Г':'G', 'Д':'D', 'Е':'E', 'Ё':'Yo', 'Ж':'Zh',
    'З':'Z', 'И':'I', 'Й':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O',
    'П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'Ф':'F', 'Х':'H', 'Ц':'C',
    'Ч':'Ch', 'Ш':'Sh', 'Щ':'Sh', 'Ъ':'', 'Ы':'Y', 'Ь':'', 'Э':'E', 'Ю':'Yu',
    'Я':'Ya'
  };

  var UKRAINIAN_MAP = {
    'Є':'Ye', 'І':'I', 'Ї':'Yi', 'Ґ':'G', 'є':'ye', 'і':'i', 'ї':'yi', 'ґ':'g'
  };

  var CZECH_MAP = {
    'č':'c', 'ď':'d', 'ě':'e', 'ň':'n', 'ř':'r', 'š':'s', 'ť':'t', 'ů':'u',
    'ž':'z', 'Č':'C', 'Ď':'D', 'Ě':'E', 'Ň':'N', 'Ř':'R', 'Š':'S', 'Ť':'T',
    'Ů':'U', 'Ž':'Z'
  };

  var POLISH_MAP = {
    'ą':'a', 'ć':'c', 'ę':'e', 'ł':'l', 'ń':'n', 'ó':'o', 'ś':'s', 'ź':'z',
    'ż':'z', 'Ą':'A', 'Ć':'C', 'Ę':'e', 'Ł':'L', 'Ń':'N', 'Ó':'o', 'Ś':'S',
    'Ź':'Z', 'Ż':'Z'
  };

  var LATVIAN_MAP = {
    'ā':'a', 'č':'c', 'ē':'e', 'ģ':'g', 'ī':'i', 'ķ':'k', 'ļ':'l', 'ņ':'n',
    'š':'s', 'ū':'u', 'ž':'z', 'Ā':'A', 'Č':'C', 'Ē':'E', 'Ģ':'G', 'Ī':'i',
    'Ķ':'k', 'Ļ':'L', 'Ņ':'N', 'Š':'S', 'Ū':'u', 'Ž':'Z'
  };

  var ALL_DOWNCODE_MAPS = [
    LATIN_MAP,
    LATIN_SYMBOLS_MAP,
    GREEK_MAP,
    TURKISH_MAP,
    RUSSIAN_MAP,
    UKRAINIAN_MAP,
    CZECH_MAP,
    POLISH_MAP,
    LATVIAN_MAP
  ];

  var Downcoder = function() {
    this.map = {};
    this.chars = '';
    for(var i in ALL_DOWNCODE_MAPS) {
      var lookup = ALL_DOWNCODE_MAPS[i];
      for (var c in lookup) {
        this.map[c] = lookup[c];
        this.chars += c;
      }
    }
    this.regex = new RegExp('[' + this.chars + ']|[^' + this.chars + ']+','g');
  };
  Downcoder.prototype.downcode = function(slug) {
    var downcoded = "",
      pieces = slug.match(this.regex);
    if (pieces) {
      for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].length == 1) {
          var mapped = this.map[pieces[i]];
          if (mapped != null) {
            downcoded += mapped;
            continue;
          }
        }
        downcoded += pieces[i];
      }
    }
    else {
      downcoded = slug;
    }
    return downcoded;
  };

  var _downcoder = null;
  function parameterize(s, num_chars) {
    _downcoder || (_downcoder = new Downcoder());

    // changes, e.g., "Petty theft" to "petty_theft"
    // remove all these words from the string before urlifying
    s = _downcoder.downcode(s);

    // if downcode doesn't hit, the char will be stripped here
    s = s.replace(/[^-\w\s]/g, '');  // remove unneeded chars
    s = s.replace(/^\s+|\s+$/g, ''); // trim leading/trailing spaces
    s = s.replace(/[-\s]+/g, '-');   // convert spaces to hyphens
    s = s.toLowerCase();             // convert to lowercase

    return s.substring(0, num_chars);// trim to first num_chars chars
  }

  if (typeof module !== 'undefined') {
    module.exports = parameterize;
  }
  else {
    root.parameterize = parameterize;
  }

}).call({}, this);
