import { ExcelComponent } from "@core/ExcelComponent";
import {changeTableName} from "@/redux/actions";
import { $ } from '@core/dom';

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ['input'],
      ...options,
    });
  }

  onInput(event) {
    this.$dispatch(changeTableName($(event.target).text()))
  }

  toHTML() {
    const {tableName} = this.$getState();
    return `
    <input type="text" class="input" value="${tableName}" />
    <div>
      <div class="button">
        <span class="material-icons">
          exit_to_app
        </span>
      </div>
      <div class="button">
        <span class="material-icons">
          delete
        </span>
      </div>
    </div>
    `;
  }
}
