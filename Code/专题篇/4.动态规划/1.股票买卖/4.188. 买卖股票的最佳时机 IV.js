/*
 * @Author: your name
 * @Date: 2021-08-25 07:48:01
 * @LastEditTime: 2021-08-25 08:46:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/4.188. 买卖股票的最佳时机 IV.js
 */

// 188. 买卖股票的最佳时机 IV

// 1. 买卖 k 次， 不需要间隔, 不收手续费
// 2. dp[i][j][k] 表示在第 i+1 天（i 是下标值，对应的天数要+1），持有状态为 j , 买卖次数为 k 次时的最大利润，其中 i 就是 [0,len-1]， j 为 0 表示没有持有，为 1 表示持有
// 3. 买入记作 1 次，卖出不记作一次交易
// 4. 状态转移方程:   dp[i][0][k] = Math.max(dp[i-1][0][k],dp[i-1][1][k]+prices[i]), dp[i][1][k] = Math.max(dp[i-1][1][k],dp[i-1][0][k-1]-prices[i])
// 5. base case 1 -- 交易次数为 0 次时的全部状态，如果此时是持有1，即和交易次数为 0 产生冲突，只要交易次数没涨上去，任何交易都是耍流氓，所以相当于没有交易 0 ；如果是没有持有0，那么初始化状态就是 0 了；
// 6. base case 2 -- 由于交易次数为 0 的状态已经处理完了，这里交易次数最少为 1 次，也就是说持有属于正常操作，不持有属于异常，给个 0 占个位置；
// 7. 这里最难的地方是 base case 的确定，总之如果交易次数和持有状态发生异常，则代表交易失败，只有用了交易次数，持有状态同步更新，才算是一次正常的交易；

var maxProfit = function(k, prices) {
    const len = prices.length
    if(len<2) return 0
    // dp[i][j][k] -- i 为 [0,len-1] j:0,1 ; k 为 [0,k]
    const dp =Array.from(prices).map(() => Array.from({length:2}).map(() => new Array(k+1).fill(0)))
    for (let i = 0; i < prices.length; i++) {
        // base case1 -- 交易次数为 0 的时候
        dp[i][0][0] = 0
        dp[i][1][0] = 0
        for (let j = 1; j <= k; j++) {
            if(i === 0){
                // base case2 -- 第一天交易
                dp[0][0][j] = 0
                dp[0][1][j] = -prices[0]
                continue
            }
            dp[i][0][j] = Math.max(dp[i-1][0][j],dp[i-1][1][j]+prices[i])          
            dp[i][1][j] = Math.max(dp[i-1][1][j],dp[i-1][0][j-1]-prices[i])          
        }
    }
    return dp[prices.length-1][0][k]
};
