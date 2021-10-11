// 96. 不同的二叉搜索树
// https://leetcode-cn.com/problems/unique-binary-search-trees/

/**
 * @分析 -- 分治
 * 1. 题目都是给定 n 个节点，求最多能有多少种 BST，也就是求在 [1,n] 这些节点能构成多少中 BST， 可以细分到按顺序的 [k,k+n] 的小区间，能构成多少个 BST
 * 2. 先分: 由于 BST 左树小于右树，所以可以不断将节点区间拆分左右两份，交给子树自己处理
 * 3. 再治: 拆分到只有一个节点的时候，自然只有一种了；当左右树分别都有l,r 种不同的解法，合并之后就是 l*r 种了
 * 4. 当然这种办法会做很多重复的工作，毕竟我们在执行回调的时候，入参的指数一个节点树 x, 所以我们可以用空间换时间的概念，缓存一些值
 * 5. 这样处理之后，时间复杂度为 ${O(nlog(n))}$, 空间复杂度为 ${O(n)}$
 */
var numTrees = function (n) {
  const map = new Map();
  const recursion = (n) => {
    if (n <= 1) return 1; //没有节点也算一种分配
    let temp = 0;
    for (let i = 1; i <= n; i++) {
      let l, r;
      if (map.has(i - 1)) {
        l = map.get(i - 1);
      } else {
        l = recursion(i - 1);
        map.set(i - 1, l);
      }
      if (map.has(n - i)) {
        r = map.get(n - i);
      } else {
        r = recursion(n - i);
        map.set(n - i, r);
      }
      temp += l * r;
    }
    return temp;
  };
  return recursion(n);
};

/**
 * @分析 -- dp + 分治
 * 1. 根据分治解法可知，每一次都只是按照节点数来治理相应的子树，所以可以用 dp 来缓存
 * 2. dp[i] 表示有 i 个节点时，不同子树的最大数量
 * 3. base case dp[0] =1, 这个其实就是分治中分到最后的初次治理
 * 4. 状态转移方程: dp[i] = 累加的 dp[k-1]*dp[i-k] 这里就是分治中治理合并的过程，在 dp 中是状态转移方程；
 * 5. 时间复杂度为 ${O(nlog(n))}$, 空间复杂度为 ${O(n)}$
 */
var numTrees = function (n) {
    const dp = new Array(n+1)
    dp[0] = 1
    for(let i =1;i<=n;i++){
        dp[i] = 0
        for(let j = 1;j<=i;j++){
            dp[i] +=dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
}