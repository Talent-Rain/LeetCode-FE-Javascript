/*
 * @Author: your name
 * @Date: 2021-08-23 09:17:01
 * @LastEditTime: 2021-08-23 09:50:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/2.打家劫舍/3.337. 打家劫舍 III.js
 */

// 337. 打家劫舍 III

/**
 * @分析
 * 1. 自低向上求最大的状态值，每一个节点都返回两个状态值[dp_0,dp_1] , 其中 dp_0 表示没有取挡墙 root.val 的值，dp_1 表示取了当前val 的最大值
 * 2. 最开始也尝试使用自顶向下保持状态去取，但是可以取得单条路径的最大状态值，累加的话需要找出重复的状态节点，所以不太合适
 * 3. 自底向上取可以保证所有连线上的节点的状态都一一进行处理，最后汇总到根节点上，得到最大值，而自顶向下，最后其实是分散的，最大值在哪里不好确定，这里也不行一般的 dp 用数组保存所有状态值，所以为了就一个聚合值，也应该考虑是自底向上，求根节点的状态值
 * 4. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(1)}$
 */
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
