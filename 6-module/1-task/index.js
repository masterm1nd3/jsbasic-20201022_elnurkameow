/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
class Row {
        constructor(obj) {
                    this.name = obj.name;
                    this.age = obj.age;
                    this.salary = obj.salary;
                    this.city = obj.city;
        }
        onClick = function(event) {
                    event.target.closest('tr').remove();
        }
        render() {
                    this.elem = document.createElement('TR');
                this.elem.insertAdjacentHTML("afterbegin", `
                      <td>${this.name}</td>
                            <td>${this.age}</td>
                                  <td>${this.salary}</td>
                                        <td>${this.city}</td>
                                              <td><button>X</button></td>
                                                  `);
                    this.elem.querySelector('button').addEventListener('click', this.onClick);
                    return this.elem;
                  }
}
export default class UserTable {
        constructor(rows) {
                    this.rows = {};
                for (let i in rows) {
                              this.rows[i] = new Row(rows[i]);
                }
                    this.elem = document.createElement('TABLE');
                this.elem.insertAdjacentHTML('afterbegin', `
                      <thead>
                              <tr>
                                        <th>Имя</th>
                                                  <th>Возраст</th>
                                                            <th>Зарплата</th>
                                                                      <th>Город</th>
                                                                                <th></th>
                                </tr>
                              </thead>
                                  `);
                    this.renderRow();
                  }
        renderRow() {
                    this.elem2 = document.createElement('TBODY');
                for (const i of Object.keys(this.rows)) {
                              this.elem2.append(this.rows[i].render());
                }
                    this.elem.append(this.elem2);
        }
}
