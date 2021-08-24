/*
 * @Author: your name
 * @Date: 2021-08-24 09:05:24
 * @LastEditTime: 2021-08-24 09:18:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/2.122. 买卖股票的最佳时机 II.js
 */

// 122. 买卖股票的最佳时机 II

/**
 * @分析
 * 1. 买卖 n 次， 不需要间隔, 不收手续费
 * 2. dp[i][j] 表示在第 i+1 天（i 是下标值，对应的天数要+1），状态为 j 时，最大利润，其中 i 就是 [0,len-1]， j 为 0 表示没有持有，为 1 表示持有
 * 3. 状态转移方程: dp[i][0] = Math.max(dp[i-1][1]+temp, dp[i-1][0]), dp[i][1] =Math.max( dp[i-1][1], dp[i-1][0]-temp)
 * 4. base case: dp[0][0] = 0, dp[0][1] = -temp
 * 5. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var maxProfit = function(prices) {
    const dp = new Array(prices).map(() => [])
    dp[0][0] = 0,dp[0][1] =prices[0]
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i-1][1]+prices[i], dp[i-1][0])
        dp[i][1] =Math.max( dp[i-1][1], dp[i-1][0]-prices[i])
    }
    return dp[prices.length-1][0]
};


/**
 * @分析
 * 1. 压缩一下，将二维数组转成两个变量dp_0,dp_1
 * 2. 时间复杂度 ${O(n)}$,空间复杂度 ${O(1)}$
 */
var maxProfit = function(prices) {
    let dp_0 = 0,dp_1 = -prices[0]
    for (let i = 1; i < prices.length; i++) {
        const temp_0 = dp_0
        dp_0 = Math.max(dp_0,dp_1+prices[i])
        dp_1 = Math.max(temp_0-prices[i],dp_1)
    }
    return dp_0
}