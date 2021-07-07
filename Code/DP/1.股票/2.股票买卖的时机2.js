// 122. 买卖股票的最佳时机 II
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

/**
 * @分析
 * 1. 允许多次购买，无休息日，无手续费
 * 2. dp_0 代表没有持有时的最大收益，dp_1 代表持有时的最大收益
 * 3. 边界条件，dp_0 = 0, dp_1 = -prices[0]
 * 4. 状态转移方程: dp_0 = Max(dp_0,dp_1+prices[i]) dp_1 = Max(dp_0-prices[i],dp_1)
 * 5. 时间复杂度${O(N)}$, 空间复杂度 ${O(1)}$
 */
var maxProfit = function (prices) {
    if (!prices.length) return 0
    let dp_0 = 0;
    let dp_1 = -prices[0]

    for (let i = 1; i < prices.length; i++) {
        const temp = dp_0 //需要临时保存 dp_0
        dp_0 = Math.max(dp_0, dp_1 + prices[i])
        dp_1 = Math.max(dp_1, temp - prices[i])
    }

    return dp_0
};