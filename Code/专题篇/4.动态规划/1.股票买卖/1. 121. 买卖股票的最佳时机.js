/*
 * @Author: your name
 * @Date: 2021-08-24 08:54:36
 * @LastEditTime: 2021-08-24 09:04:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/1. 121. 买卖股票的最佳时机.js
 */

// 121. 买卖股票的最佳时机

/**
 * @分析
 * 1. 买卖 1 次， 不需要间隔, 不收手续费
 * 2. dp_0 表示没有持有的状态的最大利润，dp_1 表示持有状态下的最小成本
 * 2.5. 由于只进行一次交易，所以 dp_1要尽可能大的取，确保买入的成本最小，而 dp_0 也要保持最高，保证卖出最大
 * 3. 状态转移方程 dp_0 = Math.max(dp_0,dp_1+nums[i]), dp_1 = Math.max(dp_1,-nums[i])
 * 4. base case dp_0 =0 dp_1 = -nums[i]
 */
var maxProfit = function(prices) {

    let dp_0 = 0,dp_1 = prices[0]
    for(let i = 0;i<prices.length;i++){
        dp_0 = Math.max(dp_0,dp_1+prices[i])
        dp_1 = Math.max(dp_1,-prices[i]) // 因为只会买卖一次，这里
    }
    return dp_0
}