/*
 * @Author: your name
 * @Date: 2021-07-31 18:26:00
 * @LastEditTime: 2021-07-31 21:18:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/简单题 -- 9/5.104. 二叉树的最大深度.js
 */
// 104. 二叉树的最大深度

/**
 * 1.无论是深度，层数等，直接用层序遍历找到最后一层的最后一个叶子节点即可
 */

var maxDepth = function (root) {
  if (!root) return 0;
  let ret = 0;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    ret++; // 进入一层
    let len = queue.length;
    while (len--) {
      // 层序遍历
      const root = queue.shift();
      if (root.left) queue.push(root.left);
      if (root.right) queue.push(root.right);
    }
  }
  return ret;
};

/**
 * 1. 自顶向上，带个层数参数，判定为叶子节点就进行最大值判断
 */
var maxDepth = function (root) {
  if (!root) return 0;
  let ret = 0;
  const dfs = (root, depth) => {
    if (root.left) dfs(root.left, depth + 1);
    if (root.right) dfs(root.right, depth + 1);
    ret = Math.max(ret, depth);
    return;
  };
  dfs(root, 1);
  return ret;
};

// 自低向上
var maxDepth = function (root) {
  const dfs = (root) => {
    if (!root) return 0;
    return Math.max(dfs(root.left), dfs(root.right))+1;
  };
  return dfs(root);
};
