import {storage, getDate} from "@core/utils";

function toHTML(params) {
  const { tableName, lastUpdate } = storage(params);
  const [excel, date] = params.split(":");

  return `
    <li class="db__record">
      <a href="#${excel}/${date}">${tableName}</a>
        <strong>${getDate(lastUpdate)}</strong>
     </li>
  `
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (!localStorage.key(i).includes('excel')) {
      continue
    }
    keys.push(localStorage.key(i))
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span><span>Дата открытия</span>
    </div>
      <ul class="db__list">
        ${ keys.map(toHTML).join("") }
      </ul>
  `
}


