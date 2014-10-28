(function(root, undefined) {

  var FokusCSL = root.FokusCSL || (root.FokusCSL = {}),
    Locales = FokusCSL.Locales || (FokusCSL.Locales = {}),
    Styles = FokusCSL.Styles || (FokusCSL.Styles = {}),
    defaultLang = 'en-US';

  Locales["en-US"] = {
    "children": [
      {
        "children": [
          {
            "children": [],
            "name": "rights",
            "attrs": {
              "license": "http://creativecommons.org/licenses/by-sa/3.0/"
            }
          },
          {
            "children": [],
            "name": "updated",
            "attrs": {}
          }
        ],
        "name": "info",
        "attrs": {}
      },
      {
        "children": [],
        "name": "style-options",
        "attrs": {
          "punctuation-in-quote": "true"
        }
      },
      {
        "children": [
          {
            "children": [],
            "name": "date-part",
            "attrs": {
              "name": "month",
              "suffix": " "
            }
          },
          {
            "children": [],
            "name": "date-part",
            "attrs": {
              "name": "day",
              "form": "numeric-leading-zeros",
              "suffix": ", "
            }
          },
          {
            "children": [],
            "name": "date-part",
            "attrs": {
              "name": "year"
            }
          }
        ],
        "name": "date",
        "attrs": {
          "form": "text"
        }
      },
      {
        "children": [
          {
            "children": [],
            "name": "date-part",
            "attrs": {
              "name": "month",
              "form": "numeric-leading-zeros",
              "suffix": "/"
            }
          },
          {
            "children": [],
            "name": "date-part",
            "attrs": {
              "name": "day",
              "form": "numeric-leading-zeros",
              "suffix": "/"
            }
          },
          {
            "children": [],
            "name": "date-part",
            "attrs": {
              "name": "year"
            }
          }
        ],
        "name": "date",
        "attrs": {
          "form": "numeric"
        }
      },
      {
        "children": [
          {
            "children": [
              "accessed"
            ],
            "name": "term",
            "attrs": {
              "name": "accessed"
            }
          },
          {
            "children": [
              "and"
            ],
            "name": "term",
            "attrs": {
              "name": "and"
            }
          },
          {
            "children": [
              "and others"
            ],
            "name": "term",
            "attrs": {
              "name": "and others"
            }
          },
          {
            "children": [
              "anonymous"
            ],
            "name": "term",
            "attrs": {
              "name": "anonymous"
            }
          },
          {
            "children": [
              "anon."
            ],
            "name": "term",
            "attrs": {
              "name": "anonymous",
              "form": "short"
            }
          },
          {
            "children": [
              "at"
            ],
            "name": "term",
            "attrs": {
              "name": "at"
            }
          },
          {
            "children": [
              "available at"
            ],
            "name": "term",
            "attrs": {
              "name": "available at"
            }
          },
          {
            "children": [
              "by"
            ],
            "name": "term",
            "attrs": {
              "name": "by"
            }
          },
          {
            "children": [
              "circa"
            ],
            "name": "term",
            "attrs": {
              "name": "circa"
            }
          },
          {
            "children": [
              "c."
            ],
            "name": "term",
            "attrs": {
              "name": "circa",
              "form": "short"
            }
          },
          {
            "children": [
              "cited"
            ],
            "name": "term",
            "attrs": {
              "name": "cited"
            }
          },
          {
            "children": [
              {
                "children": [
                  "edition"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "editions"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "edition"
            }
          },
          {
            "children": [
              "ed."
            ],
            "name": "term",
            "attrs": {
              "name": "edition",
              "form": "short"
            }
          },
          {
            "children": [
              "et al."
            ],
            "name": "term",
            "attrs": {
              "name": "et-al"
            }
          },
          {
            "children": [
              "forthcoming"
            ],
            "name": "term",
            "attrs": {
              "name": "forthcoming"
            }
          },
          {
            "children": [
              "from"
            ],
            "name": "term",
            "attrs": {
              "name": "from"
            }
          },
          {
            "children": [
              "ibid."
            ],
            "name": "term",
            "attrs": {
              "name": "ibid"
            }
          },
          {
            "children": [
              "in"
            ],
            "name": "term",
            "attrs": {
              "name": "in"
            }
          },
          {
            "children": [
              "in press"
            ],
            "name": "term",
            "attrs": {
              "name": "in press"
            }
          },
          {
            "children": [
              "internet"
            ],
            "name": "term",
            "attrs": {
              "name": "internet"
            }
          },
          {
            "children": [
              "interview"
            ],
            "name": "term",
            "attrs": {
              "name": "interview"
            }
          },
          {
            "children": [
              "letter"
            ],
            "name": "term",
            "attrs": {
              "name": "letter"
            }
          },
          {
            "children": [
              "no date"
            ],
            "name": "term",
            "attrs": {
              "name": "no date"
            }
          },
          {
            "children": [
              "n.d."
            ],
            "name": "term",
            "attrs": {
              "name": "no date",
              "form": "short"
            }
          },
          {
            "children": [
              "online"
            ],
            "name": "term",
            "attrs": {
              "name": "online"
            }
          },
          {
            "children": [
              "presented at the"
            ],
            "name": "term",
            "attrs": {
              "name": "presented at"
            }
          },
          {
            "children": [
              {
                "children": [
                  "reference"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "references"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "reference"
            }
          },
          {
            "children": [
              {
                "children": [
                  "ref."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "refs."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "reference",
              "form": "short"
            }
          },
          {
            "children": [
              "retrieved"
            ],
            "name": "term",
            "attrs": {
              "name": "retrieved"
            }
          },
          {
            "children": [
              "scale"
            ],
            "name": "term",
            "attrs": {
              "name": "scale"
            }
          },
          {
            "children": [
              "version"
            ],
            "name": "term",
            "attrs": {
              "name": "version"
            }
          },
          {
            "children": [
              "AD"
            ],
            "name": "term",
            "attrs": {
              "name": "ad"
            }
          },
          {
            "children": [
              "BC"
            ],
            "name": "term",
            "attrs": {
              "name": "bc"
            }
          },
          {
            "children": [
              "\u201c"
            ],
            "name": "term",
            "attrs": {
              "name": "open-quote"
            }
          },
          {
            "children": [
              "\u201d"
            ],
            "name": "term",
            "attrs": {
              "name": "close-quote"
            }
          },
          {
            "children": [
              "\u2018"
            ],
            "name": "term",
            "attrs": {
              "name": "open-inner-quote"
            }
          },
          {
            "children": [
              "\u2019"
            ],
            "name": "term",
            "attrs": {
              "name": "close-inner-quote"
            }
          },
          {
            "children": [
              "\u2013"
            ],
            "name": "term",
            "attrs": {
              "name": "page-range-delimiter"
            }
          },
          {
            "children": [
              "th"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal"
            }
          },
          {
            "children": [
              "st"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal-01"
            }
          },
          {
            "children": [
              "nd"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal-02"
            }
          },
          {
            "children": [
              "rd"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal-03"
            }
          },
          {
            "children": [
              "th"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal-11"
            }
          },
          {
            "children": [
              "th"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal-12"
            }
          },
          {
            "children": [
              "th"
            ],
            "name": "term",
            "attrs": {
              "name": "ordinal-13"
            }
          },
          {
            "children": [
              "first"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-01"
            }
          },
          {
            "children": [
              "second"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-02"
            }
          },
          {
            "children": [
              "third"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-03"
            }
          },
          {
            "children": [
              "fourth"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-04"
            }
          },
          {
            "children": [
              "fifth"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-05"
            }
          },
          {
            "children": [
              "sixth"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-06"
            }
          },
          {
            "children": [
              "seventh"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-07"
            }
          },
          {
            "children": [
              "eighth"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-08"
            }
          },
          {
            "children": [
              "ninth"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-09"
            }
          },
          {
            "children": [
              "tenth"
            ],
            "name": "term",
            "attrs": {
              "name": "long-ordinal-10"
            }
          },
          {
            "children": [
              {
                "children": [
                  "book"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "books"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "book"
            }
          },
          {
            "children": [
              {
                "children": [
                  "chapter"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "chapters"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "chapter"
            }
          },
          {
            "children": [
              {
                "children": [
                  "column"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "columns"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "column"
            }
          },
          {
            "children": [
              {
                "children": [
                  "figure"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "figures"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "figure"
            }
          },
          {
            "children": [
              {
                "children": [
                  "folio"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "folios"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "folio"
            }
          },
          {
            "children": [
              {
                "children": [
                  "number"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "numbers"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "issue"
            }
          },
          {
            "children": [
              {
                "children": [
                  "line"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "lines"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "line"
            }
          },
          {
            "children": [
              {
                "children": [
                  "note"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "notes"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "note"
            }
          },
          {
            "children": [
              {
                "children": [
                  "opus"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "opera"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "opus"
            }
          },
          {
            "children": [
              {
                "children": [
                  "page"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "pages"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "page"
            }
          },
          {
            "children": [
              {
                "children": [
                  "paragraph"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "paragraph"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "paragraph"
            }
          },
          {
            "children": [
              {
                "children": [
                  "part"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "parts"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "part"
            }
          },
          {
            "children": [
              {
                "children": [
                  "section"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "sections"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "section"
            }
          },
          {
            "children": [
              {
                "children": [
                  "sub verbo"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "sub verbis"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "sub verbo"
            }
          },
          {
            "children": [
              {
                "children": [
                  "verse"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "verses"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "verse"
            }
          },
          {
            "children": [
              {
                "children": [
                  "volume"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "volumes"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "volume"
            }
          },
          {
            "children": [
              "bk."
            ],
            "name": "term",
            "attrs": {
              "name": "book",
              "form": "short"
            }
          },
          {
            "children": [
              "chap."
            ],
            "name": "term",
            "attrs": {
              "name": "chapter",
              "form": "short"
            }
          },
          {
            "children": [
              "col."
            ],
            "name": "term",
            "attrs": {
              "name": "column",
              "form": "short"
            }
          },
          {
            "children": [
              "fig."
            ],
            "name": "term",
            "attrs": {
              "name": "figure",
              "form": "short"
            }
          },
          {
            "children": [
              "f."
            ],
            "name": "term",
            "attrs": {
              "name": "folio",
              "form": "short"
            }
          },
          {
            "children": [
              "no."
            ],
            "name": "term",
            "attrs": {
              "name": "issue",
              "form": "short"
            }
          },
          {
            "children": [
              "l."
            ],
            "name": "term",
            "attrs": {
              "name": "line",
              "form": "short"
            }
          },
          {
            "children": [
              "n."
            ],
            "name": "term",
            "attrs": {
              "name": "note",
              "form": "short"
            }
          },
          {
            "children": [
              "op."
            ],
            "name": "term",
            "attrs": {
              "name": "opus",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "p."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "pp."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "page",
              "form": "short"
            }
          },
          {
            "children": [
              "para."
            ],
            "name": "term",
            "attrs": {
              "name": "paragraph",
              "form": "short"
            }
          },
          {
            "children": [
              "pt."
            ],
            "name": "term",
            "attrs": {
              "name": "part",
              "form": "short"
            }
          },
          {
            "children": [
              "sec."
            ],
            "name": "term",
            "attrs": {
              "name": "section",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "s.v."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "s.vv."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "sub verbo",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "v."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "vv."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "verse",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "vol."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "vols."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "volume",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "\u00b6"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "\u00b6\u00b6"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "paragraph",
              "form": "symbol"
            }
          },
          {
            "children": [
              {
                "children": [
                  "\u00a7"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "\u00a7\u00a7"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "section",
              "form": "symbol"
            }
          },
          {
            "children": [
              {
                "children": [],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "author"
            }
          },
          {
            "children": [
              {
                "children": [
                  "director"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "directors"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "director"
            }
          },
          {
            "children": [
              {
                "children": [
                  "editor"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "editors"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "editor"
            }
          },
          {
            "children": [
              {
                "children": [
                  "editor"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "editors"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "editorial-director"
            }
          },
          {
            "children": [
              {
                "children": [
                  "illustrator"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "illustrators"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "illustrator"
            }
          },
          {
            "children": [
              {
                "children": [
                  "translator"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "translators"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "translator"
            }
          },
          {
            "children": [
              {
                "children": [
                  "editor & translator"
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "editors & translators"
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "editortranslator"
            }
          },
          {
            "children": [
              {
                "children": [],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "author",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "dir."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "dirs."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "director",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "ed."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "eds."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "editor",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "ed."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "eds."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "editorial-director",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "ill."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "ills."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "illustrator",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "tran."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "trans."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "translator",
              "form": "short"
            }
          },
          {
            "children": [
              {
                "children": [
                  "ed. & tran."
                ],
                "name": "single",
                "attrs": {}
              },
              {
                "children": [
                  "eds. & trans."
                ],
                "name": "multiple",
                "attrs": {}
              }
            ],
            "name": "term",
            "attrs": {
              "name": "editortranslator",
              "form": "short"
            }
          },
          {
            "children": [
              "directed by"
            ],
            "name": "term",
            "attrs": {
              "name": "director",
              "form": "verb"
            }
          },
          {
            "children": [
              "edited by"
            ],
            "name": "term",
            "attrs": {
              "name": "editor",
              "form": "verb"
            }
          },
          {
            "children": [
              "edited by"
            ],
            "name": "term",
            "attrs": {
              "name": "editorial-director",
              "form": "verb"
            }
          },
          {
            "children": [
              "illustrated by"
            ],
            "name": "term",
            "attrs": {
              "name": "illustrator",
              "form": "verb"
            }
          },
          {
            "children": [
              "interview by"
            ],
            "name": "term",
            "attrs": {
              "name": "interviewer",
              "form": "verb"
            }
          },
          {
            "children": [
              "to"
            ],
            "name": "term",
            "attrs": {
              "name": "recipient",
              "form": "verb"
            }
          },
          {
            "children": [
              "by"
            ],
            "name": "term",
            "attrs": {
              "name": "reviewed-author",
              "form": "verb"
            }
          },
          {
            "children": [
              "translated by"
            ],
            "name": "term",
            "attrs": {
              "name": "translator",
              "form": "verb"
            }
          },
          {
            "children": [
              "edited & translated by"
            ],
            "name": "term",
            "attrs": {
              "name": "editortranslator",
              "form": "verb"
            }
          },
          {
            "children": [
              "by"
            ],
            "name": "term",
            "attrs": {
              "name": "container-author",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "dir."
            ],
            "name": "term",
            "attrs": {
              "name": "director",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "ed."
            ],
            "name": "term",
            "attrs": {
              "name": "editor",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "ed."
            ],
            "name": "term",
            "attrs": {
              "name": "editorial-director",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "illus."
            ],
            "name": "term",
            "attrs": {
              "name": "illustrator",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "trans."
            ],
            "name": "term",
            "attrs": {
              "name": "translator",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "ed. & trans. by"
            ],
            "name": "term",
            "attrs": {
              "name": "editortranslator",
              "form": "verb-short"
            }
          },
          {
            "children": [
              "January"
            ],
            "name": "term",
            "attrs": {
              "name": "month-01"
            }
          },
          {
            "children": [
              "February"
            ],
            "name": "term",
            "attrs": {
              "name": "month-02"
            }
          },
          {
            "children": [
              "March"
            ],
            "name": "term",
            "attrs": {
              "name": "month-03"
            }
          },
          {
            "children": [
              "April"
            ],
            "name": "term",
            "attrs": {
              "name": "month-04"
            }
          },
          {
            "children": [
              "May"
            ],
            "name": "term",
            "attrs": {
              "name": "month-05"
            }
          },
          {
            "children": [
              "June"
            ],
            "name": "term",
            "attrs": {
              "name": "month-06"
            }
          },
          {
            "children": [
              "July"
            ],
            "name": "term",
            "attrs": {
              "name": "month-07"
            }
          },
          {
            "children": [
              "August"
            ],
            "name": "term",
            "attrs": {
              "name": "month-08"
            }
          },
          {
            "children": [
              "September"
            ],
            "name": "term",
            "attrs": {
              "name": "month-09"
            }
          },
          {
            "children": [
              "October"
            ],
            "name": "term",
            "attrs": {
              "name": "month-10"
            }
          },
          {
            "children": [
              "November"
            ],
            "name": "term",
            "attrs": {
              "name": "month-11"
            }
          },
          {
            "children": [
              "December"
            ],
            "name": "term",
            "attrs": {
              "name": "month-12"
            }
          },
          {
            "children": [
              "Jan."
            ],
            "name": "term",
            "attrs": {
              "name": "month-01",
              "form": "short"
            }
          },
          {
            "children": [
              "Feb."
            ],
            "name": "term",
            "attrs": {
              "name": "month-02",
              "form": "short"
            }
          },
          {
            "children": [
              "Mar."
            ],
            "name": "term",
            "attrs": {
              "name": "month-03",
              "form": "short"
            }
          },
          {
            "children": [
              "Apr."
            ],
            "name": "term",
            "attrs": {
              "name": "month-04",
              "form": "short"
            }
          },
          {
            "children": [
              "May"
            ],
            "name": "term",
            "attrs": {
              "name": "month-05",
              "form": "short"
            }
          },
          {
            "children": [
              "Jun."
            ],
            "name": "term",
            "attrs": {
              "name": "month-06",
              "form": "short"
            }
          },
          {
            "children": [
              "Jul."
            ],
            "name": "term",
            "attrs": {
              "name": "month-07",
              "form": "short"
            }
          },
          {
            "children": [
              "Aug."
            ],
            "name": "term",
            "attrs": {
              "name": "month-08",
              "form": "short"
            }
          },
          {
            "children": [
              "Sep."
            ],
            "name": "term",
            "attrs": {
              "name": "month-09",
              "form": "short"
            }
          },
          {
            "children": [
              "Oct."
            ],
            "name": "term",
            "attrs": {
              "name": "month-10",
              "form": "short"
            }
          },
          {
            "children": [
              "Nov."
            ],
            "name": "term",
            "attrs": {
              "name": "month-11",
              "form": "short"
            }
          },
          {
            "children": [
              "Dec."
            ],
            "name": "term",
            "attrs": {
              "name": "month-12",
              "form": "short"
            }
          },
          {
            "children": [
              "Spring"
            ],
            "name": "term",
            "attrs": {
              "name": "season-01"
            }
          },
          {
            "children": [
              "Summer"
            ],
            "name": "term",
            "attrs": {
              "name": "season-02"
            }
          },
          {
            "children": [
              "Autumn"
            ],
            "name": "term",
            "attrs": {
              "name": "season-03"
            }
          },
          {
            "children": [
              "Winter"
            ],
            "name": "term",
            "attrs": {
              "name": "season-04"
            }
          }
        ],
        "name": "terms",
        "attrs": {}
      }
    ],
    "name": "locale",
    "attrs": {
      "xmlns": "http://purl.org/net/xbiblio/csl",
      "version": "1.0",
      "xml:lang": "en-US"
    }
  };

  Styles["mhra"] = {
    "children": [
      {
        "children": [
          {
            "children": [],
            "name": "title",
            "attrs": {}
          },
          {
            "children": [],
            "name": "id",
            "attrs": {}
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://www.zotero.org/styles/mhra"
            }
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://www.mhra.org.uk/Publications/Books/StyleGuide/download.shtml",
              "rel": "documentation"
            }
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "author",
            "attrs": {}
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "history"
            }
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "numeric"
            }
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "generic-base"
            }
          },
          {
            "children": [],
            "name": "updated",
            "attrs": {}
          }
        ],
        "name": "info",
        "attrs": {}
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": " ",
                  "suffix": " ",
                  "form": "verb-short",
                  "text-case": "lowercase"
                }
              },
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", "
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "editor translator",
              "delimiter": ", ",
              "prefix": "",
              "suffix": ""
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "editor-translator"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": " ",
                  "suffix": ". ",
                  "form": "short",
                  "text-case": "lowercase"
                }
              },
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", "
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "editor translator",
              "delimiter": ", ",
              "prefix": "",
              "suffix": ""
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "editor-translator-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "first"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "title"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "all"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "title"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author-full"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "form": "long"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "short"
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "URL"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "term": "accessed",
                      "suffix": " ",
                      "text-case": "lowercase"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "month",
                          "suffix": " "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "day",
                          "suffix": ", "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "year"
                        }
                      }
                    ],
                    "name": "date",
                    "attrs": {
                      "variable": "accessed",
                      "suffix": ", "
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "delimiter": " ",
                  "prefix": " (",
                  "suffix": ")"
                }
              }
            ],
            "name": "group",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "access"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "quotes": "true",
                      "form": "long"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "thesis"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "font-style": "italic",
                      "form": "long"
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "type": "book"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "quotes": "true",
                      "form": "long"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "title"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "publisher-place"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "publisher"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ": "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "publisher"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "label",
                    "attrs": {
                      "variable": "page",
                      "suffix": ". ",
                      "form": "short"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "article-journal",
                  "match": "none"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "page"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "pages"
        }
      },
      {
        "children": [
          {
            "children": [],
            "name": "label",
            "attrs": {
              "variable": "locator",
              "suffix": ". ",
              "form": "short"
            }
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "locator"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "locator"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "number-of-volumes"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "prefix": " ",
                      "plural": "true",
                      "term": "volume",
                      "form": "short"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "variable": "number-of-volumes"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "vols"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "author-short",
                      "suffix": ", "
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "title",
                      "prefix": ""
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "genre"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "publisher"
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "year"
                                    }
                                  }
                                ],
                                "name": "date",
                                "attrs": {
                                  "variable": "issued"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": " (",
                              "suffix": ")"
                            }
                          }
                        ],
                        "name": "if",
                        "attrs": {
                          "type": "thesis"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "term": "in",
                                  "text-case": "lowercase"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "container-title",
                                  "prefix": " ",
                                  "font-style": "italic",
                                  "suffix": ","
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "collection-title",
                                  "prefix": " ",
                                  "suffix": ","
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "editor-translator-short"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "prefix": ", "
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "publisher"
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "year"
                                    }
                                  }
                                ],
                                "name": "date",
                                "attrs": {
                                  "variable": "issued"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": " (",
                              "suffix": ")"
                            }
                          }
                        ],
                        "name": "else-if",
                        "attrs": {
                          "type": "chapter"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "editor-translator-short"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "collection-title"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "edition",
                                  "suffix": " edn"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "vols"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "publisher"
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "year"
                                    }
                                  }
                                ],
                                "name": "date",
                                "attrs": {
                                  "variable": "issued",
                                  "prefix": " ",
                                  "suffix": ""
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": " (",
                              "suffix": ")"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "volume",
                              "prefix": ", "
                            }
                          }
                        ],
                        "name": "else-if",
                        "attrs": {
                          "type": "book"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "container-title",
                                  "font-style": "italic"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "issue",
                                  "suffix": "."
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "day",
                                      "form": "numeric",
                                      "suffix": " "
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "month",
                                      "form": "long",
                                      "suffix": " "
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "year"
                                    }
                                  }
                                ],
                                "name": "date",
                                "attrs": {
                                  "variable": "issued"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": ", "
                            }
                          }
                        ],
                        "name": "else-if",
                        "attrs": {
                          "type": "article-newspaper article-magazine",
                          "match": "any"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "container-title",
                                  "font-style": "italic"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "publisher"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "volume",
                                  "prefix": " "
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": ", "
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "issued",
                              "prefix": " (",
                              "suffix": ")"
                            }
                          }
                        ],
                        "name": "else-if",
                        "attrs": {
                          "type": "article-journal"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "container-title",
                                  "font-style": "italic"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "issue",
                                  "prefix": ", ",
                                  "suffix": "."
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "month",
                                      "form": "long"
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "prefix": " ",
                                      "name": "day",
                                      "form": "numeric",
                                      "suffix": ", "
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "date-part",
                                    "attrs": {
                                      "name": "year"
                                    }
                                  }
                                ],
                                "name": "date",
                                "attrs": {
                                  "variable": "issued"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "prefix": ". "
                            }
                          }
                        ],
                        "name": "else",
                        "attrs": {}
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "pages"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "locator",
                          "prefix": "(",
                          "suffix": ")"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": " ",
                      "prefix": ", "
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "suffix": ""
                }
              }
            ],
            "name": "layout",
            "attrs": {
              "delimiter": "; ",
              "suffix": "."
            }
          }
        ],
        "name": "citation",
        "attrs": {}
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "macro": "author"
                }
              },
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "variable": "title"
                }
              }
            ],
            "name": "sort",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "author",
                  "suffix": ","
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "genre"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "publisher"
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "issued"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", ",
                          "prefix": " "
                        }
                      }
                    ],
                    "name": "if",
                    "attrs": {
                      "type": "thesis"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "title",
                          "prefix": " "
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "in",
                              "text-case": "lowercase"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "prefix": " ",
                              "font-style": "italic",
                              "suffix": ","
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "collection-title",
                              "prefix": " ",
                              "suffix": ","
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator-short"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "prefix": ", "
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "publisher"
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "issued"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", ",
                          "prefix": " (",
                          "suffix": ")"
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "chapter"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator",
                              "prefix": " "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "prefix": " ",
                              "font-style": "italic"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "volume",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "issue",
                              "prefix": ", no. "
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "month",
                                  "suffix": " "
                                }
                              },
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "day",
                                  "suffix": ", "
                                }
                              },
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "issued",
                              "prefix": " (",
                              "suffix": ")"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "page",
                              "prefix": ": "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "prefix": " ",
                          "suffix": ""
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "article-journal"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator",
                              "prefix": " "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "font-style": "italic"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "issue",
                              "suffix": "."
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "month",
                                  "form": "long"
                                }
                              },
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "prefix": " ",
                                  "name": "day",
                                  "form": "numeric",
                                  "suffix": ", "
                                }
                              },
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "issued"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", ",
                          "prefix": " "
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "article-newspaper article-magazine",
                      "match": "any"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator",
                              "prefix": " "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "value": "paper presented at",
                              "text-case": "capitalize-first"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "event",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "event-place",
                              "prefix": ", "
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "month",
                                  "form": "long"
                                }
                              },
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "prefix": " ",
                                  "name": "day",
                                  "form": "numeric",
                                  "suffix": ", "
                                }
                              },
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "event"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": ""
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "paper-conference"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " ",
                              "suffix": "."
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator-short"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "collection-title"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "edition",
                              "suffix": " edn"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "vols"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", ",
                          "prefix": " "
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "publisher"
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "date-part",
                                "attrs": {
                                  "name": "year"
                                }
                              }
                            ],
                            "name": "date",
                            "attrs": {
                              "variable": "issued",
                              "prefix": " ",
                              "suffix": ""
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", ",
                          "prefix": " (",
                          "suffix": ")"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "variable": "volume",
                          "prefix": ", "
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "book"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator",
                              "prefix": " "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "font-style": "italic"
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "volume",
                                  "font-style": "italic"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "issue",
                                  "prefix": "(",
                                  "suffix": ")"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "prefix": ", "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "page",
                              "prefix": ", "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "prefix": " ",
                          "suffix": ""
                        }
                      }
                    ],
                    "name": "else",
                    "attrs": {}
                  }
                ],
                "name": "choose",
                "attrs": {}
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "access",
                  "prefix": " "
                }
              }
            ],
            "name": "layout",
            "attrs": {
              "suffix": "."
            }
          }
        ],
        "name": "bibliography",
        "attrs": {
          "et-al-min": "6",
          "et-al-use-first": "6",
          "subsequent-author-substitute": "---",
          "hanging-indent": "true"
        }
      }
    ],
    "name": "style",
    "attrs": {
      "xmlns": "http://purl.org/net/xbiblio/csl",
      "class": "note",
      "lang": "en",
      "version": "1.0"
    }
  };

  Styles['chicago'] = {
    "children": [
      {
        "children": [
          {
            "children": [],
            "name": "title",
            "attrs": {}
          },
          {
            "children": [],
            "name": "id",
            "attrs": {}
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://www.zotero.org/styles/chicago-note-bibliography"
            }
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://www.chicagomanualofstyle.org/tools_citationguide.html",
              "rel": "documentation"
            }
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "author",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "contributor",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "contributor",
            "attrs": {}
          },
          {
            "children": [],
            "name": "summary",
            "attrs": {}
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "generic-base"
            }
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "numeric"
            }
          },
          {
            "children": [],
            "name": "updated",
            "attrs": {}
          }
        ],
        "name": "info",
        "attrs": {}
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "label",
                                    "attrs": {
                                      "prefix": " ",
                                      "suffix": " ",
                                      "form": "verb",
                                      "text-case": "capitalize-first"
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "name",
                                    "attrs": {
                                      "and": "text",
                                      "delimiter": ", "
                                    }
                                  }
                                ],
                                "name": "names",
                                "attrs": {
                                  "variable": "editor",
                                  "delimiter": ". "
                                }
                              }
                            ],
                            "name": "if",
                            "attrs": {
                              "variable": "author"
                            }
                          }
                        ],
                        "name": "choose",
                        "attrs": {}
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "label",
                                    "attrs": {
                                      "prefix": " ",
                                      "suffix": " ",
                                      "form": "verb",
                                      "text-case": "capitalize-first"
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "name",
                                    "attrs": {
                                      "and": "text",
                                      "delimiter": ", "
                                    }
                                  }
                                ],
                                "name": "names",
                                "attrs": {
                                  "variable": "translator",
                                  "delimiter": ". "
                                }
                              }
                            ],
                            "name": "if",
                            "attrs": {
                              "variable": "author editor",
                              "match": "any"
                            }
                          }
                        ],
                        "name": "choose",
                        "attrs": {}
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": ". "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "chapter",
                  "match": "none"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "secondary-contributors"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "label",
                                    "attrs": {
                                      "suffix": " ",
                                      "form": "verb",
                                      "text-case": "lowercase"
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "name",
                                    "attrs": {
                                      "and": "text",
                                      "delimiter": ", "
                                    }
                                  }
                                ],
                                "name": "names",
                                "attrs": {
                                  "variable": "editor",
                                  "delimiter": ", "
                                }
                              }
                            ],
                            "name": "if",
                            "attrs": {
                              "variable": "author"
                            }
                          }
                        ],
                        "name": "choose",
                        "attrs": {}
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [
                                  {
                                    "children": [],
                                    "name": "label",
                                    "attrs": {
                                      "suffix": " ",
                                      "form": "verb",
                                      "text-case": "lowercase"
                                    }
                                  },
                                  {
                                    "children": [],
                                    "name": "name",
                                    "attrs": {
                                      "and": "text",
                                      "delimiter": ", "
                                    }
                                  }
                                ],
                                "name": "names",
                                "attrs": {
                                  "variable": "translator",
                                  "delimiter": ", "
                                }
                              }
                            ],
                            "name": "if",
                            "attrs": {
                              "variable": "author editor",
                              "match": "any"
                            }
                          }
                        ],
                        "name": "choose",
                        "attrs": {}
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": ", "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "chapter"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "container-contributors"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "first"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "short"
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "editor"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "editor"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "first"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "verb-short"
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "translator"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "translator"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": " ",
                  "suffix": " ",
                  "form": "verb",
                  "text-case": "lowercase"
                }
              },
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", "
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "recipient",
              "delimiter": ", "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "recipient-note"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "genre",
                              "text-case": "capitalize-first"
                            }
                          }
                        ],
                        "name": "if",
                        "attrs": {
                          "variable": "genre"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "letter",
                              "text-case": "capitalize-first"
                            }
                          }
                        ],
                        "name": "else",
                        "attrs": {}
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "personal_communication"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "macro": "recipient-note",
              "prefix": " "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "recipient"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "first"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "translator"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "macro": "recipient",
              "prefix": ". "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "contributors"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": " ",
                  "suffix": " ",
                  "form": "verb",
                  "text-case": "lowercase"
                }
              },
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "form": "short"
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "recipient"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "recipient-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "form": "short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "macro": "recipient-short"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "contributors-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "all"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "verb-short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "contributors-sort"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": " ",
                  "suffix": " ",
                  "form": "verb",
                  "text-case": "capitalize-first"
                }
              },
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", "
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "interviewer",
              "delimiter": ", "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "interviewer"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "genre",
                              "text-case": "capitalize-first"
                            }
                          }
                        ],
                        "name": "if",
                        "attrs": {
                          "type": "personal_communication",
                          "match": "none"
                        }
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  }
                ],
                "name": "if",
                "attrs": {
                  "variable": "title",
                  "match": "none"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "font-style": "italic"
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "type": "book"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "quotes": "true"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "title"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "interview",
                              "text-case": "lowercase"
                            }
                          }
                        ],
                        "name": "if",
                        "attrs": {
                          "type": "interview"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "genre",
                              "form": "short"
                            }
                          }
                        ],
                        "name": "else-if",
                        "attrs": {
                          "type": "manuscript speech",
                          "match": "any"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "issued"
                            }
                          }
                        ],
                        "name": "else-if",
                        "attrs": {
                          "type": "personal_communication"
                        }
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  }
                ],
                "name": "if",
                "attrs": {
                  "variable": "title",
                  "match": "none"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "font-style": "italic",
                      "form": "short"
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "type": "book"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "quotes": "true",
                      "form": "short"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "title-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "interviewer"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "medium",
                      "text-case": "capitalize-first"
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "delimiter": ". "
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "if",
                    "attrs": {
                      "variable": "title",
                      "match": "none"
                    }
                  },
                  {
                    "children": [],
                    "name": "else-if",
                    "attrs": {
                      "type": "thesis speech",
                      "match": "any"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "variable": "genre",
                          "text-case": "capitalize-first"
                        }
                      }
                    ],
                    "name": "else",
                    "attrs": {}
                  }
                ],
                "name": "choose",
                "attrs": {}
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ", "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "description"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "term": "in",
                      "suffix": " ",
                      "text-case": "capitalize-first"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "chapter"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "container-title",
              "font-style": "italic"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "container-title"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "number",
                                "attrs": {
                                  "variable": "edition",
                                  "form": "ordinal"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "term": "edition",
                                  "suffix": ".",
                                  "form": "short"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": " "
                            }
                          }
                        ],
                        "name": "if",
                        "attrs": {
                          "is-numeric": "edition"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "edition",
                              "suffix": ".",
                              "text-case": "capitalize-first"
                            }
                          }
                        ],
                        "name": "else",
                        "attrs": {}
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "book chapter",
                  "match": "any"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "edition"
        }
      },
      {
        "children": [
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "collection-title"
            }
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "collection-number",
              "prefix": " "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "collection-title"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "volume",
                      "prefix": " "
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "issue",
                      "prefix": ", no. "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "article-journal"
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "volume",
                              "suffix": ". ",
                              "form": "short",
                              "text-case": "capitalize-first"
                            }
                          },
                          {
                            "children": [],
                            "name": "number",
                            "attrs": {
                              "variable": "volume",
                              "form": "numeric"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {}
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "number",
                            "attrs": {
                              "variable": "number-of-volumes",
                              "form": "numeric"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "prefix": " ",
                              "plural": "true",
                              "term": "volume",
                              "form": "short",
                              "suffix": "."
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {}
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "edition"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": ". ",
                      "prefix": ". "
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "type": "book"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "locators"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "edition",
                              "suffix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "prefix": " ",
                              "term": "edition"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {}
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "section",
                              "suffix": ". ",
                              "form": "short"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "section"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {}
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": ", "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "article-newspaper"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "locators-newspaper"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "term": "presented at",
                  "suffix": " "
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "event"
                }
              }
            ],
            "name": "group",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "event"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "publisher-place"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "publisher"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ": "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "publisher"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "month",
                          "suffix": " "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "day",
                          "suffix": ", "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "year"
                        }
                      }
                    ],
                    "name": "date",
                    "attrs": {
                      "variable": "issued"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "graphic report",
                  "match": "any"
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "year"
                        }
                      }
                    ],
                    "name": "date",
                    "attrs": {
                      "variable": "issued"
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "type": "book chapter thesis",
                  "match": "any"
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "month",
                          "suffix": " "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "day",
                          "suffix": ", "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "year"
                        }
                      }
                    ],
                    "name": "date",
                    "attrs": {
                      "variable": "issued"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "issued"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "volume",
                      "suffix": ":"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "page"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "chapter"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "pages-chapter"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "page",
                      "prefix": ": "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "article-journal"
                }
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "pages-article"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "label",
                        "attrs": {
                          "variable": "locator",
                          "form": "short",
                          "strip-periods": "false",
                          "suffix": " "
                        }
                      }
                    ],
                    "name": "if",
                    "attrs": {
                      "locator": "page",
                      "match": "none"
                    }
                  }
                ],
                "name": "choose",
                "attrs": {}
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "locator"
                }
              }
            ],
            "name": "group",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "point-locators-subsequent"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "archive_location",
                  "text-case": "capitalize-first"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "archive"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "archive-place"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ". "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "archive"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "issued",
                      "prefix": " (",
                      "suffix": ")"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "article-journal"
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "if",
                        "attrs": {
                          "variable": "title",
                          "match": "none"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "genre",
                              "prefix": ". ",
                              "text-case": "capitalize-first"
                            }
                          }
                        ],
                        "name": "else",
                        "attrs": {}
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "event",
                      "prefix": " "
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "event-place",
                      "prefix": ", "
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "issued",
                      "prefix": ", "
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "type": "speech"
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "genre",
                                  "text-case": "capitalize-first"
                                }
                              }
                            ],
                            "name": "if",
                            "attrs": {
                              "type": "thesis"
                            }
                          }
                        ],
                        "name": "choose",
                        "attrs": {}
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "publisher"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "issued"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": ", ",
                      "prefix": ". "
                    }
                  }
                ],
                "name": "else-if",
                "attrs": {
                  "variable": "publisher-place publisher",
                  "match": "any"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "issued",
                      "prefix": ", "
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "issue"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "archive"
                        }
                      }
                    ],
                    "name": "if",
                    "attrs": {
                      "type": "graphic report",
                      "match": "any"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "archive"
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "book thesis chapter article-journal article-newspaper article-magazine",
                      "match": "none"
                    }
                  }
                ],
                "name": "choose",
                "attrs": {}
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "DOI",
                  "prefix": "doi:"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "URL"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ". "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "access"
        }
      },
      {
        "children": [
          {
            "children": [],
            "name": "text",
            "attrs": {
              "macro": "contributors-sort",
              "suffix": " "
            }
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "title",
              "suffix": " "
            }
          },
          {
            "children": [],
            "name": "text",
            "attrs": {
              "variable": "genre"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "sort-key"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "ibid",
                              "suffix": ".",
                              "text-case": "capitalize-first"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "point-locators-subsequent"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", "
                        }
                      }
                    ],
                    "name": "if",
                    "attrs": {
                      "position": "ibid-with-locator"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "term": "ibid",
                          "suffix": ".",
                          "text-case": "capitalize-first"
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "position": "ibid"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "contributors-short"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title-short"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "point-locators-subsequent"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ", "
                        }
                      }
                    ],
                    "name": "else",
                    "attrs": {}
                  }
                ],
                "name": "choose",
                "attrs": {}
              }
            ],
            "name": "layout",
            "attrs": {
              "delimiter": "; ",
              "prefix": "",
              "suffix": "."
            }
          }
        ],
        "name": "citation",
        "attrs": {
          "et-al-subsequent-min": "4",
          "et-al-min": "4",
          "et-al-subsequent-use-first": "1",
          "et-al-use-first": "1",
          "disambiguate-add-names": "true"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "macro": "sort-key"
                }
              },
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "variable": "issued"
                }
              }
            ],
            "name": "sort",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "contributors"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "title"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "description"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "secondary-contributors"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "container-title"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "container-contributors"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "pages-chapter"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": ", "
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "delimiter": ". "
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "locators"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "collection-title",
                  "prefix": ". "
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "issue"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "locators-newspaper",
                  "prefix": ", "
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "pages-article"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "access",
                  "prefix": ". "
                }
              }
            ],
            "name": "layout",
            "attrs": {
              "suffix": "."
            }
          }
        ],
        "name": "bibliography",
        "attrs": {
          "et-al-min": "11",
          "et-al-use-first": "7",
          "entry-spacing": "0",
          "subsequent-author-substitute": "---",
          "hanging-indent": "true"
        }
      }
    ],
    "name": "style",
    "attrs": {
      "xmlns": "http://purl.org/net/xbiblio/csl",
      "class": "note",
      "lang": "en",
      "version": "1.0"
    }
  };

  Styles['harvard'] = {
    "children": [
      {
        "children": [
          {
            "children": [],
            "name": "title",
            "attrs": {}
          },
          {
            "children": [],
            "name": "id",
            "attrs": {}
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://www.zotero.org/styles/harvard1"
            }
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "author",
            "attrs": {}
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "author-date"
            }
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "generic-base"
            }
          },
          {
            "children": [],
            "name": "updated",
            "attrs": {}
          },
          {
            "children": [],
            "name": "summary",
            "attrs": {}
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://libweb.anglia.ac.uk/referencing/harvard.htm",
              "rel": "documentation"
            }
          }
        ],
        "name": "info",
        "attrs": {}
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "symbol",
                  "initialize-with": ". ",
                  "delimiter": ", "
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "short",
                  "text-case": "lowercase"
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "editor",
              "delimiter": ", "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "editor"
        }
      },
      {
        "children": [
          {
            "children": [],
            "name": "text",
            "attrs": {
              "term": "anonymous",
              "form": "short",
              "text-case": "capitalize-first"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "anon"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "symbol",
                  "delimiter-precedes-last": "never",
                  "initialize-with": ".",
                  "name-as-sort-order": "all",
                  "delimiter": ", ",
                  "sort-separator": ", "
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": " ",
                  "suffix": ".",
                  "form": "short",
                  "text-case": "lowercase"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "anon"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "symbol",
                  "initialize-with": ". ",
                  "delimiter": ", ",
                  "delimiter-precedes-last": "never",
                  "form": "short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "anon"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "suffix": " ",
                  "value": "Available at:"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "URL"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "term": "accessed",
                      "suffix": " ",
                      "text-case": "capitalize-first"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "month",
                          "suffix": " "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "day",
                          "suffix": ", "
                        }
                      },
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "year"
                        }
                      }
                    ],
                    "name": "date",
                    "attrs": {
                      "variable": "accessed"
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "prefix": " [",
                  "suffix": "]"
                }
              }
            ],
            "name": "group",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "access"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "font-style": "italic"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "book thesis",
                  "match": "any"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "title"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "publisher-place"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "publisher"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ": "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "publisher"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "date-part",
                        "attrs": {
                          "name": "year"
                        }
                      }
                    ],
                    "name": "date",
                    "attrs": {
                      "variable": "issued"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "variable": "issued"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "term": "no date"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "year-date"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "number",
                        "attrs": {
                          "variable": "edition",
                          "form": "ordinal"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "term": "edition",
                          "suffix": ".",
                          "form": "short"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": " "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "is-numeric": "edition"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "edition",
                      "suffix": "."
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "edition"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "variable": "page",
                  "form": "short",
                  "strip-periods": "false",
                  "suffix": " "
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "page"
                }
              }
            ],
            "name": "group",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "pages"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "author-short"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "year-date"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": " "
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "label",
                        "attrs": {
                          "variable": "locator",
                          "suffix": ".",
                          "form": "short"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "variable": "locator"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {}
                  }
                ],
                "name": "group",
                "attrs": {
                  "delimiter": ", "
                }
              }
            ],
            "name": "layout",
            "attrs": {
              "delimiter": "; ",
              "prefix": "(",
              "suffix": ")"
            }
          }
        ],
        "name": "citation",
        "attrs": {
          "et-al-subsequent-use-first": "1",
          "et-al-subsequent-min": "3",
          "et-al-min": "3",
          "et-al-use-first": "1",
          "disambiguate-add-names": "true",
          "disambiguate-add-year-suffix": "true",
          "disambiguate-add-givenname": "true"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "macro": "author"
                }
              },
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "variable": "title"
                }
              }
            ],
            "name": "sort",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "author",
                  "suffix": ","
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "date-part",
                    "attrs": {
                      "name": "year"
                    }
                  }
                ],
                "name": "date",
                "attrs": {
                  "variable": "issued",
                  "prefix": " ",
                  "suffix": "."
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "edition"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": " ",
                          "prefix": " ",
                          "suffix": ","
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "publisher",
                          "prefix": " ",
                          "suffix": "."
                        }
                      }
                    ],
                    "name": "if",
                    "attrs": {
                      "type": "book"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "title",
                          "prefix": " ",
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "term": "in",
                              "text-case": "capitalize-first"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "font-style": "italic",
                              "suffix": "."
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "collection-title",
                              "suffix": "."
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "publisher",
                                  "prefix": " "
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "pages"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", ",
                              "suffix": "."
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": " ",
                          "prefix": " "
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "chapter"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "genre"
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "publisher"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ". ",
                          "prefix": " ",
                          "suffix": "."
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "thesis"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title",
                              "prefix": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor",
                              "prefix": " "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "suffix": "."
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "font-style": "italic"
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "volume"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "issue",
                                  "prefix": "(",
                                  "suffix": ")"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "prefix": ", "
                            }
                          },
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "label",
                                "attrs": {
                                  "variable": "locator",
                                  "suffix": ".",
                                  "form": "short"
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "page"
                                }
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "prefix": ", "
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "prefix": " ",
                          "suffix": "."
                        }
                      }
                    ],
                    "name": "else",
                    "attrs": {}
                  }
                ],
                "name": "choose",
                "attrs": {}
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "access",
                  "prefix": " ",
                  "suffix": "."
                }
              }
            ],
            "name": "layout",
            "attrs": {}
          }
        ],
        "name": "bibliography",
        "attrs": {
          "et-al-min": "4",
          "et-al-use-first": "1",
          "hanging-indent": "true"
        }
      }
    ],
    "name": "style",
    "attrs": {
      "xmlns": "http://purl.org/net/xbiblio/csl",
      "class": "in-text",
      "lang": "en",
      "version": "1.0"
    }
  };

  Styles["mla"] = {
    "children": [
      {
        "children": [
          {
            "children": [],
            "name": "title",
            "attrs": {}
          },
          {
            "children": [],
            "name": "id",
            "attrs": {}
          },
          {
            "children": [],
            "name": "link",
            "attrs": {
              "href": "http://www.zotero.org/styles/mla"
            }
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "author",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {}
              },
              {
                "children": [],
                "name": "email",
                "attrs": {}
              }
            ],
            "name": "contributor",
            "attrs": {}
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "generic-base"
            }
          },
          {
            "children": [],
            "name": "category",
            "attrs": {
              "term": "author-date"
            }
          },
          {
            "children": [],
            "name": "updated",
            "attrs": {}
          }
        ],
        "name": "info",
        "attrs": {}
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "suffix": ". ",
                  "form": "verb-short",
                  "text-case": "capitalize-first"
                }
              },
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "symbol",
                  "delimiter": ", "
                }
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "editor translator",
              "delimiter": ". "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "editor-translator"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "text",
                  "delimiter": ", ",
                  "sort-separator": ", ",
                  "delimiter-precedes-last": "always",
                  "name-as-sort-order": "first"
                }
              },
              {
                "children": [],
                "name": "label",
                "attrs": {
                  "prefix": ", ",
                  "suffix": ".",
                  "form": "short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "title"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "name",
                "attrs": {
                  "and": "symbol",
                  "initialize-with": ". ",
                  "delimiter": ", ",
                  "form": "short"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "editor"
                    }
                  },
                  {
                    "children": [],
                    "name": "names",
                    "attrs": {
                      "variable": "translator"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "macro": "title-short"
                    }
                  }
                ],
                "name": "substitute",
                "attrs": {}
              }
            ],
            "name": "names",
            "attrs": {
              "variable": "author"
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "author-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "date-part",
                    "attrs": {
                      "name": "day",
                      "suffix": " "
                    }
                  },
                  {
                    "children": [],
                    "name": "date-part",
                    "attrs": {
                      "form": "short",
                      "name": "month",
                      "strip-periods": "false",
                      "suffix": " "
                    }
                  },
                  {
                    "children": [],
                    "name": "date-part",
                    "attrs": {
                      "name": "year"
                    }
                  }
                ],
                "name": "date",
                "attrs": {
                  "variable": "accessed"
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "variable": "URL",
                  "prefix": "<",
                  "suffix": ">"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": " "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "access"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "font-style": "italic"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "book"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "quotes": "true"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "title"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "font-style": "italic",
                      "form": "short"
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "type": "book"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "title",
                      "quotes": "true",
                      "form": "short"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "title-short"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "number",
                        "attrs": {
                          "variable": "edition",
                          "form": "ordinal"
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "term": "edition",
                          "suffix": ".",
                          "form": "short"
                        }
                      }
                    ],
                    "name": "group",
                    "attrs": {
                      "delimiter": " "
                    }
                  }
                ],
                "name": "if",
                "attrs": {
                  "is-numeric": "edition"
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "edition"
                    }
                  }
                ],
                "name": "else",
                "attrs": {}
              }
            ],
            "name": "choose",
            "attrs": {}
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "edition"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "publisher-place"
                    }
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "publisher"
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "delimiter": ": "
                }
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "date-part",
                    "attrs": {
                      "name": "year"
                    }
                  }
                ],
                "name": "date",
                "attrs": {
                  "variable": "issued"
                }
              }
            ],
            "name": "group",
            "attrs": {
              "delimiter": ", "
            }
          }
        ],
        "name": "macro",
        "attrs": {
          "name": "publisher-year"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "author-short"
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [
                                      {
                                        "children": [],
                                        "name": "text",
                                        "attrs": {
                                          "macro": "title-short"
                                        }
                                      }
                                    ],
                                    "name": "if",
                                    "attrs": {
                                      "disambiguate": "true"
                                    }
                                  }
                                ],
                                "name": "choose",
                                "attrs": {}
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": ", "
                            }
                          }
                        ],
                        "name": "if",
                        "attrs": {
                          "variable": "author editor translator",
                          "match": "any"
                        }
                      },
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "title-short"
                            }
                          }
                        ],
                        "name": "else",
                        "attrs": {}
                      }
                    ],
                    "name": "choose",
                    "attrs": {}
                  },
                  {
                    "children": [],
                    "name": "text",
                    "attrs": {
                      "variable": "locator"
                    }
                  }
                ],
                "name": "group",
                "attrs": {
                  "delimiter": " "
                }
              }
            ],
            "name": "layout",
            "attrs": {
              "delimiter": "; ",
              "prefix": "(",
              "suffix": ")"
            }
          }
        ],
        "name": "citation",
        "attrs": {
          "et-al-min": "4",
          "et-al-use-first": "1",
          "disambiguate-add-names": "true",
          "disambiguate-add-givenname": "true"
        }
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "macro": "author"
                }
              },
              {
                "children": [],
                "name": "key",
                "attrs": {
                  "variable": "title"
                }
              }
            ],
            "name": "sort",
            "attrs": {}
          },
          {
            "children": [
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "author",
                  "suffix": "."
                }
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "title",
                  "prefix": " ",
                  "suffix": "."
                }
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "edition",
                          "prefix": " ",
                          "suffix": "."
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "editor-translator",
                          "prefix": " ",
                          "suffix": "."
                        }
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "macro": "publisher-year",
                          "prefix": " ",
                          "suffix": "."
                        }
                      }
                    ],
                    "name": "if",
                    "attrs": {
                      "type": "book"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "container-title",
                              "prefix": " ",
                              "font-style": "italic",
                              "suffix": "."
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "edition",
                              "prefix": " ",
                              "suffix": "."
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "editor-translator",
                              "prefix": " ",
                              "suffix": "."
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "macro": "publisher-year",
                              "prefix": " ",
                              "suffix": "."
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {}
                      },
                      {
                        "children": [],
                        "name": "text",
                        "attrs": {
                          "variable": "page",
                          "prefix": " ",
                          "suffix": "."
                        }
                      }
                    ],
                    "name": "else-if",
                    "attrs": {
                      "type": "chapter"
                    }
                  },
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "macro": "editor-translator",
                                  "suffix": "."
                                }
                              },
                              {
                                "children": [],
                                "name": "text",
                                "attrs": {
                                  "variable": "container-title",
                                  "font-style": "italic"
                                }
                              },
                              {
                                "children": [
                                  {
                                    "children": [
                                      {
                                        "children": [
                                          {
                                            "children": [
                                              {
                                                "children": [],
                                                "name": "text",
                                                "attrs": {
                                                  "variable": "volume"
                                                }
                                              },
                                              {
                                                "children": [],
                                                "name": "text",
                                                "attrs": {
                                                  "variable": "issue"
                                                }
                                              }
                                            ],
                                            "name": "group",
                                            "attrs": {
                                              "delimiter": "."
                                            }
                                          },
                                          {
                                            "children": [
                                              {
                                                "children": [],
                                                "name": "date-part",
                                                "attrs": {
                                                  "name": "year"
                                                }
                                              }
                                            ],
                                            "name": "date",
                                            "attrs": {
                                              "variable": "issued",
                                              "prefix": "(",
                                              "suffix": ")"
                                            }
                                          }
                                        ],
                                        "name": "group",
                                        "attrs": {
                                          "delimiter": " "
                                        }
                                      }
                                    ],
                                    "name": "if",
                                    "attrs": {
                                      "type": "article-journal"
                                    }
                                  },
                                  {
                                    "children": [
                                      {
                                        "children": [
                                          {
                                            "children": [],
                                            "name": "date-part",
                                            "attrs": {
                                              "name": "day",
                                              "suffix": " "
                                            }
                                          },
                                          {
                                            "children": [],
                                            "name": "date-part",
                                            "attrs": {
                                              "form": "short",
                                              "name": "month",
                                              "strip-periods": "false",
                                              "suffix": " "
                                            }
                                          },
                                          {
                                            "children": [],
                                            "name": "date-part",
                                            "attrs": {
                                              "name": "year"
                                            }
                                          }
                                        ],
                                        "name": "date",
                                        "attrs": {
                                          "variable": "issued"
                                        }
                                      }
                                    ],
                                    "name": "else",
                                    "attrs": {}
                                  }
                                ],
                                "name": "choose",
                                "attrs": {}
                              }
                            ],
                            "name": "group",
                            "attrs": {
                              "delimiter": " "
                            }
                          },
                          {
                            "children": [],
                            "name": "text",
                            "attrs": {
                              "variable": "page"
                            }
                          }
                        ],
                        "name": "group",
                        "attrs": {
                          "delimiter": ": ",
                          "prefix": " ",
                          "suffix": "."
                        }
                      }
                    ],
                    "name": "else",
                    "attrs": {}
                  }
                ],
                "name": "choose",
                "attrs": {}
              },
              {
                "children": [],
                "name": "text",
                "attrs": {
                  "macro": "access",
                  "prefix": " ",
                  "suffix": "."
                }
              }
            ],
            "name": "layout",
            "attrs": {}
          }
        ],
        "name": "bibliography",
        "attrs": {
          "et-al-min": "4",
          "et-al-use-first": "1",
          "line-spacing": "2",
          "subsequent-author-substitute": "---",
          "hanging-indent": "true"
        }
      }
    ],
    "name": "style",
    "attrs": {
      "xmlns": "http://purl.org/net/xbiblio/csl",
      "class": "in-text",
      "lang": "en",
      "version": "1.0"
    }
  };

  /*
   *
   * An implementation of the CSL "System" that uses a Backbone
   * collection of references
   *
   */

  var FokusCSLSystem = FokusCSL.System = function() {
    this.abbrevs    = {};
    this.references = null;
  };

  _.extend(FokusCSLSystem.prototype, {

    retrieveLocale: function(lang) {
      var locale = Locales[lang];
      return locale || Locales[defaultLang];
    },

    retrieveItem: function(id) {
      var doc = (this.references ? this.references.get(id) : null),
        datum = (doc ? doc.toJSON() : null);
      // console.log('sys retrieve', id, datum);
      // to citeproc
      return datum;
    },

    /*
    getAbbreviations: function(name) {
      return this.abbrevs[name];
    },

    setAbbreviations: function(abbrevs) {
      this.abbrevs = abbrevs;
    },
    */

    // extensions

    setReferences: function(refs) {
      // console.log('system init', refs.pluck('id'));
      this.references = refs;
    }

  });

}).call({}, linkage);
