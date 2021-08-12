/*
 * @Author: your name
 * @Date: 2021-08-12 08:37:03
 * @LastEditTime: 2021-08-12 10:00:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/11.1721. 交换链表中的节点.js
 */

// 1721. 交换链表中的节点

var swapNodes = function (head, k) {
  if (!head) return head;
  let emptyNode = new ListNode();
  emptyNode.next = head;
  let pFirst = emptyNode;
  let first = head;
  while (--k) {
    first = first.next;
    pFirst = pFirst.next;
  }
  // 现在 first 就是正向第 k 个节点,只需要保存

  let temp = first.next;
  let pSecond = emptyNode;
  let second = head;
  while (temp) {
    temp = temp.next;
    pSecond = pSecond.next;
    second = second.next;
  }
  // 这个时候 second 就是反向第 K 个节点

  if (first.next === second) {
    // 相邻节点交换
    pFirst.next = second;
    first.next = second.next;
    second.next = first;
  } else if (second.next === first) {
    // 相邻节点交换
    pSecond.next = first;
    second.next = first.next;
    first.next = second;
  } else {
    // 交换 first 和 second
    const fNext = first.next;
    const sNext = second.next;
    pFirst.next = second;
    pSecond.next = first;
    second.next = fNext;
    first.next = sNext;
  }

  return emptyNode.next;
};
