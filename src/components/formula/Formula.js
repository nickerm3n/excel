import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false" data-input></div>
    `;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const { key } = event;

    if (key === "Enter" || key === "Tab") {
      event.preventDefault();
      this.$emit('formula:focus');
    }
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  init() {
    super.init();
    this.$formula = this.$root.find("[data-input]");
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value)
    });
  }
}
