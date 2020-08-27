import { ExcelComponent } from "@core/ExcelComponent";
import {updateDate, changeTableName} from "@/redux/actions";
import { $ } from '@core/dom';
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ['input', 'click', 'keypress'],
      ...options,
    });
  }

  onClick(event) {
    const $target = $(event.target);
    const key = 'excel:' + ActiveRoute.param;

    if ($target.data.type === "exit") {
      this.$dispatch(updateDate());
      ActiveRoute.navigation('#')
    } else if ($target.data.type === "delete") {
      const decision = confirm("Вы действительно желаете удалить таблицу?");
      if (decision) {
        localStorage.removeItem(key);
        ActiveRoute.navigation('#')
      }
    }
  }

  onKeypress(event) {
    if (event.key === "Enter") {
      event.target.blur();
      this.$dispatch(changeTableName($(event.target).text()))
    }
  }

  onInput(event) {
    this.$dispatch(changeTableName($(event.target).text()))
  }

  toHTML() {
    const {tableName} = this.$getState();
    return `
    <input type="text" class="input" value="${tableName}" />
    <div>
      <div class="button" data-type="exit">
        <span class="material-icons" data-type="exit">
          exit_to_app
        </span>
      </div>
      <div class="button" data-type="delete">
        <span class="material-icons" data-type="delete">
          delete
        </span>
      </div>
    </div>
    `;
  }
}
