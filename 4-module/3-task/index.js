/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
        for (let i = 1; i < table.rows.length; i++) {
                    let row = table.rows[i].cells
                for (let cel of row) {
                        if (cel.hasAttribute('data-available')) {
                                if (cel.getAttribute('data-available') === 'true') {
                                                  table.rows[i].classList.add('available')
                                } else {
                                                  table.rows[i].classList.add('unavailable')
                                }
                        }
                        if (!row[3].hasAttribute('data-available')) {
                                        table.rows[i].setAttribute('hidden', true)
                        }
                }
                if (row[2].innerHTML === 'm') {
                              table.rows[i].classList.add('male')
                } else {
                              table.rows[i].classList.add('female')
                }
                if (row[1].innerHTML < 18) {
                              table.rows[i].style.textDecoration = 'line-through'
                }
        }
}
