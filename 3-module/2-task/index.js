/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
 let newArr = arr.filter(item => (item >= a && item <= b))
          return newArr
        
}
