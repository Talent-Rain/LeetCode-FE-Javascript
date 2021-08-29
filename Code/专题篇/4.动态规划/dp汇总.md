## 前言

某个男人 [动态规划](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/thinkings/dynamic-programming#xiao-jie),而我作为一个致力称为厨师界最会写算法的前端，总得刷上一部分题，有那么一点发现吧，现在我们就来聊聊，菜鸡如我，发现了什么。

引流一下 

[刷完这 20 道二分题，可能还是手撕不了大厂面试](https://juejin.cn/post/6999053946807386119)

[刷完这几道堆题，可能还是手撕不了大厂面试](https://juejin.cn/post/6990532472279105572/)

[刷完这 30 道树题，可能还是手撕不了大厂面试](https://juejin.cn/post/6993955773218816008)

[刷完这 20 道链表题，可能还是手撕不了大厂面试](https://juejin.cn/post/6996127305919627277) 

## 正文

汇总这周学习的现在，我脑壳疼的慌，啥东西都想不到，但是为了不破自己每周都总结一下下的目标，只能水几句了；

dp 好像是所有初级菜鸟的一个瓶颈，反正每次说到算法难在哪里，第一个想到的就是 dp， 去吹牛皮说面试别人装逼，就说随手甩几道 dp 去难为面试者的老哥层出不穷，所以 dp 有一种绝望之巅的赶脚，只要翻过它，就能进阶了；

其实学习算法到面试遇到的算法，用到 dp 的时候其实没有，树，链表这些反而是超火的热题，所以 dp 对于前端以面试为目的的算法学习，属于一种积累吧，就是经典题型学一学，遇到了原题搞一搞，遇到难题直接 pass ，就是高考数学倒数两题的感觉，所以呢，所以把最经典的复习一遍，然后。。我就一菜鸡，我也不知道, 反正后续应该会继续编吧，会学更深的 dp，毕竟这个东西是真的有意思，有兴趣的可以到这里学习一下[大神的总结](https://oi-wiki.org/dp/knapsack/)

以上，实在吹不下去了，下线，睡觉；下周做，位运算吧；加油呀


## 题目汇总
### 股票买卖
- [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/submissions/)
- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/submissions/)
- [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)
- [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/submissions/)
### 打家劫舍

- [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/submissions/)
- [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/submissions/)
- [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-ii/solution/da-jia-jie-she-1-3-by-jzsq_lyx-tckd/)

### 记忆化递归
- [118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/submissions/)
- [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/solution/ji-yi-hua-di-gui-yu-dp-by-jzsq_lyx-v2eh/)
- [面试题 08.06. 汉诺塔问题](https://leetcode-cn.com/problems/hanota-lcci/solution/di-gui-qiu-zhi-by-jzsq_lyx-gtpk/)

### 其他
- [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)
- [518. 零钱兑换 II -- 凑方案](https://leetcode-cn.com/problems/coin-change-2/)
- [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/submissions/)
## 题目
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

### [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

1. 和[123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)是一样的操作和分析
2. 值得注意的是，这题的入参， prices.length 的范围是 [0,1000]， 所以需要进行判空处理；而 [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/) 中的 prices.length 的范围是 [1,pow(10,5)], 所以可以直接使用

```javascript
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

```

### [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
 分析
 1. 买卖 n 次， 需要间隔 1 天, 不收手续费
 2. dp_0_0 表示没有持有，不处于冷却期，dp_0_1 表示没有持有，处于冷却期, dp_1_0 正常情况，持有的时候没有冷却期， dp_1_1 属于矛盾的状态，忽略
 3. 状态转移方程:
    - dp_0_0 = Math.max(dp_0_0, dp_0_1);
    - dp_0_1 = dp_1_0 + prices[i];
    - dp_1_0 = Math.max(dp_1_0,temp - prices[i]);
4. base case: dp_0_0 = 0, dp_0_1 = 0, dp_1_0 = -prices[0];
5. 主要注意有冷却期的是没有持有才会触发，所以总共只有三种状态,dp_0_0 = 0, dp_0_1, dp_1_0； 所以可以直接将空间复杂度压缩到 ${O(1)}$
```javascript
var maxProfit = function (prices) {
  const len = prices.length;
  if (len < 2) return 0;
  let dp_0_0 = 0,
    dp_0_1 = 0,
    dp_1_0 = -prices[0];

  for (let i = 1; i < len; i++) {
    const temp = dp_0_0;
    // 不在冷却中的没持有状态，证明上一次只可能是没有持有的状态
    dp_0_0 = Math.max(dp_0_0, dp_0_1);
    dp_0_1 = dp_1_0 + prices[i];
    dp_1_0 = Math.max(dp_1_0,temp - prices[i]);
  }
  return Math.max(dp_0_0, dp_0_1);
};

console.log(maxProfit([1, 2, 4]));

```

### [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/submissions/)
分析
1. 买卖 n 次， 无间隔, 收手续费
2. 由于要收手续费，那么就不是怎么买卖都是好的了，必须将成本算上去，之前都是无本例如，只需要低买高卖就成，现在必须考虑可能会亏的可能
3. 整体分析和 [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/submissions/) 一样，只是在卖出的时候，加上 fee 即可

```javascript
 var maxProfit = function(prices, fee) {
    let dp_0 = 0, dp_1 = -prices[0]
    for (let i = 1; i < prices.length; i++) {
        const temp =dp_0
        dp_0 = Math.max(dp_0,dp_1 + prices[i] - fee)
        dp_1 = Math.max(dp_1,temp - prices[i])
    }
    return dp_0
};
```


### [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/submissions/)
分析
1. dp[i][0] 表示在第 i 个房子没有偷东西时的最高金额， dp[i][1] 表示偷东西了的最高金额
2. 状态转移方程:  dp[i][0] = Math.max(dp[i-1][1],dp[i-1][0]) dp[i][1] = dp[i-1][0]+nums[i]
3. base case dp[0][0] = 0 dp[0][1]= numns[0]
4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var rob = function (nums) {
  const len = nums.length;
  const dp = new Array(len).fill(null).map(() => new Array(2));
  dp[0][0] = 0;
  dp[0][1] = nums[0];
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }

  return Math.max(dp[len - 1][0], dp[len - 1][1]);
};
```
分析
1. 降维，每次的值只和前一个有关，且状态值只有两个，所以可以直接用两个变量 dp_0,dp_1 表示
2. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var rob = function (nums) {
    let dp_0 = 0,dp_1 = nums[0]
  for (let i = 1; i < len; i++) {
        const temp = dp_0 // 保存一下上一个 dp_0
        dp_0 = Math.max(dp_0,dp_1)
        dp_1 = temp+nums[i]
    }
    return Math.max(dp_0,dp_1)
}
```

### [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/submissions/)
分析
 1. dp[i][j][k] 其中 i 表示第 i 个值， j 表示第一个房子是否偷了，k 表示当前这个房子有没有偷
 2. 状态转移方程: dp[i][j][k] = dp[i-1][j][k]
 3. base case: dp[0][0][0] = 0, dp[0][1][1] = nums[0],dp[0][0][1] = -1,dp[0][1][0] = -1
 4. 时间复杂度 ${O(n)}$ 空间复杂度 ${O(n)}$

```javascript
 var rob = function (nums) {
  const len = nums.length;
  const dp = new Array(len)
    .fill(0)
    .map(() => new Array(2).fill(0).map(() => new Array(2).fill(-1)));
  (dp[0][0][0] = 0), (dp[0][1][1] = nums[0]);
  for (let i = 1; i < len; i++) {
    dp[i][0][0] = Math.max(dp[i - 1][0][0], dp[i - 1][0][1]);
    dp[i][0][1] = dp[i - 1][0][0] + nums[i];
    dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][1][1]);
    dp[i][1][1] = i === len - 1 ? dp[i - 1][1][1] : dp[i - 1][1][0] + nums[i];
  }
  return Math.max(dp[len - 1][0][0], dp[len - 1][0][1], dp[len - 1][1][0],dp[len - 1][1][1]);
};

```
分析
1. 降维，每次的值只和前一个有关，且两个状态值分别只有两个item，所以可以直接用四个变量 dp_0_0,dp_1_1,dp_1_0,dp_0_1 保持迭代过程中的状态
2. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var rob = function (nums) {
  let dp_0_0 = 0, dp_1_1 = nums[0], dp_1_0 = -1,dp_0_1 = -1  
  for (let i = 1; i < nums.length; i++) {
    const temp_0_0 =  dp_0_0
    const temp_1_0 =  dp_1_0
    dp_0_0 = Math.max(dp_0_0,dp_0_1)
    dp_0_1 = temp_0_0 + nums[i]
    dp_1_0 = Math.max(dp_1_0,dp_1_1)
    dp_1_1 = i === nums.length - 1 ?  dp_1_1 : temp_1_0+nums[i]

  }
  return Math.max(dp_0_0,dp_1_1,dp_1_0,dp_0_1);
};

```
### [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-ii/solution/da-jia-jie-she-1-3-by-jzsq_lyx-tckd/)
分析
1. 自低向上求最大的状态值，每一个节点都返回两个状态值[dp_0,dp_1] , 其中 dp_0 表示没有取挡墙 root.val 的值，dp_1 表示取了当前val 的最大值
2. 最开始也尝试使用自顶向下保持状态去取，但是可以取得单条路径的最大状态值，累加的话需要找出重复的状态节点，所以不太合适
3. 自底向上取可以保证所有连线上的节点的状态都一一进行处理，最后汇总到根节点上，得到最大值，而自顶向下，最后其实是分散的，最大值在哪里不好确定，这里也不行一般的 dp 用数组保存所有状态值，所以为了就一个聚合值，也应该考虑是自底向上，求根节点的状态值
4. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(1)}$
```javascript
var rob = function (root) {
  const recursion = (root) => {
    if (!root) return [0, 0];
    const [ldp_0, ldp_1] = recursion(root.left);
    const [rdp_0, rdp_1] = recursion(root.right);

    const dp_0 = Math.max(
      ldp_0 + rdp_0,
      ldp_0 + rdp_1,
      ldp_1 + rdp_0,
      ldp_1 + rdp_1
    );
    const dp_1 = ldp_0 + rdp_0 + root.val;
    return [dp_0, dp_1];
  };
  const [dp_0, dp_1] = recursion(root);
  return Math.max(dp_0, dp_1);
};

```


### [118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/submissions/)

分析
1. 杨辉三角中，两条边都是 1 
2. 三角里的值 num[row][col] = num[row-1][col-1]+num[row-1][col]
3. 只需要设置好边界，可以直接用 dp 缓存自顶向下遍历过的 num[row][col]
```javascript
var generate = function(numRows) {
    const dp = new Array(numRows)
    for (let i = 0; i < numRows; i++) {
        dp[i] = new Array() ;
        for(let j = 0;j<=i;j++){
            // 杨辉三角的两边都是 1
            if(j ===  0  || j === i) {
                dp[i][j] = 1
                continue
            }
            dp[i][j] = dp[i-1][j-1]+dp[i-1][j]
        }      
    }
    return dp
};

console.log(generate(1))
console.log(generate(2))
console.log(generate(5))
```

###  [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/solution/ji-yi-hua-di-gui-yu-dp-by-jzsq_lyx-v2eh/)
分析 -- 记忆化递归 -- 自顶向下缓存对应的值
1. 用 map 存储递归过程中存储不同楼梯长度 key, 对应的走法 value
2. 每一次递归都先查 map 是否已经有答案，没有的时候再递归往下继续走
3. base case，[0->1,1->1], 使用 map 缓存值，可以减少重复的中间操作，降低时间复杂度
4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var climbStairs = function(n) {
    const map = new Map()
    map.set(1,1)
    map.set(0,1)
    const recursion= (n) => {
        if(map.has(n)) return map.get(n)
        const sum =  recursion(n-1)+recursion(n-2)
        map.set(n,sum)
        return sum
    }
    return recursion(n)
};
```
@分析 -- dp
1. 使用 dp[i] 表示楼梯为 i 时，有多少种走法
2. 状态转移方程: dp[i] = dp[i-1]+dp[i-2] 
3. base case: dp[0] + dp[1] = 1  -- 啥也不走也是一种走法
4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var climbStairs = function(n) {
    const dp = []
    dp[1] = 1
    dp[0] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
}
```
### [面试题 08.06. 汉诺塔问题](https://leetcode-cn.com/problems/hanota-lcci/solution/di-gui-qiu-zhi-by-jzsq_lyx-gtpk/)
分析
1. 这个一个典型的递归问题,每一次都要将 n 个值从 first启动，经过 second，最后到达 end
2. 拆解一下，如果 n === 1，直接从 first -> end 即可
3. 如果有 n > 1, 那么需要先将 n-1 个值从 first -> end -> second  存储起来，将剩下的一个直接从 first -> end
4. 经过步骤3，当前first 是空的,second 有 n-1 个值， end 有 1个最大值，现在这种情况等价于将  n-1 个值从 second -> first -> end ， 这样最后就能在 end 中找到一个完整的 n 个值的数组了
5. 时间复杂度${O(n^2)}$
```javascript
var hanota = function(A, B, C) {
    const len = A.length;
    const recursion = (n,first,second,end) => {
        if(n === 1) {
            const a = first.pop()
            end.push(a)
            return
        }
        // 将 n-1 个值从 first -> end -> second, 然后将最后的值从 first 移动到 end
        recursion(n-1,first,end,second)
        end.push(first.pop())
        // 现在 end 有一个值， second 有 n-1 个值 ， first 为空
        // 再将 n-1 个值从 second -> first -> end
        recursion(n-1,second,first,end)
    }
    recursion(len,A,B,C)
};
```


### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)
分析 -- 硬币数无限
1. 状态定义：dp[i] 表示凑成总金额为 i 时所需的最少的硬币数
2. 状态转移方程: dp[i] = Math.min(dp[i-coins[x]])+1 -- 分别计算出上一次取一枚硬币时，最小的数，然后+1即可
3. base case: dp[0] = 0 
4. 时间复杂度 ${O(n*m)}$ 其中 n 是硬币数量，m 是金额总数，空间复杂度为 ${O(m)}$
```javascript
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1)
  // base case
  dp[0] = 0; // 如果总金额为0，则不需要取了
  for (let i = 1; i <= amount; i++) {
    dp[i] = Infinity //初始化
    for (coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// 两层遍历是无所谓 的，排列组合都 ok，因为求的是一个极值
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  // base case
  dp[0] = 0; // 如果总金额为0，则不需要取了
  for (coin of coins) {
    for (let i = 1; i <= amount; i++) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

```
### [518. 零钱兑换 II -- 凑方案](https://leetcode-cn.com/problems/coin-change-2/)
分析
1. 一直不理解为什么必须是外层写 coins 的循环，内层写 amount 循环，因为这个 [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/) 还是有点类似的，都是凑钱，一个是凑最小的数，而我这里凑的方案
2. 也正因为凑的是方案数，所以 1-2-1 和 1-1-2 是一样的方案，这里要的只是组合，而不需要排列；
3. 所以如果外层是 amount，就考虑到了每一次取硬币的顺序，得到的是一个排列数，与本题不符合，所以把 coins 放外层，那么整个方案设计就只和硬币的类型有关，和取的顺序无关了 -- 有感于此，在上面那题加一个 coins 外层嵌套的写法也是 ok 的；
4. 状态定义：dp[i] 表示凑成总金额为 i 时存在的方案 -- 给定 amount 硬币数组，硬币种类不一样，得到的方案数不一样
5. 状态转移方程: dp[i] = sum(dp[i-coin]) -- 分别计算出取走一枚硬币时，能够凑出的方案数
6. base case: dp[0] = 1 //不取也是一种方案
7. 时间复杂度 ${O(n*m)}$ 其中 n 是硬币数量，m 是金额总数，空间复杂度为 ${O(m)}$
```javascript
var change = function (amount, coins) {
  const dp = new Array(amount + 1).fill(0); //凑不齐就是 0 个方案了
  dp[0] = 1; //不取也是一种方案

    // 相当于背包问题中，背包里的东西有哪些，每多一样东西，就可以更新方案
  for (coin of coins) {
    for (let i = coin; i <= amount; i++) {
        // 只有比当前币值高的，才需要更新方案数
      dp[i] = dp[i] + dp[i - coin];
    }
  }
  return dp[amount];
};

```

### [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/submissions/)

分析
1. 状态定义 -- dp[i][j] 表示 在[i,j]的子串是一个回文子串
2. 状态转移方程: dp[i][j] = s[i] === s[j] && dp[i+1][j-1] 
3. base case: j-i<1 && s[i] === s[j] 时，dp[i][j] = true, 他们就是回文子串
4. dp 是根据已知值去推断无后续性的值，所以要求 dp[i][j] 的时候，要不 dp[i+1][j-1] 已经知道，要不就是一个 base case
5. 所以外层包裹的是一个终点值，然后 i 处于内层向前扩展

```javascript
 var longestPalindrome = function(s) {
    const dp =Array.from(s).map(() => new Array()) 
    let ret = ''
    for(let j = 0;j <s.length;j++){
        for(let i =j;i>=0;i--){
            if( j-i<2 && s[i] === s[j]){
                // base case : 单个字符
                dp[i][j] = true
            }else if(s[i] === s[j] && dp[i+1][j-1]){
                dp[i][j] = true
            }
            if(dp[i][j] && j-i+1>ret.length){
                ret = s.slice(i,j+1)
            }
        }   
    }
    return ret
};


```