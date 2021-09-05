/*
 * @Author: your name
 * @Date: 2021-09-05 17:13:24
 * @LastEditTime: 2021-09-05 17:43:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/4.438. 找到字符串中所有字母异位词.js
 */

// 438. 找到字符串中所有字母异位词

// [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/submissions/) 思路差不多

/**
 * @分析
 * 1. 这道题窗口就固定为 p 的长度大小了，所以看着是固定窗口大小的题目 -- 但是这里用的却是不定窗口的思路，但是窗口长度成了一个限定值，一旦超出限定的窗口大小，就收缩一次
 * 2. 虽然题目说的是找字幕异位词，但是从实际的例子可以看出，只要是符合 p 的字符对应的子串就 ok 了，不管得出的 ss 是否和 p 是一样的排列
 * 3. 用 pMap 存储 p 的字符状态，sMap 用来存储固定窗口的值，用 sMap 中的 valid 变量类型数量和 pMap 中的比对，用来判断是否符合要求
 * 4. 时间复杂度 ${O(n)}$
 */
var findAnagrams = function (s, p) {
  const pMap = new Map();
  const sMap = new Map();
  let ret = []; // 存储合乎要求的首个字符

  for (let pp of p) {
    pMap.set(pp, pMap.get(pp) ? pMap.get(pp) + 1 : 1);
  }
  let valid = 0; // 存储合乎 p 的变量
  let l = (r = 0);
  while (r < s.length) {
    const rr = s[r];
    sMap.set(rr, sMap.get(rr) ? sMap.get(rr) + 1 : 1);
    if (sMap.get(rr) === pMap.get(rr)) {
      // 两个 key 对应的 value 值一致的时候，才会增加 valid
      valid++;
    }
    // 如果加上这个 r 这个字符，长度超出了固定窗口的长度，则需要先收缩 l, 再判定 
    if (r - l === p.length) {
      // 从进入到这里逻辑开始，其实就是属于固定窗口两侧的指针一起跑，这里是 l 指针开始跑，之前因为还没初始化完窗口
      const ll = s[l];
      if (pMap.get(ll) === sMap.get(ll)) {
        // 如果收缩过程中的这个值属于 valid 的
        valid--;
      }
      sMap.set(ll, sMap.get(ll) - 1);
      l++;
    }
    if (valid === pMap.size) {
      // 合乎要求
      ret.push(l);
    }
    r++;
  }

  return ret;
};
