$(function() {
  var keycodes = { space: 32, enter: 13 };

  var visitDataUrl = function(event) {
    if (event.type == "click" ||
        event.keyCode == keycodes.space ||
        event.keyCode == keycodes.enter) {

      if (!event.target.href) {
        var url = $(event.target).closest("tr").data("url");

        if (url) { window.location = url; }
      }
    }
  };

  $("table").on("click", ".table__row", visitDataUrl);
  $("table").on("keydown", ".table__row", visitDataUrl);
});
