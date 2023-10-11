import { Controller } from "@hotwired/stimulus";
import $ from "jquery";

var keycodes = { space: 32, enter: 13 };

export default class extends Controller {
  visitDataUrl(event) {
    if (event.type == "click" ||
        event.keyCode == keycodes.space ||
        event.keyCode == keycodes.enter) {

      if (event.target.href) {
        return;
      }

      var dataUrl = $(event.target).closest("tr").data("url");
      var selection = window.getSelection().toString();
      if (selection.length === 0 && dataUrl) {
        Turbo.visit(dataUrl);
      }
    }
  }
};
