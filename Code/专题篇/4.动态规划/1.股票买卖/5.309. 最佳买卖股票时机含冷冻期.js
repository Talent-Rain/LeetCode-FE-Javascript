/*
 * @Author: your name
 * @Date: 2021-08-25 08:14:47
 * @LastEditTime: 2021-08-25 08:46:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/5.309. 最佳买卖股票时机含冷冻期.js
 */

// 309. 最佳买卖股票时机含冷冻期

/**
 * @分析
 * 1. 买卖 n 次， 需要间隔 1 天, 不收手续费
 * 2. dp_0_0 表示没有持有，不处于冷却期，dp_0_1 表示没有持有，处于冷却期, dp_1_0 正常情况，持有的时候没有冷却期， dp_1_1 属于矛盾的状态，忽略
 * 3. 状态转移方程:
 */
var maxProfit = function (prices) {
  const len = prices.length;
  if (len < 2) return 0;
  let dp_0_0 = 0,
    dp_0_1 = 0,
    dp_1_0 = -prices[0];

  for (let i = 1; i < len; i++) {
    console.log(dp_0_0, dp_0_1, dp_1_0);
    const temp = dp_0_0;
    // 不在冷却中的没持有状态，证明上一次只可能是没有持有的状态
    dp_0_0 = Math.max(dp_0_0, dp_0_1);
    dp_0_1 = dp_1_0 + prices[i];
    dp_1_0 = Math.max(dp_1_0,temp - prices[i]);
  }
  return Math.max(dp_0_0, dp_0_1);
};

console.log(maxProfit([1, 2, 4]));
