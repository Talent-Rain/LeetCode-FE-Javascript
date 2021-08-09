<!--
 * @Author: your name
 * @Date: 2021-08-09 08:42:44
 * @LastEditTime: 2021-08-09 09:41:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/README.md
-->

## [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/)
分析
1. 注意保护好下一个节点 next
2. 然后不断维护上一个节点和当前阶段，不断往后推即可
```javascript
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
```

## [面试题 02.05. 链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/solution/zheng-fan-xiang-liang-shu-xiang-jia-by-j-ghkw/)

分析
1. 这题是头对齐，[445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/submissions/) 是尾对齐，对于头对齐而已，链表比较容易进行进位后直接构建成链表。
2. 当两个链表都存在的时候，共有三个值需要相加，分别是 l1.val + l2.val + isUpper
3. 当其中一个链表走完了，就只剩下一个链表和isUpper, 需要注意的是，我们不知道哪个链表更长，所以需要判断一下
4. 链表遍历完了，还要判断一下 isUpper 是否还有，还有就得再进一个节点
5. 反转的数据结构就是 ${O(n+m)}$

```javascript

/**
 * @分析
 * 1. 这里的返回值是按照十进制计算后的 `链表`
 */
var addTwoNumbers = function (l1, l2) {
  const emptyNode = new ListNode();
  let current = emptyNode
  let isUpper = 0; // 是否满10，为后面的位+1
  while (l1 && l2) {
    let sum = l1.val + l2.val + isUpper;
    if (sum >= 10) {
      isUpper = 1;
      sum = sum % 10;
    } else {
      isUpper = 0;
    }
    current.next = new ListNode(sum)
    current = current.next
    l1 = l1.next;
    l2 = l2.next;
  }
  let l3 = l1 || l2 //剩余的那个链表
  while (l3) {
    let sum = l3.val + isUpper;
    if (sum >= 10) {
      isUpper = 1;
      sum = sum % 10;
    } else {
      isUpper = 0;
    }
    current.next = new ListNode(sum)
    current = current.next
    l3 = l3.next;
  }
  if(isUpper) {
    // 遍历完了，如果还有进位
    current.next = new ListNode(isUpper)
    current = current.next
  }
  return emptyNode.next;
};

```

## [445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/wei-dui-qi-lian-biao-qiu-he-by-jzsq_lyx-3ha7/)
分析
1. 这题是尾对齐，[面试题 02.05. 链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/submissions/) 是头对齐，对于头对齐而已，链表比较容易进行进位后直接构建成链表。
2. 所以这题先把两个链表反转，然后用[面试题 02.05. 链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/submissions/) 方式组合完，再反转回去即可
3. 当然我们可以用数组或其他额外的数据结构来保存两数之和，最后再统一处理，但是因为是链表专题，所以除了不用额外的数据结构处理
4. 反转的数据结构就是 ${O(n+m)}$

```javascript
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

```