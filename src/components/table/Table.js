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
import * as actions from "@/redux/actions";
import {defaultStyles} from "@/constants";
import {changeStyles} from "@/redux/actions";
import {parse} from "@core/parse";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['colState', 'rowState'],
      ...options,
    });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.error(e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      this.selectCell($(event.target));
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selector.current.id(),
      value,
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }

  selectCell($cell) {
    this.selector.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(changeStyles(styles));
  }

  prepare() {
    this.selector = new TableSelection();
  }

  storeChanged(changes) {
    console.log(changes)
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (value)=> {
      this.selector.current
        .attr('data-value', value)
        .text(parse(value));
      this.updateTextInStore(value)
    });

    this.$on('formula:focus', () => {
      this.selector.current.focus()
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selector.applyStyle(value);
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selector.selectedIds,
      }))
    })
  }

  toHTML() {
    return createTable(this.$getState());
  }
}

