/*
 * @Author: your name
 * @Date: 2021-08-07 12:06:40
 * @LastEditTime: 2021-08-07 15:19:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/17.96. 不同的二叉搜索树.js
 */

// var numTrees = function (n) {
//   const recursion = (n) => {
//     if (n === 0) return 1;
//     if (n === 1) return 1;
//     let temp = 0;
//     for (let i = 1; i <= n; i++) {
//       const l = i - 1,
//         r = n - i;
//       const left = recursion(l);
//       const right = recursion(r);
//       temp += left * right;
//     }
//     return temp;
//   };

//   return recursion(n);
// };


var numTrees = function (n) {
  const dp = new Array(n+1).fill(0)
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};
console.log(numTrees(2));
console.log(numTrees(3));
console.log(numTrees(4));
console.log(numTrees(5));
