import { Controller } from "@hotwired/stimulus";
import $ from "jquery";

const default_options = {
  allowEmptyOption: true,
  deselectBehavior: 'previous'
}

export default class extends Controller {
  connect() {
    if (!this.selectize) {
      const options = this.selectizeOptions || default_options;
      const selectedValues = $(this.element).val();
      this.selectize = $(this.element).selectize(options)[0].selectize;
      this.selectize.setValue(selectedValues);
      if (this.element.getAttribute('data-selectize-required') === 'true') {
        this.selectize.on('change', (value) => {
          if (value.length === 0) {
            this.selectize.setValue(selectedValues);
          }
        });
      }
    }
  }

  teardown() {
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
