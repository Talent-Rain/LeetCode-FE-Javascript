/*
 * @Author: your name
 * @Date: 2021-08-03 08:08:40
 * @LastEditTime: 2021-08-03 09:03:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/8.面试题 04.12. 求和路径.js
 */

// 面试题 04.12. 求和路径

/**
 * @分析 -- 双 dfs
 * 1. 起始点不限制，但是路径必须是向下，也就不能倒转网上走
 * 2. 两个 dfs，一个指向起始节点，一个以起始节点为根节点往下找
 * 3. 注意1：这里的值是任意值，所以不能用超出值或者取到路径就接续 dfs，而是必须要扫到叶子节点
 * 4. 时间复杂度 ${O(NlogN)}$ 相当于树中的每一个节点都当了初始节点，然后去遍历子树(find)
 */
var pathSum = function (root, sum) {
  let ret = 0;

  // 遍历节点的 dfs
  const dfs = (root) => {
    if (!root) return;
    find(root, 0);
    dfs(root.left);
    dfs(root.right);
  };

  const find = (root, total) => {
    total += root;
    // if (total > sum) return; // 结束这跳线 -- 这里
    if (total === sum) {
      // 符合条件
      ret++;
      //   return; 
    }
    if (root.left) find(root.left, total);
    if (root.right) find(root.right, total);
  };

  dfs(root);
  return ret;
};
