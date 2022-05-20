/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const firstStr = strs[0];
  if (strs.length == 0) return "";
  if (!firstStr) return "";
  if (strs.length == 1) return strs[0];
  let flag = true;
  for (let i = 0; i < firstStr.length; i++) {
    let common = firstStr.substring(0, i + 1);
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || !strs[j].startsWith(common)) {
        flag = false;
        return firstStr.substring(0, i);
      }
    }
  }
  if (flag) {
    return firstStr;
  }
};

console.log(longestCommonPrefix(["flower", "flower", "flower", "flower"]));
