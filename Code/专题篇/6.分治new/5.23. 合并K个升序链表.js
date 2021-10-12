// 23. 合并K个升序链表
// https://leetcode-cn.com/problems/merge-k-sorted-lists/

/**
 * @分析 -- 分治
 * 1. 合并 k 个链表不好合并，合并2个链表就比较简单了；
 * 2. 这里每一次合并两个链表
 * 3. 合并两个链表为 1 个，然后不断的迭代，最后得到一个
 * 4. 最后超时了，时间复杂度是 ${NM}$ 其中 N 是链表数组的长度，M是链表的平均长度
 */
var mergeKLists = function (lists) {
  if (!lists.length) return new ListNode().next;
  return lists.reduce((prev, cur) => mergeTwoList(prev, cur));
};

/**
 * @分析 -- 分治
 * 1. 合并 k 个链表不好合并，合并2个链表就比较简单了；
 * 2. 先分: 按照长度进行二分拆分,只要超过 2 个链表就继续往下拆分，直到为 1 个的时候，再治理
 * 3. 再治: 当进行二分拆分后，再组合起来，迭代到最后得到两个有序的数组，然后得到了一个完整的链表
 * 4. 使用分治而不是迭代合并，可以使得合并的次数从 n 次 降低到了 logn， 时间复杂度为 ${MlogN}$ 其中 M 为合并两个链表的长度，n 是链表数组的长度
 */
 var mergeKLists = function (lists) {
    const len = lists.length;
    if (!len) return null
    if (len === 1) return lists[0];
    if(len === 2) return mergeTwoList(lists[0],lists[1])
    const mid = len >> 1;
    return mergeTwoList(
      mergeKLists(lists.slice(0, mid)),
      mergeKLists(lists.slice(mid))
    );
  };
  
  // 合并两个有序链表
  const mergeTwoList = (l1, l2) => {
    let temp1 = l1,
      temp2 = l2;
    let emptyNode = (current = new ListNode());
    while (temp1 && temp2) {
      if (temp1.val > temp2.val) {
        current.next = temp2;
        temp2 = temp2.next;
      } else {
        current.next = temp1;
        temp1 = temp1.next;
      }
      current = current.next;
    }
    while (temp1) {
      current.next = temp1;
      current = current.next;
      temp1 = temp1.next;
    }
    while (temp2) {
      current.next = temp2;
      current = current.next;
      temp2 = temp2.next;
    }
    return emptyNode.next;
  };
  