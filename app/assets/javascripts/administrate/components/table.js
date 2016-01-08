$(function() {
  var keycodes = { space: 32, enter: 13 };

  var visitDataUrl = function(event) {
    if (event.type=="click" ||
        event.keyCode == keycodes.space ||
        event.keyCode == keycodes.enter) {

      if(!isLinkableElement(event.target)) {
        window.location = $(event.target).closest("tr").data("url");
      }
    }
  };

  var isLinkableElement = function(element) {
    return (event.target.href ||
            $(element).closest(".cell-data--linkable").length > 0);
  };

  $("table").on("click", ".table__row", visitDataUrl);
  $("table").on("keydown", ".table__row", visitDataUrl);
});
