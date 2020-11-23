/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
 const strArr = str.split('-')
        for (let i = 1; i < strArr.length; i++) {
                    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
                  
        }
          str = strArr.join('')
          return str
}
