/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truencate(str, maxlenghth) {
        if (str.length > maxlenghth) {
                return (str.substring(0, maxlenghth-1) + `...`);
        }
        return str;
}
