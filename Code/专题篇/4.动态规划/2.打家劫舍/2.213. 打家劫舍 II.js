/*
 * @Author: your name
 * @Date: 2021-08-23 08:09:56
 * @LastEditTime: 2021-08-23 08:40:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/2.打家劫舍/2.213. 打家劫舍 II.js
 */
// 213. 打家劫舍 II

/**
 * @分析
 * 1. dp[i][j][k] 其中 i 表示第 i 个值， j 表示第一个房子是否偷了，k 表示当前这个房子有没有偷
 * 2. 状态转移方程: dp[i][j][k] = dp[i-1][j][k]
 * 3. base case: dp[0][0][0] = 0, dp[0][1][1] = nums[0],dp[0][0][1] = -1,dp[0][1][0] = -1
 * 4. 时间复杂度 ${O(n)}$ 空间复杂度 ${O(n)}$
 */
 var rob = function (nums) {
  const len = nums.length;
  const dp = new Array(len)
    .fill(0)
    .map(() => new Array(2).fill(0).map(() => new Array(2).fill(-1)));
  (dp[0][0][0] = 0), (dp[0][1][1] = nums[0]);
  for (let i = 1; i < len; i++) {
    dp[i][0][0] = Math.max(dp[i - 1][0][0], dp[i - 1][0][1]);
    dp[i][0][1] = dp[i - 1][0][0] + nums[i];
    dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][1][1]);
    dp[i][1][1] = i === len - 1 ? dp[i - 1][1][1] : dp[i - 1][1][0] + nums[i];
  }
  return Math.max(dp[len - 1][0][0], dp[len - 1][0][1], dp[len - 1][1][0],dp[len - 1][1][1]);
};

/**
 * @分析
 * 1. 降维，每次的值只和前一个有关，且两个状态值分别只有两个item，所以可以直接用四个变量 dp_0_0,dp_1_1,dp_1_0,dp_0_1 保持迭代过程中的状态
 * 2. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var rob = function (nums) {
  let dp_0_0 = 0, dp_1_1 = nums[0], dp_1_0 = -1,dp_0_1 = -1  
  for (let i = 1; i < nums.length; i++) {
    const temp_0_0 =  dp_0_0
    const temp_1_0 =  dp_1_0
    dp_0_0 = Math.max(dp_0_0,dp_0_1)
    dp_0_1 = temp_0_0 + nums[i]
    dp_1_0 = Math.max(dp_1_0,dp_1_1)
    dp_1_1 = i === nums.length - 1 ?  dp_1_1 : temp_1_0+nums[i]

  }
  return Math.max(dp_0_0,dp_1_1,dp_1_0,dp_0_1);
};

