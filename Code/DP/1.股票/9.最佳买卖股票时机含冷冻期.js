// 309. 最佳买卖股票时机含冷冻期
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

/**
 * @分析
 * 1. 多次购买，1天冷冻期，无手续费
 * 2. 状态转移方程
 * dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i])
 * dp[i][1] = Math.max(dp[i-1][1],dp[i-1][2]-prices[i])
 * dp[i][2] = dp[i-1][0]
 */
var maxProfit = function(prices) {
    if(!prices.length) return 0
    let dp = new Array(prices.length).fill(null).map(() => new Array(3))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    dp[0][2] = 0
    for(let i = 1;i<prices.length;i++){
        dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i])
        dp[i][1] = Math.max(dp[i-1][1],dp[i-1][2]-prices[i])
        dp[i][2] = dp[i-1][0] 
    }
    return Math.max(dp[prices.length-1][0],dp[prices.length-1][2])

};