$(function() {
  "use strict";

  var $input = $(".search__input");
  var activeSuffix = "--active";
  var timeout;

  $.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) {
      $.fn.textWidth.fakeEl = $('<span style="display: none;">')
                              .appendTo(document.body);
    }

    var htmlText = text || this.val() || this.text();
    htmlText = $.fn.textWidth.fakeEl.text(htmlText).html();
    htmlText = htmlText.replace(/\s/g, "&nbsp;");
    $.fn.textWidth.fakeEl.html(htmlText).css("font", font || this.css("font"));
    return $.fn.textWidth.fakeEl.width();
  };

  var activate = function(className) {
    $("." + className).addClass(className + activeSuffix);
  };

  var deactivate = function(className) {
    $("." + className).removeClass(className + activeSuffix);
  };

  $input.on("focus",   function() { activate("search__icon"); });
  $input.on("blur",    function() { deactivate("search__icon"); });
  $input.on("keydown", function() { deactivate("search__hint"); });

  var showHint = function() { activate("search__hint"); };

  $input.on("keyup", function() {
    clearTimeout(timeout);

    if($input.val().length) {
      $(".search__hint").css("left", $input.textWidth() + 75);
      timeout = setTimeout(showHint, 250);
    }
  });
});
