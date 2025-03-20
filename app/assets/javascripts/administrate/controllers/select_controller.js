import { Controller } from "@hotwired/stimulus";
import $ from "jquery";

export default class extends Controller {
  connect() {
    if (!this.selectize) {
      const options = this.selectizeOptions || {};
      const selectedValues = $(this.element).val();
      this.selectize = $(this.element).selectize(options)[0].selectize;
      this.selectize.setValue(selectedValues);
    }
  }

  disconnect() {
    if (this.selectize) {
      const selectedValues = this.selectize.getValue();
      if (!this.selectizeOptions) {
        this.selectizeOptions = this.selectize.settings;
      }
      this.selectize.destroy();
      this.selectize = null;
      $(this.element).val(selectedValues);
    }
  }
};
