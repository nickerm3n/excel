import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import {tableResizer} from "@/components/table/table.resizer";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    tableResizer(event, this.$root);
  }


  toHTML() {
    return createTable();
  }
}
