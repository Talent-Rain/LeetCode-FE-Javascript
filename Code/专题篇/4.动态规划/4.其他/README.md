<!--
 * @Author: your name
 * @Date: 2021-08-27 08:40:41
 * @LastEditTime: 2021-08-29 22:47:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/4.其他/README.md
-->

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