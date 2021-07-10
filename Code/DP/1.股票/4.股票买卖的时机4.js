/*
 * @Author: your name
 * @Date: 2021-07-01 09:20:52
 * @LastEditTime: 2021-07-10 18:10:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/DP/1.股票/8.股票买卖的时机4.js
 */
// 188. 买卖股票的最佳时机 IV
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/

/**
 * @分析
 * 1. 最多k次购买，无休息日，无手续费
 * 2  dp[i][j][k] 表示在第 i 天交易的时候，交易了 j 次，状态为 k 的时候，利润是多少；
 * 3. 这里最难的是 base case 的确定，有两部分 -- t===0 和 i===0 的时候；当 j 为 0 的时候，表示一次交易都没做，那么dp[i][j][0] = 0,dp[i][j][1] 属于不可以获取的值，但是为了dp 的顺利获取，取大负无穷 - Infinity
 * 4. 当 i 为 0 的时候，dp[i][t][0] = 0, dp[i][t][1] = -prices[0]
 * 5. 状态转移函数1 dp[i][t][0] = Math.max(dp[i - 1][t][0], dp[i - 1][t][1] + prices[i])
 * 6. 状态转移函数2 dp[i][t][1] = Math.max(dp[i - 1][t][1], dp[i - 1][t - 1][0] - prices[i]) -- 只要买进就是进行了一次交易
 */
var maxProfit = function (k, prices) {
    if(!prices.length) return 0
    let dp = Array.from(prices).map(() => Array.from({length:k+1}).map(() => new Array(2)))
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
    return dp[prices.length - 1][k][0]
};