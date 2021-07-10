/*
 * @Author: your name
 * @Date: 2021-07-01 09:20:52
 * @LastEditTime: 2021-07-10 18:12:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/DP/1.股票/3.股票买卖的时机3.js
 */
// 123. 买卖股票的最佳时机 III
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/

/**
 * @分析
 * 1. 最多两次购买，无休息日，无手续费 -- 有限次
 * 2. dp[i][j][0] 其中 i 表示取得下标为 i 的值时, j 表示已经交易了的次数, 没有持有时赚的钱，k=1 表示持有时赚的钱
 * 3. 边界条件 dp[i][0][0] 无论 i 是多少，如果只能交易0次，那么 dp[i][0][0] = 0, dp[i][0][1] = -Infinity 其中 p[i][0][1] = -Infinity 表示哪怕能交易一次，也会超出这个值
 * 4. 状态转移方程: dp[i][j][0] =Max(dp[i-1][j][0],dp[i-1][j][1]+prices[i])  
 * 5. 状态转移方程: dp[i][j][1] =Max(dp[i-1][j][1],dp[i-1][j-1][0]-prices[i]) -- 注意，买进就算是进行一次交易，无论后续是否卖出
 * 6. 时间复杂度 ${O(N)}$,空间复杂度 ${O(N)}$
 */
var maxProfit = function (prices) {
    let dp = Array.from(prices).map(() => Array.from({length:3}).map(() => new Array(2)))
    for (let i = 0; i < prices.length; i++) {
    for (let k = 1; k <= 2; k++) {
        // 重点 -- base case 1
        dp[i][0][0] = 0
        dp[i][0][1] = -Infinity
            if (i === 0) {
                // 重点 -- base case 2
                dp[i][k][0] = 0
                dp[i][k][1] = -prices[0]
                continue
            }
            console.log(k,dp[i - 1][k-1][1],prices[i])
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k-1][0] - prices[i])
        }
    }
    return dp[prices.length - 1][2][0]
};