import { Controller } from "@hotwired/stimulus";
import $ from "jquery";

export default class extends Controller {
  static values = {
    selected: { Array , default: [] }, // Use an array to support multiple selected values
    includeBlank: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    maxItems: { type: Number }
  }

  connect() {
    var optionsCount = null
    if (this.multipleValue) { optionsCount = 1 }
    if (this.maxItemsValue) { optionsCount = this.maxItemsValue }

    const selectElement = $(this.element).selectize({
      allowEmptyOption: this.includeBlankValue,
      maxItems: optionsCount
    });

    const selectizeInstance = selectElement[0].selectize;

    // Set the default selected value(s)
    if (this.selectedValue.length > 0) {
      selectizeInstance.setValue(this.selectedValue);
    }
  }
}
