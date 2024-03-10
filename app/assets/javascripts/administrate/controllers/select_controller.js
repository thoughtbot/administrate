import { Controller } from "@hotwired/stimulus";
import $ from "jquery";

export default class extends Controller {
  connect() {
    const options = {}
    if(this.shouldAllowEmptyOptionsFor(this.element)) {
      options["allowEmptyOption"] = true
    }
    $(this.element).selectize(options);
  }

  shouldAllowEmptyOptionsFor(element) {
    return element.children[0].value=='' && element.children[0].label==" "
  }

};
