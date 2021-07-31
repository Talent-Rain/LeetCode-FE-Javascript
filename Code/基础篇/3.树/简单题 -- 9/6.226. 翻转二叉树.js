/*
 * @Author: your name
 * @Date: 2021-07-31 21:37:40
 * @LastEditTime: 2021-07-31 21:54:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/简单题 -- 9/6.226. 翻转二叉树.js
 */
var invertTree = function (root) {
    const dfs = (root) => {
      // 到达了最底部，直接返回 null
      if (!root) return null;
      // 1.递归获取翻转后的左右子树
      const left = dfs(root.left)
      const right = dfs(root.right)
      // 2.反转两棵树的位置
      root.left = right
      root.right = left
      // 最后返回这个反转之后的树
      return root;
    };
    return dfs(root);
  };