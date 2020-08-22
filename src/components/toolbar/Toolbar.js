import {createToolbar} from "@/components/toolbar/toolbar.template";
import { $ } from '@core/dom';
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
      this.setState(value);
    }
  }

  get template() {
    return createToolbar(this.state)
  }

  prepare() {
    this.initState(defaultStyles)
  }

  toHTML() {
    return this.template;
  }
}
