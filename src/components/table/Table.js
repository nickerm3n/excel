import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "@core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
      const type = $resizer.data.resize;
      let value;

      document.onmousemove = (e) => {
        if (type === "col") {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({right: delta * -1 + 'px'})
          // cells.forEach((col) => $(col).css({ width: value + "px" }));
        } else {
          const delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.css({bottom: delta * -1 + 'px'})
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === "col") {
          cells.forEach((col) => $(col).css({ width: value + "px" }));
          $resizer.css({right: "0"});
        } else {
          $parent.css({height: value + 'px'});
          $resizer.css({bottom: "0"});
        }
      }
    }
  }


  toHTML() {
    return createTable();
  }
}
