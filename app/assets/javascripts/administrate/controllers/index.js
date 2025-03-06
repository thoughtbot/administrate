import { application } from "./application";

import SelectController from "./select_controller";
import TableController from "./table_controller";
import TooltipController from "./tooltip_controller";

application.register("select", SelectController);
application.register("table", TableController);
application.register("tooltip", TooltipController);
