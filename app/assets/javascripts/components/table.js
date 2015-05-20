$(function() {
  sap = {ui:{keycodes:{SPACE:32, ENTER:13 }}};

  var visitDataUrl = function(event) {

    if (event.type=="click" ||
        event.keyCode == sap.ui.keycodes.SPACE ||
        event.keyCode == sap.ui.keycodes.ENTER) {

      if(!event.target.href) {
        window.location = $(event.target).closest("tr").data("url");
      }
    }
  }

  $("table").on("click", ".table-row", visitDataUrl);
  $("table").on("keydown", ".table-row", visitDataUrl);
});
