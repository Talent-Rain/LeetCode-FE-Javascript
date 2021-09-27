// 122. 买卖股票的最佳时机 II
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

/**
 * @分析 -- 贪心
 * 1. 多次交易，只有计算出每日的收益，然后将每日收益为正的收集起来就是最大收益
 * 2. 由于本题是多次交易，不需要手续费和间隔时间，
 * 3. 所以如果有连续正收益的时候，相当于连续持有，如果间隔收益，那就是在负收益第一天先卖出后，在负收益的后一天买进，一样可以得到断开的正收益，所以只要将所有正收益手机起来就好
 * 4. 这样局部收益就可以扩展成全局收益，然后就可以得到最终最大的收益了
 */
var maxProfit = function(prices) {
    let ret = 0
    for(let i = 1;i<prices.length;i++){
        const temp = prices[i]-prices[i-1]
        if(temp>0){
            ret+=temp
        }
    }

    return ret
}