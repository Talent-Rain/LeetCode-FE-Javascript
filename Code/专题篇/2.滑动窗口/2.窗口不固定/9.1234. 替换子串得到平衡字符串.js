/*
 * @Author: your name
 * @Date: 2021-09-08 08:32:50
 * @LastEditTime: 2021-09-08 09:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/9.1234. 替换子串得到平衡字符串.js
 */

// 1234. 替换子串得到平衡字符串

/**
 * @分析
 * 1. 本题最难的点在于切分好窗口，窗口里的值是待变更的，窗口外的值是已经确定好的，对应的每一个字符的数量都小于等于 n/4
 * 2. 为什么要这样来初始化窗口，窗口外的值的字符数量小于等于 n/4, 那么就可以变更窗口里的值，使得最终的值符合平衡字符串，因为窗口的值可以任意变，但是一旦外面某个字符的数量超出 n/4, 然后变更窗口的值，使得最终的数量变少了吧；
 * 3. 先遍历一遍，保存所有字符对应的数量；
 */
var balancedString = function (s) {
  const n = s.length;
  const max = n / 4; // 这里 n 就是 4 的倍数，入参会做好设定的
  const map = new Map();
  map.set("Q", 0);
  map.set("W", 0);
  map.set("E", 0);
  map.set("R", 0);
  for (let ss of s) {
    map.set(ss, map.get(ss) ? map.get(ss) + 1 : 1);
  }
  let valid = 0; // 有多少个变量满足小于等于 n/4
  [...map.values()].forEach((v) => {
    if (v <= max) valid++;
  });
  if (valid === 4) return 0; //特殊情况，直接结束
  let l = (r = 0);
  let ret = Infinity;
  while (r < n) {
    const rr = s[r];
    map.set(rr, map.get(rr) - 1);
    if (map.get(rr) === max) {
      // 如果减去之后刚好符合要求，则 valid 增加
      valid++;
    }
    while (valid === 4) {
      // 窗口符合要求，开始收缩窗口
      ret = Math.min(ret, r - l + 1); // 先缓存一个
      const ll = s[l];
      l++;
      map.set(ll, map.get(ll) ? map.get(ll) + 1 : 1); //收缩滑窗，则滑出去的加入到 map 中去
      if (map.get(ll) > max) valid--;
    }
    // 一直使得 valid 的值少于 4为止
    r++;
  }
  return ret;
}
console.log(balancedString("QWER"))
console.log(balancedString("QQWE"))
console.log(balancedString("QQQW"))
console.log(balancedString("QQQQ"))
