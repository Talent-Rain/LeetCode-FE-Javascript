/*
 * @Author: your name
 * @Date: 2021-07-23 08:32:32
 * @LastEditTime: 2021-07-23 09:56:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/4.字符串匹配/1.28. 实现 strStr().js
 */

// 28. 实现 strStr()

/**
 * @分析 -- 暴力 -- 字符串自匹配
 * 1. 根据 'asd' === 'asd' 这样切割长度一致的块来直接比对
 * 2. 这里主要是屏蔽了 String.prototype.slice 方法的复杂度
 * 3. 时间复杂度 ${O{NM}}$ 其中 N 是目标串长度， M 是模式串的长度；空间复杂度为 ${O(N)}$,每一次都必须取一个 M 长度的字符串进行比对
 */
var strStr = function (haystack, needle) {
  const len = haystack.length;
  const windLen = needle.length;
  // 直接截取一段长度相似子串进行比对相似
  let left = 0;
  while (left <= len - windLen) {
    if (haystack.slice(left, left + windLen) === needle) return left;
    left++;
  }
  return -1;
};

/**
 * @分析 -- RK 算法 -- 滑窗匹配 + 二进制
 * 1. 每次改动的指数滑出划进的值，但是如果是一个字符串的字符增删，会带来一定复杂度，如果是数组的话还好
 * 2. 所以这里直接转成二进制进行匹配，其实原理还是滑窗
 * 3. 但是会有问题，就是在长度作为指数，在 windLen 很大的时候，会超出 SAFE_NUMBER， 导致结果出错
 */
var strStr = function (haystack, needle) {
  const len = haystack.length;
  const windLen = needle.length;
  if (!windLen) return 0;
  let target = 0;
  let subHash = 0;
  function getHash(s) {
    return s.charCodeAt() - 'a'.charCodeAt(); // 都是小写字母
  }
  for (let i = 0; i <= len - windLen; i++) {
    if (i === 0) {
      //  初始化窗口值
      for (let j = 0; j < windLen; j++) {
        target += getHash(needle[j]) * 26 ** (windLen - j - 1);
        subHash += getHash(haystack[j]) * 26 ** (windLen - j - 1); // 每一个字符都占据一个位
      }
    } else {
      const preNum = getHash(haystack[i - 1]); // 移出去的值
      const nextNum = getHash(haystack[i + windLen - 1]); // 移进来的值
      subHash = (subHash - preNum * 26 ** (windLen - 1)) * 26 + nextNum;
    }
    if (subHash === target) return i;
  }
  return -1;
};

// 测试
console.log(strStr("hello", "llo"));
console.log(strStr("mississippi", "issip"));
