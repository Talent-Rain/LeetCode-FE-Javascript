/*
 * @Author: your name
 * @Date: 2021-07-15 09:31:30
 * @LastEditTime: 2021-07-15 10:20:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/Tree/Trie/3.面试题 17.17. 多次搜索.js
 */

// 面试题 17.17. 多次搜索

/**
 * @分析 -- 暴力 api
 */
//  var multiSearch = function(big, smalls) {
//     return smalls.map(s => {
//         if(!s) return ret
//         const ret = []
//         let index = 0
//         while(index<big.length){
//              const res = big.indexOf(s,index)
//              if(res === -1) return ret
//              ret.push(res)
//              index = res+1
//         }
//         return ret
//     })
// };

// 暴力 -- 自己匹配
var multiSearch = function (big, smalls) {
  const len = big.length;
  return smalls.map((s) => {
    if (!s) return [];
    const sLen = s.length;
    const ret = [];
    // 这里就相当于是循环查找位置
    for (let i = 0; i <= len - sLen; i++) {
      let index = 0
      while(index<sLen && big[i + index] === s[index]){
        index++
      }
      if(index === sLen ) ret.push(i);
    }
    return ret;
  });
};
