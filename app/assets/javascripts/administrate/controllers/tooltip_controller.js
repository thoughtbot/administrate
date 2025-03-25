import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["popover", "tooltip"];

  connect() {
    this.tooltipTarget.addEventListener("mouseenter", this.showPopover);
    this.tooltipTarget.addEventListener("mouseleave", this.hidePopover);
  }

  disconnect() {
    this.tooltipTarget.removeEventListener("mouseenter", this.showPopover);
    this.tooltipTarget.removeEventListener("mouseleave", this.hidePopover);
  }

  showPopover = () => {
    this.popoverTarget.showPopover();
  }

  hidePopover = () => {
    this.popoverTarget.hidePopover();
  }
};

