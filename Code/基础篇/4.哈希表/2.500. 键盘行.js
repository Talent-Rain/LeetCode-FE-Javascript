// 500. 键盘行
// https://leetcode-cn.com/problems/keyboard-row/description/

/**
 * @分析
 * 1. 由于只有 3 行，所以可以把每一行作为每行对应字符的状态，然后将所有字母存储在 map 中
 * 2. 然后遍历给点的字符串数组，只有当给定的字符串对应的状态值都一样时，才能加入到返回的数组中去
 * 3. 需要注意的是，我们存储的是小写字母，所以 words 中的字母需要都改成小写再进行匹配； 如果只有一个字符，那么肯定是可行的；
 * 4. 时间复杂度 ${O(n*m)}$ 其中 n 是 words 的长度，m 是字符串的平均长度
 */
var findWords = function (words) {
  const arr = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const map = new Map();
  arr.forEach((item, index) => {
    for (let i = 0; i < item.length; i++) {
      map.set(item[i], index + 1);
    }
  });
  const ret = [];

  for (let word of words) {
    if(word.length === 1) {
        ret.push(word);
        continue
    }
    let status = undefined; // 这个就是 状态值
    for (let i = 0; i < word.length; i++) {
      const item = word[i].toLowerCase();
      if (!status) {
        status = map.get(item);
        continue;
      }
      if (map.get(item) !== status) break;
      if (i === word.length - 1) {
        ret.push(word);
      }
    }
  }
  return ret;
};
