/*
 * @Author: your name
 * @Date: 2021-08-22 09:53:09
 * @LastEditTime: 2021-08-23 09:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/2.打家劫舍/1. 198. 打家劫舍.js
 */

// 198. 打家劫舍

/**
 * @分析
 * 1. dp[i][0] 表示在第 i 个房子没有偷东西时的最高金额， dp[i][1] 表示偷东西了的最高金额
 * 2. 状态转移方程:  dp[i][0] = Math.max(dp[i-1][1],dp[i-1][0]) dp[i][1] = dp[i-1][0]+nums[i]
 * 3. base case dp[0][0] = 0 dp[0][1]= numns[0]
 * 4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var rob = function (nums) {
  const len = nums.length;
  const dp = new Array(len).fill(null).map(() => new Array(2));
  dp[0][0] = 0;
  dp[0][1] = nums[0];
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  return Math.max(dp[len - 1][0], dp[len - 1][1]);
};

/**
 * @分析
 * 1. 降维，每次的值只和前一个有关，且状态值只有两个，所以可以直接用两个变量 dp_0,dp_1 表示
 * 2. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var rob = function (nums) {
    let dp_0 = 0,dp_1 = nums[0]
  for (let i = 1; i < len; i++) {
        const temp = dp_0 // 保存一下上一个 dp_0
        dp_0 = Math.max(dp_0,dp_1)
        dp_1 = temp+nums[i]
    }
    return Math.max(dp_0,dp_1)
}