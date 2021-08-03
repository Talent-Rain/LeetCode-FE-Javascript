/*
 * @Author: your name
 * @Date: 2021-08-01 11:30:21
 * @LastEditTime: 2021-08-01 15:20:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 18/3.863. 二叉树中所有距离为 K 的结点.js
 */

// 863. 二叉树中所有距离为 K 的结点

var distanceK = function (root, target, k) {
  let targetNode = undefined;

  // 第一个 dfs ，是为了在 根节点 -> target 之间的的节点打上 parent 的指针，方便从下往上找
  const setDfs = (root) => {
    if (root === target) {
      // 找到了, 就让剩下的搜索停止
      targetNode = root;
    }
    if (root.left && !targetNode) {
      root.left.parent = root;
      setDfs(root.left);
    }
    if (root.right && !targetNode) {
      root.right.parent = root;
      setDfs(root.right);
    }
  };
  setDfs(root);

  const ret = [];
  const paths = []; // 走过节点

  // 从上往下去找, 其中 index 表示距离 target 的距离
  const find = (root, index) => {
    if (index === k) {
      ret.push(root.val);
    }
    if (index < k) {
      if (root.left && !paths[root.left.val]) find(root.left, index + 1);
      if (root.right && !paths[root.right.val]) find(root.right, index + 1);
    }
  };

  let index = 0;
  while (targetNode && index <= k) {
    paths[targetNode.val] = targetNode.val;
    find(targetNode, index);
    targetNode = targetNode.parent;
    // 每网上一次，就要将节点走一次
    index++;
  }

  return ret;
};
