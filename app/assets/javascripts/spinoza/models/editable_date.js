(function(root, undefined) {

  var app = root.Spinoza;

  app.module("Models", function(mod, app, BB, BM, $, _) {

    mod.EditableDate = BB.Model.extend({

      toDate: function() {
        var dateParts = this.toDateParts();
        return new Date(dateParts);
      },

      configureForDate: function(date) {
        this.set({
          year  : (date.getYear() + 1900),
          month : date.getMonth() + 1,
          day   : date.getDate()
        });
      },

      toDateParts: function() { // CSL or Date([args])
        return [
          this.get('year'),  // date input is always absolute
          this.get('month'), // when constructed with array, month is 1-indexed
          this.get('day')
        ];
      }

    });

  });

}).call({}, linkage);
