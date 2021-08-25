/*
 * @Author: your name
 * @Date: 2021-08-24 09:23:31
 * @LastEditTime: 2021-08-25 08:05:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/3.123. 买卖股票的最佳时机 III.js
 */

// 123. 买卖股票的最佳时机 III

/**
 * @分析
 * 1. 买卖 2 次， 不需要间隔, 不收手续费
 * 2. dp[i][j][k] 表示在第 i+1 天（i 是下标值，对应的天数要+1），状态为 j , 买卖了 k 次时，最大利润，其中 i 就是 [0,len-1]， j 为 0 表示没有持有，为 1 表示持有
 * 3. 买入记作 1 次，卖出不记作一次交易
 * 4. 状态转移方程:   dp[i][0][k] = Math.max(dp[i-1][0][k],dp[i-1][1][k]+prices[i]), dp[i][1][k] = Math.max(dp[i-1][1][k],dp[i-1][0][k-1]-prices[i])
 * 5. base case 1 -- 确保所有状态为 0， 交易 0 次时，值为 0 ，同时如果交易状态为1，交易次数为0，表示不合理，这里用 -Infinite 表示，即每人会去取它
 * 6. base case 2 -- 第一天时的状态为 0 时，值为0，为 1 时,取 -prices[0]；注意，这里 k 其实应该跟随 j 取 0，1 时的状态，剩下的状态是有问题的，但是因为这个 k 遍历时是想下做比较的，所以 0,1 符合就可以了
 * 
 */
var maxProfit = function (prices) {
    const dp = Array.from(prices).map(() => Array.from({length:2}).map(() => new Array(3)))
    const len = prices.length

    for(let i = 0;i<len;i++){
        for(let k = 1;k<=2;k++){
            // base case 1 -- 当 k 为 0 时
            dp[i][0][0]  = 0
            dp[i][1][0] = 0
            if(i === 0){
                // base case 2 -- 第一天时的状态 
                dp[0][0][k]  = 0
                dp[0][1][k] = -prices[0]
                continue
            }
            dp[i][0][k] = Math.max(dp[i-1][0][k],dp[i-1][1][k]+prices[i])
            dp[i][1][k] = Math.max(dp[i-1][1][k],dp[i-1][0][k-1]-prices[i])
        }
    }
    return dp[len-1][0][2]
}