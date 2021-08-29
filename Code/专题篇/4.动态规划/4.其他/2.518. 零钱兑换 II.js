/*
 * @Author: your name
 * @Date: 2021-08-27 08:43:03
 * @LastEditTime: 2021-08-27 10:00:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/4.其他/2.518. 零钱兑换 II.js
 */

// 518. 零钱兑换 II -- 凑方案

/**
 * @分析
 * 1. 状态定义：dp[i] 表示凑成总金额为 i 时存在的方案 -- 给定 amount 硬币数组，硬币种类不一样，得到的方案数不一样
 * 2. 状态转移方程: dp[i] = sum(dp[i-coin]) -- 分别计算出取走一枚硬币时，能够凑出的方案数
 * 3. base case: dp[0] = 1 //不取也是一种方案
 * 4. 时间复杂度 ${O(n*m)}$ 其中 n 是硬币数量，m 是金额总数，空间复杂度为 ${O(m)}$
 */
var change = function (amount, coins) {
  const dp = new Array(amount + 1).fill(0); //凑不齐就是 0 个方案了
  dp[0] = 1; //不取也是一种方案

  // 相当于背包问题中，背包里的东西有哪些，每多一样东西，就可以更新方案
  for (coin of coins) {
    for (let i = coin; i <= amount; i++) {
      // 只有比当前币值高的，才需要更新方案数
      dp[i] = dp[i] + dp[i - coin];
    }
  }
  return dp[amount];
};


var change = function (amount, coins) {
    const dp = new Array(amount + 1).fill(0); //凑不齐就是 0 个方案了
    dp[0] = 1; //不取也是一种方案
  
    // 相当于背包问题中，背包里的东西有哪些，每多一样东西，就可以更新方案
    for (let i = 1; i <= amount; i++) {
        for (coin of coins) {
            // 只有比当前币值高的，才需要更新方案数
            dp[i] = dp[i] + dp[i - coin];
        }
    }
    console.log(dp)
    return dp[amount];
  };
  