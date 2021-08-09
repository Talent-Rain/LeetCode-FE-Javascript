/*
 * @Author: your name
 * @Date: 2021-08-09 08:45:06
 * @LastEditTime: 2021-08-09 09:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/2.445. 两数相加 II.js
 */

// 445. 两数相加 II

/**
 * 1. 两个链表相加，最后得到的还是一个链表
 */
 var addTwoNumbers = function(l1, l2) {

    const emptyNode = current = new ListNode()
    // 翻转量个链表，让他们头节点对齐
    let temp1 =  reverseList(l1)
    let temp2 =  reverseList(l2)

    let isUpper = 0; // 是否满10，为后面的位+1
    while (temp1 && temp2) {
      let sum = temp1.val + temp2.val + isUpper;
      if (sum >= 10) {
        isUpper = 1;
        sum = sum % 10;
      } else {
        isUpper = 0;
      }
      current.next = new ListNode(sum);
      current = current.next;
      temp1 = temp1.next;
      temp2 = temp2.next;
    }
    let l3 = temp1 || temp2; //剩余的那个链表
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

    return reverseList(emptyNode.next)

};

// 反转链表
var reverseList = function(head) {
    let prev = null
    while(head){
        const next = head.next
        head.next = prev
        prev = head
        head = next
    }
    return prev
};
