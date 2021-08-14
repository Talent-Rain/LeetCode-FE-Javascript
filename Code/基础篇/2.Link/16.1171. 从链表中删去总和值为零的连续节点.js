/*
 * @Author: your name
 * @Date: 2021-08-14 06:59:40
 * @LastEditTime: 2021-08-14 07:27:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/16.1171. 从链表中删去总和值为零的连续节点.js
 */

// 1171. 从链表中删去总和值为零的连续节点

/**
 * @分析 -- 暴力解法
 * 1. 直接两个循环遍历链表，得到所有链表组合的和，遇到 0 的，刷新外层指针的 next ，达到删除的效果
 * 2. 类比于数组，相当于将数组中和为0的连续子数组删除，得到剩下的数组，所以可以开两个循环，动态获取数组的长度，一旦遇到符合要求的数组，就删除，直到外层遍历结束为止
 * 3. 画图会比较容易看到，值得注意的是，一定要有一个指针 outer 从 head -> tail , 然后每一次都有临时指针 inner 从 outer.next 开始走到 tail
 * 4. 最差就不需要删除，所以要走 1+2+3+...n = ${O(N^2)}$
 */
var removeZeroSumSublists = function (head) {
  let emptyNode = new ListNode();
  emptyNode.next = head;
  let sum = 0;
  let outer = emptyNode;
  while (outer) {
    let inner = outer.next;
    while (inner) {
      // 每次都由 inner 来判断是否要删除相应的链表
      // outer 相当于是外围的一个 prev 指针，一旦某一个链表需要删除，直接 outer.next = 删除节点的下一个节点 即可
      sum += inner.val;
      inner = inner.next;
      if (sum === 0) {
        // outer -> inner 的节点都要删除
        outer.next = inner;
        sum = 0; //返回
      }
    }
    // outer 也需要不断遍历到 tail
    outer = outer.next;
    // 每一次遍历时，临时总和要重置
    sum = 0;
  }
  return emptyNode.next;
};
