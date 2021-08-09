/*
 * @Author: your name
 * @Date: 2021-08-09 08:22:24
 * @LastEditTime: 2021-08-09 08:42:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/1.面试题 02.05. 链表求和.js
 */

// 面试题 02.05. 链表求和

/**
 * @分析
 * 1. 这里的返回值是按照十进制计算后的 `链表`
 */
var addTwoNumbers = function (l1, l2) {
  const emptyNode = new ListNode();
  let current = emptyNode;
  let isUpper = 0; // 是否满10，为后面的位+1
  while (l1 && l2) {
    let sum = l1.val + l2.val + isUpper;
    if (sum >= 10) {
      isUpper = 1;
      sum = sum % 10;
    } else {
      isUpper = 0;
    }
    current.next = new ListNode(sum);
    current = current.next;
    l1 = l1.next;
    l2 = l2.next;
  }
  let l3 = l1 || l2; //剩余的那个链表
  while (l3) {
    let sum = l3.val + isUpper;
    if (sum >= 10) {
      isUpper = 1;
      sum = sum % 10;
    } else {
      isUpper = 0;
    }
    current.next = new ListNode(sum);
    current = current.next;
    l3 = l3.next;
  }
  if (isUpper) {
    // 遍历完了，如果还有进位
    current.next = new ListNode(isUpper);
    current = current.next;
  }
  return emptyNode.next;
};
