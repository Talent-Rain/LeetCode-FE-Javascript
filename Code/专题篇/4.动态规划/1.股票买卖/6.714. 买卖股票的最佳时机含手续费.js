/*
 * @Author: your name
 * @Date: 2021-08-25 08:31:59
 * @LastEditTime: 2021-08-25 08:35:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/6.714. 买卖股票的最佳时机含手续费.js
 */

// 714. 买卖股票的最佳时机含手续费

/**
 * @分析
 * 1. 买卖 n 次， 无间隔, 收手续费
 * 2. 由于要收手续费，那么就不是怎么买卖都是好的了，必须将成本算上去，之前都是无本例如，只需要低买高卖就成，现在必须考虑可能会亏的可能
 * 
 */

 var maxProfit = function(prices, fee) {
    let dp_0 = 0, dp_1 = -prices[0]
    for (let i = 1; i < prices.length; i++) {
        const temp =dp_0
        dp_0 = Math.max(dp_0,dp_1 + prices[i] - fee)
        dp_1 = Math.max(dp_1,temp - prices[i])
    }
    return dp_0
};