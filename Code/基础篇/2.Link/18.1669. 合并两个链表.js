/*
 * @Author: your name
 * @Date: 2021-08-14 08:21:31
 * @LastEditTime: 2021-08-14 11:02:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/18.1669. 合并两个链表.js
 */

// 1669. 合并两个链表

/**
 * @分析
 * 1. 用 list2 来替换链表 a->b
 * 2. 需要注意，这里的 a 和 b 是下标为 a,b 的节点，第一个节点的坐标为0，可以类比数组的下标；
 * 3. 找出 a 的前缀节点 prev 和 b 的下一个节点 next，然后用 prev.next = list2, 遍历 list2 到 tail2, tail2.next = next 即可
 * 4. 这里 list1 和 list2 的长度已经做了限制，所以不需要做边界了
 * 5. 时间复杂度 ${O(n+m)}$
 */
var mergeInBetween = function (list1, a, b, list2) {
  const emptyNode = new ListNode();
  emptyNode.next = list1;
  let prev = (next = emptyNode);
  //这个时候 prev 和 next 都是空节点，而 list1 的 head 节点对应的 index 是0，所以初始化为 -1
  let index = -1;

  // 不取 = 的时候，得到的就是 下标为 b 的节点，
  while (index <= b) {
    if (index < a - 1) {
      // 这里是为了取下标为 a 节点的前一个节点 prev
      prev = prev.next;
    }
    next = next.next;
    index++;
  }
  // 这个时候 index 是b+1, 所以 next 是 b 的下一个节点
  // 插入 list2
  prev.next = list2;
  while (list2 && list2.next) {
    list2 = list2.next;
  }
  // 这个时候的 list2 已经到了 tail
  list2.next = next;
  return emptyNode.next;
};
