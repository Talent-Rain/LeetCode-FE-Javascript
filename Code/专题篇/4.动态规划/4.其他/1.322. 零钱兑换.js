// 322. 零钱兑换 -- 凑最小

/**
 * @分析 -- 硬币数无限
 * 1. 状态定义：dp[i] 表示凑成总金额为 i 时所需的最少的硬币数
 * 2. 状态转移方程: dp[i] = Math.min(dp[i-coins[x]])+1 -- 分别计算出上一次取一枚硬币时，最小的数，然后+1即可
 * 3. base case: dp[0] = 0
 * 4. 时间复杂度 ${O(n*m)}$ 其中 n 是硬币数量，m 是金额总数，空间复杂度为 ${O(m)}$
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1);
  // base case
  dp[0] = 0; // 如果总金额为0，则不需要取了
  for (let i = 1; i <= amount; i++) {
    dp[i] = Infinity; //初始化
    for (coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

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
