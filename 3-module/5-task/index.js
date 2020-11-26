/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
const num = str.split(/[ , ]+/)
            .map(item => +item)
            .filter(item => !(isNaN(item)))
          const max = num.reduce((prev,cur) => (cur>prev) ? cur : prev, 0)
          const min = num.reduce((prev,cur) => (cur>prev) ? prev : cur, 0)
        let result = {
                    min: min,
                    max: max
                  
        }
          return result
        
}
