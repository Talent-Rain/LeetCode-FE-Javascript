// 1306. 跳跃游戏 III
// https://leetcode-cn.com/problems/jump-game-iii/
/**
 * @分析 -- BFS
 * 1. 起点改变，跳跃也从单边转左右两边，目的地也从尽头到跳跃到 0 的位置 -- 注意，以前是可以跳任意位置，现在只能左右跳两个位置，而不是范围跳跃
 * 2. 基于 BFS 将数组转成类似二叉树的 bfs 搜索, 每一个节点都可以走左右两个节点 l,r, 如果符合条件，就加入到队列中继续走
 * 3. 使用的 useSet 缓存走过的节点，进行剪枝
 */
var canReach = function (arr, start) {
  const queue = [];
  queue.push(start);
  const useSet = new Set();

  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      const l = node - arr[node];
      const r = node + arr[node];
      if (l >= 0 && !useSet.has(l)) {
        if (arr[l] === 0) return true;
        queue.push(l);
        useSet.add(l);
      }
      if (r < arr.length && !useSet.has(r)) {
        if (arr[r] === 0) return true;
        queue.push(r);
        useSet.add(r);
      }
    }
  }
  return false;
};

/**
 * @分析 -- dfs
 * 1. 由于没一个点最多只能左右跳一次，所以和二叉树非常相似，可以用 bfs ，当然也可以用到 dfs
 * 2. 但是判断条件不能简单的用 node 是否在 [0,arr.length-1], 因为在左右跳的过程中会有重复的点，如果不讲重复点剪掉，不但重复计算，而且会导致死循环
 * 3. 所以用 set 缓存已经走的 node，一旦再进入就移除，这样就能完整遍历可以跳到的位置，并最终跳出 dfs 遍历，得到最终结果
 * 4. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
 */
var canReach = function (arr, start) {
  let ret = false;
  const useSet = new Set(); // 剪枝用的
  const dfs = (node) => {
    if (useSet.has(node) || ret === true) return;
    if (arr[node] === 0) {
      ret = true;
      return;
    }
    useSet.add(node);
    if (node - arr[node] >= 0) {
      dfs(node - arr[node]);
    }
    if (node - arr[node] < arr.length) {
      dfs(node + arr[node]);
    }
  };
  dfs(start);
  return ret;
};
