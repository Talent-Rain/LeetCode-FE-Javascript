/*
 * @Author: your name
 * @Date: 2021-09-04 10:49:10
 * @LastEditTime: 2021-09-04 11:28:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/2. 76. 最小覆盖子串.js
 */
// 76. 最小覆盖子串

/**
 * @分析
 * 1. 这里求的是符合要求的最小的子串，所以窗口肯定不是固定大小的
 * 2. 这里判定条件关乎于 t 中的字符及数量，也需要 s 的字符和数量做对比，所以需要用到两个 map 进行存储
 * 3. 先把 t 存储到 tMap 中去，然后开始移动 r 指针扩大的窗口；
 * 4. 当窗口中的某个字符 s[r] 的数量大于等于 tMap 中 s[r] 的数量时，则这个窗口符合 t 字符串的变量数 valid 加一，一直到 valid 的长度刚好和 tMap 长度一样的时候，就是找到了符合要求的子串了
 * 5. 找到子串后，需要压缩窗口的大小，所以 l 要启动了
 * 6. 只要 s[l] 在 sMap 中的值不低于 tMap 中的值，那么就拼命的压缩；
 * 7. 只有当长度比已经保存起来的符合要求的子串小的时候，或者初始化的时候，就替换 ret
 * 8. 然后 l 指针继续走一步，对应窗口就会失效，然还继续寻找下一个符合要求的窗口，重复上面的操作
 * 9. 时间复杂度 ${O(N)}$, 空间复杂度 ${O(N)}$
 */
function minWindow(s, t) {
  const sMap = new Map();
  const tMap = new Map();

  // 先将 t 存起来
  for (let tt of t) {
    tMap.set(tt, tMap.get(tt) ? tMap.get(tt) + 1 : 1);
  }
  let ret = "";
  let l = (r = 0); // 不固定的滑窗的初始化
  let valid = 0; //表示窗口中匹配 t 字符的数量 -- 匹配的字符是指：字符 ss 在窗口里的数量超过了 ss 在 t 字符串中这个字符数量
  while (r < s.length) {
    const ss = s[r];
    sMap.set(ss, sMap.get(ss) ? sMap.get(ss) + 1 : 1); //存起来
    if (sMap.get(ss) === tMap.get(ss)) {
      // 证明 ss 已经匹配了
      valid++;
    }

    if (valid === tMap.size) {
      //   窗口里的字符串已经完全匹配了，那么就需要收缩一下了
      while (sMap.get(s[l]) !== tMap.get(s[l])) {
        // 因为现在的初始条件是: 对于某个字符 s[l], sMap.get(s[l])>=tMap.get(s[l])
        // 所以可以干掉一些，知道 === 的时候
        sMap.set(s[l], sMap.get(s[l]) - 1);
        l++;
      }
      if (r - l + 1 < ret.length || !ret.length) {
        // 如果长度更小了，或者初始化的 ret, 那就替换一下吧
        ret = s.slice(l, r + 1);
      }
      //  继续走吧，总得砍掉一个 valid 的，
      sMap.set(s[l], sMap.get(s[l]) - 1);
      valid--; // 少了一个 s[l] 了
      l++;
    }
    r++;
  }
  return ret;
}
