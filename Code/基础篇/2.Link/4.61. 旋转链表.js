/*
 * @Author: your name
 * @Date: 2021-08-10 07:54:41
 * @LastEditTime: 2021-08-10 10:02:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/4.61. 旋转链表.js
 */

// 61. 旋转链表

/**
 * @分析
 * 1. 从链表尾部阶段 k 长度，拼在前面即可 -- 其中 k = (K %len) ，如果移动了 len 的位置，就又回到了原来的位置了
 * 2.
 */
var rotateRight = function (head, k) {
  // 先求链表的长度
  let len = 0,
    tempNode = head;
  while (tempNode) {
    len++;
    tempNode = tempNode.next;
  }
  // 需要位移 size 到头节点
  let size = len - (k % len);
  let prev = new ListNode();
  prev.next = head;
  let cur = head;
  while (size--) {
    cur = cur.next;
    prev = prev.next;
  }
  //保存移动之后的尾部节点
  let tail = prev;

  // 继续往前走
  while (cur) {
    cur = cur.next;
    prev = prev.next;
  }
  // 原来的尾结点和头节点相连
  prev.next = head;
  //   获取移动后的头节点
  const next = tail.next;
  //   尾结点的 next 指针指向的是 null
  tail.next = null;
  return next;
};
