/*
 * @Author: your name
 * @Date: 2021-07-01 09:20:52
 * @LastEditTime: 2021-07-05 09:25:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/DP/1.股票/1. 股票买卖的时机1.js
 */
// 121. 买卖股票的最佳时机
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/

/**
 * @分析
 * 1. 只能买卖1次，没有手续费，没有暂缓时间
 * 2. dp_0 代表没有持有时的最大收益，dp_1 代表持有时的最大收益
 * 3. 边界条件，dp_0 = 0, dp_1 = -prices[0]
 * 4. 状态转移方程: dp_0 = Max(dp_0,dp_1+prices[i]) dp_1 = Max(dp_0-prices[i],dp_1)
 * 5. 由于只能买卖一次，所以 dp_1 = Max(0-prices[i],dp_1) 
 * 6. 时间复杂度${O(N)}$, 空间复杂度 ${O(1)}$
 */
var maxProfit = function(prices) {
    if (!prices.length) return 0
    let dp_0 = 0, dp_1 = -prices[0]
    for(let i =1;i<prices.length;i++){
        dp_0 = Math.max(dp_0,dp_1+prices[i])
        dp_1 = Math.max(dp_1,-prices[i])
    }
    return dp_0 // 肯定是卖出去的大
};