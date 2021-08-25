// 714.买卖股票的最佳时机含手续费
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

/**
 * @分析
 * 1. 多次购买，无冷冻期，有手续费
 * 2. 状态转移方程
 *    dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]-fee)
 *    dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0] - prices[i])
 */
var maxProfit = function(prices, fee) {
    let len = prices.length
    if(!len) return 0
    const dp = new Array(len).fill(null).map(() => new Array(2))

    // Base Case
    dp[0][0] = 0
    dp[0][1] = -prices[0]

    for(let i = 1;i<len;i++){
        dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]-fee)
        dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0] - prices[i])
    }
    return dp[len-1][0]
};