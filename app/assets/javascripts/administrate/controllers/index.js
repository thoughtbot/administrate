import { application } from "./application";

import SelectController from "./select_controller";
import TableController from "./table_controller";

application.register("select", SelectController);
application.register("table", TableController);

// Bug: Visit another page and come back to this page, the mouesover popover will not work
const searchPopover = document.querySelector("[popover][id='search-tooltip']");
const searchTooltip = document.querySelector("button[popovertarget='search-tooltip']");
searchTooltip.addEventListener("mouseenter", () => {
  searchPopover.showPopover();
});
searchTooltip.addEventListener("mouseleave", () => {
  searchPopover.hidePopover();
});
