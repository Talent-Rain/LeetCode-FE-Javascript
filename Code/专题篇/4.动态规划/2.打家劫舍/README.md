
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