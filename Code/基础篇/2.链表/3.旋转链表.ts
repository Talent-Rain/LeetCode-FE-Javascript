// 61. 旋转链表
// https://leetcode-cn.com/problems/rotate-list/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val;
    this.next = next;
  }
}
/**
 * @分析
 * 1. k 可能会比head 长，所以实际移动的是 k%len，其中 len 是链表的长度
 * 2.
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head) return head;
  let len = 0,
    temp = head;

  while (temp) {
    len++;
    temp = temp.next;
  }
  k %= len; // 实际要移动的长度

  let emptyNode = new ListNode();
  emptyNode.next = head;
  let prev = head;
  // 双指针求出移动后k+1那一段
  while (head && head.next) {
    if (k) {
      k--;
    } else {
      prev = prev.next;
    }
    head = head.next;
  }
  head.next = emptyNode.next;
  //   这个时候 prev.next 就是旋转后的投，prev 就是尾
  // 但是现在原始链表的头和尾还没有链接起来
  const res = prev.next;
  prev.next = null;

  return res;
}
