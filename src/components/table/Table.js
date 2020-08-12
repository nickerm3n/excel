import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "@/components/table/table.resizer";
import { TableSelection } from "@/components/table/TableSelection";
import { $ } from '@core/dom';
import {
  isCell,
  matrix,
  shouldResize,
  nextSelection,
} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      this.selector.select($(event.target));
      if (event.shiftKey) {
        document.onmousemove = (e) => {
          const $cells = matrix(this.selector.current, $(e.target))
            .map((cell) => this.$root.find(`[data-id="${cell}"]`));
          this.selector.groupSelect($cells);
        };
      }

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null
      }
    }
  }

  onKeydown(event) {
    const { key } = event;
    const keys = [
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
      'Enter',
      'Tab',
    ];

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selector.current.id(true);
      const $next = this.$root.find(nextSelection(key, id));
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }

  selectCell($cell) {
    this.selector.select($cell);
    this.$emit('table:select', $cell);
  }

  prepare() {
    this.selector = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
    this.$on('formula:input', (text)=> {
      this.selector.current.text(text)
    });
    this.$on('formula:focus', () => {
      this.selector.current.focus()
    })
  }

  toHTML() {
    return createTable();
  }
}

