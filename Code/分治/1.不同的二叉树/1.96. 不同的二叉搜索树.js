/*
 * @Author: your name
 * @Date: 2021-07-08 09:13:08
 * @LastEditTime: 2021-07-08 10:08:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/分治/1.96. 不同的二叉搜索树.js
 */

// 96. 不同的二叉搜索树

/**
 * @分析 -- 分治
 * 1. 给定一个 n ，就是得到了一个 [1,n] 的单增数组，对于 BST 而言，给定同样的一个合规长度的数组，那么组成这个 BST 的形式是有限的
 * 2. 当给定 0 个节点，即某一课子树不存在，但是返回值为 1，当节点只有一个的时候，也只有一种情况，所以返回值也是 1
 * 3. 当给定的节点超过 1 的时候，我们就要选定根节点，然后把小于根节点的值给左子树，大于根节点的值给右子树，对于子树而言，一样执行上述操作，最后返回当前节点下组成的形式
 * 4. 将所有可选根节点的情况累加起来，就是当前节点最终可得的情况，然后递归回去，最终在树的根节点得到最终的值
 * 5. 时间复杂度 ${O(NlogN)}$,空间复杂度${O(H)}$ -- 每一层递归都会创建一个新的 ret
 */
var numTrees = function (n) {
  const recursion = (n) => {
    if (n === 0) return 1;
    if (n === 1) return 1;
    let ret = 0;
    for (let i = 1; i <= n; i++) {
      ret += recursion(i - 1) * recursion(n - i);
    }
    return ret;
  };
  return recursion(n);
};

/**
 * @分析 -- 动态规划
 * 1. 给定一个 n ，就是得到了一个 [1,n] 的单增数组，对于 BST 而言，给定同样的一个合规长度的数组，那么组成这个 BST 的形式是有限的
 * 2. dp[n] 表示给定 n 个有序数组下，可以拆解好的 BST 的数量 , 这里的边界条件应该是，dp[0] = 1,因为我们已经给的值必然大于 1，所以 dp[0] 属于子树情况
 * 3. 边界，最少都有1，所以默认值是 1
 * 4. 状态转移方程，和上面分治思路是一样的，遍历所有值作为根节点，然后取累加值
 * 4. 时间复杂度${O(NlogN)}$,空间复杂度${O(N)}$ -- N 是树节点的个数
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(1);
  for (let i = 1; i <= n; i++) {
    //   temp 是每个节点对应的分法值的累加
    let temp = 0;
    for (let j = 1; j <= i; j++) {
      temp += dp[j - 1] * dp[i - j];
    }
    dp[i] = temp;
  }
  return dp[n];
};
