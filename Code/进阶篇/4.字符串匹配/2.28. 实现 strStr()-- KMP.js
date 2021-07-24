/*
 * @Author: your name
 * @Date: 2021-07-24 09:50:43
 * @LastEditTime: 2021-07-24 16:30:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/4.字符串匹配/2.28. 实现 strStr()-- KMP.js
 */

/**
 * @分析 -- 暴力字符匹配
 */
// var strStr = function (haystack, needle) {
//   const n = haystack.length; // 文本串长度
//   const m = needle.length; // 模块串长度
//   if (!m) return 0;
//   let i = 0;
//   let j = 0; // 模板串下标
//   while (i < n) {
//     if (haystack[i] === needle[j]) {
//       i++;
//       j++;
//     } else {
//       // 回溯
//       i = i - j + 1;
//       j = 0;
//     }
//     if (j === m) {
//       // 匹配完了
//       return i - m;
//     }
//   }
//   return -1;
// };

// KMP
var strStr = function (haystack, needle) {
  const n = haystack.length; // 文本串长度
  const m = needle.length; // 模块串长度
  if (!m) return 0;
  /**
   * 1. dp[i] 表示字符串S[0,i]中，最大前后缀的值，如 asdxasd 字符串中，dp[7] = 3
   * 2. 这里用了两个指针 i, j 来创建 dp，其中 i 表示尾结点下标，j 表示当前最大前后缀的值，同时在数组中表示 j 之前的前缀和是匹配的
   * 3. 所以没一次移动 i ,就让 i 和 j 进行比对，如果相等，匹配值 j++; 如果不匹配，则需要递归的取 j 值
   */
  const dp = new Array(needle.length).fill(0); // 设置最大前缀后缀
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      // 如果不匹配，则取上一部分匹配的值作为配置项值，再进行匹配，直达 j === 0 为止
      j = dp[j - 1];
    }
    if (needle[i] === needle[j]) {
      // 如果设置
      j++;
    }
    dp[i] = j;
  }
  let i = 0,
    j = 0;
  while (i < n) {
    // 正常匹配
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    } else if (j > 0 && haystack[i] !== needle[j]) {
      // 如果匹配失败，则找到 j 前面的最大前缀后缀值，将 j 移动到这个位置，复用最大前缀
      j = dp[j - 1];
    } else {
      // 如果 j 为 0，那么继续走好了
      i++;
    }
    // 匹配成功
    if (j === m) {
      return i - j;
    }
  }
  return -1;
};

// 测试
console.log(strStr("hello", "llo"));
console.log(strStr("mississippi", "issip"));
