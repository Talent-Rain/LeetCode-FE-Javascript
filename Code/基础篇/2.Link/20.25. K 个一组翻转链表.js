/*
 * @Author: your name
 * @Date: 2021-08-14 09:55:43
 * @LastEditTime: 2021-08-14 11:02:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/20.25. K 个一组翻转链表.js
 */

// 25. K 个一组翻转链表

/**
 * @分析
 * 1. 既然是翻转，肯定是需要用到空节点;
 * 2. 一次遍历，计算链表长度，看看需要翻转多少次
 * 3. 因为需要翻转多次，每一次翻转需要用到的变量: 
 *  1. outerPrev -- 每一次翻转前一个节点，用来和翻转后的头节点连接
 *  2. cur 表示的翻转链表时当前节点，prev 是遍历到的前一个节点
 *  3. step 表示翻转了多少次，由于初始化时 cur 是第一个节点，所以可以翻转 k 次；
 * 4. 翻转结束后，cur 表示下一次翻转的头节点，prev 是翻转后的头节点，tempHead 是保存起来的翻转前头节点，现在是翻转后的尾节点，也是下一轮翻转的前一个节点；所以将他们连接起来： outerPrev.next = prev，tempHead.next = cur;
 * 5. 更新一下 outerPrev
 * 6.时间复杂度 ${O(N)}$
 */
var reverseKGroup = function (head, k) {
  if (!head.next || k < 2) return head;
  const emptyNode = new ListNode();
  emptyNode.next = head;
  let len = 0;
  let cur = head;
  while (cur) {
    len++;
    cur = cur.next;
  }
  let count = Math.floor(len / k); //需要翻转的次数
  cur = head;
  let outerPrev = emptyNode; //每次翻转链表的前一个节点
  while (count--) {
    let tempHead = cur; // 翻转链表的临时链表头
    let prev = outerPrev;
    let step = 0; //每一次翻转走的步数
    while (step < k) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
      step++;
    }
    // 翻转好了，外部prev 和翻转后的头节点相连
    outerPrev.next = prev;
    tempHead.next = cur;
    // 更新外部prev 为临时头节点
    outerPrev = tempHead;
  }
  return emptyNode.next;
};
