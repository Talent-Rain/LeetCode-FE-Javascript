<!--
 * @Author: your name
 * @Date: 2021-08-24 09:13:57
 * @LastEditTime: 2021-08-25 07:45:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/01.股票买卖/README.md
-->


### [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/submissions/)
分析
1. 买卖 1 次， 不需要间隔, 不收手续费
2. dp_0 表示没有持有的状态的最大利润，dp_1 表示持有状态下的最小成本
2.5. 由于只进行一次交易，所以 dp_1要尽可能大的取，确保买入的成本最小，而 dp_0 也要保持最高，保证卖出最大
3. 状态转移方程 dp_0 = Math.max(dp_0,dp_1+nums[i]), dp_1 = Math.max(dp_1,-nums[i])
4. base case dp_0 =0 dp_1 = -nums[i]
```javascript

var maxProfit = function(prices) {

    let dp_0 = 0,dp_1 = prices[0]
    for(let i = 0;i<prices.length;i++){
        dp_0 = Math.max(dp_0,dp_1+prices[i])
        dp_1 = Math.max(dp_1,-prices[i]) // 因为只会买卖一次，这里
    }
    return dp_0
}
```

### [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/submissions/)
分析
1. 买卖 n 次， 不需要间隔, 不收手续费
2. dp[i][j] 表示在第 i+1 天（i 是下标值，对应的天数要+1），状态为 j 时，最大利润，其中 i 就是 [0,len-1]， j 为 0 表示没有持有，为 1 表示持有
3. 状态转移方程: dp[i][0] = Math.max(dp[i-1][1]+temp, dp[i-1][0]), dp[i][1] =Math.max( dp[i-1][1], dp[i-1][0]-temp)
4. base case: dp[0][0] = 0, dp[0][1] = -temp
5. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var maxProfit = function(prices) {
    const dp = new Array(prices).map(() => [])
    dp[0][0] = 0,dp[0][1] =prices[0]
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i-1][1]+prices[i], dp[i-1][0])
        dp[i][1] =Math.max( dp[i-1][1], dp[i-1][0]-prices[i])
    }
    return dp[prices.length-1][0]
};
```

分析 -- 压缩空间变量
1. 压缩一下，将二维数组转成两个变量dp_0,dp_1
2. 时间复杂度 ${O(n)}$,空间复杂度 ${O(1)}$
```javascript

var maxProfit = function(prices) {
    let dp_0 = 0,dp_1 = -prices[0]
    for (let i = 1; i < prices.length; i++) {
        const temp_0 = dp_0
        dp_0 = Math.max(dp_0,dp_1+prices[i])
        dp_1 = Math.max(temp_0-prices[i],dp_1)
    }
    return dp_0
}
```


### [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
分析
1. 买卖 2 次， 不需要间隔, 不收手续费
2. dp[i][j][k] 表示在第 i+1 天（i 是下标值，对应的天数要+1），持有状态为 j , 买卖次数为 k 次时的最大利润，其中 i 就是 [0,len-1]， j 为 0 表示没有持有，为 1 表示持有
3. 买入记作 1 次，卖出不记作一次交易
4. 状态转移方程:   dp[i][0][k] = Math.max(dp[i-1][0][k],dp[i-1][1][k]+prices[i]), dp[i][1][k] = Math.max(dp[i-1][1][k],dp[i-1][0][k-1]-prices[i])
5. base case 1 -- 交易次数为 0 次时的全部状态，如果此时是持有1，即和交易次数为 0 产生冲突，只要交易次数没涨上去，任何交易都是耍流氓，所以相当于没有交易 0 ；如果是没有持有0，那么初始化状态就是 0 了；
6. base case 2 -- 由于交易次数为 0 的状态已经处理完了，这里交易次数最少为 1 次，也就是说持有属于正常操作，不持有属于异常，给个 0 占个位置；
7. 这里最难的地方是 base case 的确定，总之如果交易次数和持有状态发生异常，则代表交易失败，只有用了交易次数，持有状态同步更新，才算是一次正常的交易；

```javascript
var maxProfit = function (prices) {
    const dp = Array.from(prices).map(() => Array.from({length:2}).map(() => new Array(3)))
    const len = prices.length

    for(let i = 0;i<len;i++){
        for(let k = 1;k<=2;k++){
            // base case 1 -- 当 k 为 0 时
            dp[i][0][0]  = 0
            dp[i][1][0] = 0 // 只要交易次数没涨上去，任何交易都是耍流氓
            if(i === 0){
                // base case 2 -- 第一天时的状态 
                dp[0][0][k]  = 0 // 
                dp[0][1][k] = -prices[0]
                continue
            }
            dp[i][0][k] = Math.max(dp[i-1][0][k],dp[i-1][1][k]+prices[i])
            dp[i][1][k] = Math.max(dp[i-1][1][k],dp[i-1][0][k-1]-prices[i])
        }
    }
    return dp[len-1][0][2]
}
```

