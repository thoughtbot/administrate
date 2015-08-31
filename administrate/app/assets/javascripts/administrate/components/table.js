$(function() {
  var keycodes = { space: 32, enter: 13 };

  var visitDataUrl = function(event) {
    if (event.type=="click" ||
        event.keyCode == keycodes.space ||
        event.keyCode == keycodes.enter) {

      if(!event.target.href) {
        window.location = $(event.target).closest("tr").data("url");
      }
    }
  };

  $("table").on("click", ".table__row", visitDataUrl);
  $("table").on("keydown", ".table__row", visitDataUrl);
});
