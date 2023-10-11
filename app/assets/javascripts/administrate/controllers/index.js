import { application } from "./application";

import SelectController from "./select_controller";
import TableController from "./table_controller";

application.register("select", SelectController);
application.register("table", TableController);
