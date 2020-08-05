import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import {resizeHandler} from "@/components/table/table.resizer";
import {shouldResize} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    }
  }


  toHTML() {
    return createTable();
  }
}
