// 188. 买卖股票的最佳时机 IV
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/

/**
 * @分析
 * 1. 最多k次购买，无休息日，无手续费
 * 2. 这里最难的是 base case 的确定，有两部分 -- t===0 和 i===0 的时候
 */
var maxProfit = function (k, prices) {
    let dp = new Array(prices.length).fill(null).map(() => new Array(k+1).fill(null).map(() => new Array(2)))
    for (let i = 0; i < prices.length; i++) {
        // 重点 -- base case 1
        dp[i][0][0] = 0
        dp[i][0][1] = -Infinity
        for (let t = k; t >= 1; t--) {
            if (i === 0) {
                // 重点 -- base case 2
                dp[i][t][0] = 0
                dp[i][t][1] = -prices[0]
                continue
            }

            dp[i][t][0] = Math.max(dp[i - 1][t][0], dp[i - 1][t][1] + prices[i])
            dp[i][t][1] = Math.max(dp[i - 1][t][1], dp[i - 1][t - 1][0] - prices[i])
        }
    }
    console.log(dp)

    return dp[prices.length - 1][k][0]
};