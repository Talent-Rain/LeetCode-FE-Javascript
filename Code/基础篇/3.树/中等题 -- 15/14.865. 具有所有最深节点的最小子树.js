/*
 * @Author: your name
 * @Date: 2021-08-06 09:00:47
 * @LastEditTime: 2021-08-06 09:48:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/14.865. 具有所有最深节点的最小子树.js
 */

// 865. 具有所有最深节点的最小子树

/**
 * 分析
 * 1. 自顶向下求出最大深度 max, 然后再自底向上，根据返回值的深度，求出最小的子树
 * 2. 因为我们要求的是最小的子树，但是这个子树要包含所有的最大深度节点，所以我们递归返回的是当前节点子树的最大深度，只有当子树的左右子树同时存在最大深度的节点时，我们才会替换到高度更高的树，即更大的树
 * 3. 先搜索到叶子节点，在递归回根节点，时间复杂度为 ${O(N)}$
 */
var subtreeWithAllDeepest = function (root) {
  let max = 0; // 最大深度
  let ret = undefined; // 目标节点
  const dfs = (root, depth) => {
    // 叶子节点 -- 前序遍历求出最大深度
    if (!root) {
        max = Math.max(max,depth) //求出最大深度
        return depth;
    }
    const left = dfs(root.left, depth + 1);
    const right = dfs(root.right, depth + 1);

    // 后序遍历根据左右子树的最大深度是否同时满足 max，判断是否需要替换成更大的子树
    if(left === max && right === max){
        // 只有在两子树的最大深度同时等于最大深度的时候，才需置换节点
        ret = root
    }
    // 后序遍历完了，到达根节点
    return Math.max(left, right); //返回的是当前节点子树中的的最大深度
  };
  dfs(root, 0);
  return ret
};


/**
 * @分析
 * 1. 之前是用全局变量保存最大深度和最小的树，实际上在每一次递归中，我们都能得到左右子树的情况，包括子树中`最大的深度`以及`对应的最小子树`,
 * 2. 所以递归 return 回来 `最大的深度`以及`对应的最小子树`，就可以不需要额外的变量了
 * 3. 实际上我们根本不需要知道具体的最大深度是多少，只需要比较深度，得到最大的那个即可
 */
var subtreeWithAllDeepest = function (root) {
    const dfs = (root, depth) => {
      if (!root)  return [root,depth];
      const [lr,ld] = dfs(root.left, depth + 1); // lr -- left root, ld -- left depth
      const [rr,rd] = dfs(root.right, depth + 1);
        if(ld === rd) return [root,ld] // 如果左右树的最大值相同，即最大深度节点两边都有，所以要更新一下最小树节点
        if(ld>rd) return [lr,ld]
        if(ld<rd) return [rr,rd]
    };
    return dfs(root, 0);
  };

