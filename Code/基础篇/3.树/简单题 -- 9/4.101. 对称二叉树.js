/*
 * @Author: your name
 * @Date: 2021-07-31 18:03:50
 * @LastEditTime: 2021-07-31 18:14:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/4.101. 对称二叉树.js
 */

// 101. 对称二叉树

var isSymmetric = function (root) {
  if (!root) return false;
  const dfs = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right || left.val !== right.val) return false;
    return dfs(left.left, right.right) && dfs(left.right, right.left);
  };
  return dfs(root.left, root.right);
};
