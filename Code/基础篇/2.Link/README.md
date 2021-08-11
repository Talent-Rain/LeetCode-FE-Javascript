<!--
 * @Author: your name
 * @Date: 2021-08-09 08:42:44
 * @LastEditTime: 2021-08-11 09:47:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/README.md
-->

## [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/)

分析

1. 注意保护好下一个节点 next
2. 然后不断维护上一个节点和当前阶段，不断往后推即可

```javascript
var reverseList = function (head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};
```

## [面试题 02.05. 链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/solution/zheng-fan-xiang-liang-shu-xiang-jia-by-j-ghkw/)

分析

1. 这题是头对齐，[445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/submissions/) 是尾对齐，对于头对齐而已，链表比较容易进行进位后直接构建成链表。
2. 当两个链表都存在的时候，共有三个值需要相加，分别是 l1.val + l2.val + isUpper
3. 当其中一个链表走完了，就只剩下一个链表和 isUpper, 需要注意的是，我们不知道哪个链表更长，所以需要判断一下
4. 链表遍历完了，还要判断一下 isUpper 是否还有，还有就得再进一个节点
5. 反转的数据结构就是 ${O(n+m)}$

```javascript
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
```

## [445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/wei-dui-qi-lian-biao-qiu-he-by-jzsq_lyx-3ha7/)

分析

1. 这题是尾对齐，[面试题 02.05. 链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/submissions/) 是头对齐，对于头对齐而已，链表比较容易进行进位后直接构建成链表。
2. 所以这题先把两个链表反转，然后用[面试题 02.05. 链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/submissions/) 方式组合完，再反转回去即可
3. 当然我们可以用数组或其他额外的数据结构来保存两数之和，最后再统一处理，但是因为是链表专题，所以除了不用额外的数据结构处理
4. 反转的数据结构就是 ${O(n+m)}$

```javascript
var addTwoNumbers = function (l1, l2) {
  const emptyNode = (current = new ListNode());
  // 翻转量个链表，让他们头节点对齐
  let temp1 = reverseList(l1);
  let temp2 = reverseList(l2);

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

  return reverseList(emptyNode.next);
};

// 反转链表
var reverseList = function (head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};
```

## [61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/solution/xuan-zhuan-lian-biao-by-jzsq_lyx-vrg3/)

分析：

1. 从链表尾部阶段 k 长度，拼在前面即可 -- 其中 k = (K %len) ，如果移动了 len 的位置，就又回到了原来的位置了
2. 需要注意的是一些边界条件，但是这里直接定义 prev 为安全守卫，一切需要保存或者拼接的节点都应用 prev 来处理，就可以避免 cur 为 null 的时候无法获取 next 指针的尴尬，因为 cur 是实际走的指针，prev 只是一个安全守卫，它始终是存在的。
3. 时间复杂度${O(N)}$

```javascript
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
```

## [82. 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/solution/shuang-zhi-zhen-shan-chu-zhong-fu-yuan-s-7rtn/)

分析

1. 删除已经排好序的链表的重复节点，最后返回一个新的链表
2. 需要注意的是，这里是删除所有重复的节点，而不是保留一个值，即 1-2-2-3 将重复的 2 节点全部删除，得到 1-3
3. 所以在遍历 head 的时候，需要分两种情况，一个是 head 的下一个节点有值且与 head 的值相等时，head 自己往下走，知道 head.next === null 或者 head.next.val !== head.val 为止
4. 如果是删除节点后，本次遍历需要重新整理 prev 节点和 head 节点
5. 如果是普通遍历，则正常走即可
6. 时间复杂度:${O(N)}$

```javascript
var deleteDuplicates = function (head) {
  let emptyNode = (prev = new ListNode());
  emptyNode.next = head;

  while (head) {
    while (head.next && head.val === head.next.val) {
      head = head.next;
    }
    if (prev.next !== head && head.val === prev.next.val) {
      // 这是遇到重复值时，删除节点后进行整理， prev.next 重新指向新的 head 节点
      head = head.next;
      // 重新连接起来
      prev.next = head;
    } else {
      // 这是正常没有重复值走
      prev = prev.next;
      head = head.next;
    }
  }
  return emptyNode.next;
};
```

## [86. 分隔链表](https://leetcode-cn.com/problems/partition-list/solution/cha-ru-he-shan-chu-lian-biao-jie-dian-by-oo1g/)

分析

1.  遍历链表找出值大于等于 x 的第一个节点 K，然这个时候前面那些节点都不用动了，因为都是小于 x 的
2.  然后从 K 开始找出小于 x 的节点，移动到 K-1 - K 之间的位置即可
3.  由于存在插入和删除操作，所以需要用到 prev 指针和 cur 指针；由于可能存在第一个节点就是大于等于 x 的 K ，所以需要安全守卫 emptyNode
4.  时间复杂度 ${O(N)}$

```javascript
var partition = function (head, x) {
  let emptyNode = (prev = new ListNode());
  emptyNode.next = head;
  while (head && head.val < x) {
    head = head.next;
    prev = prev.next;
  }
  // 走完了，或者遇到了 K,保存一下这个前置节点
  let tail = prev;

  // 这个时候找到小于 x 的就要处理了
  while (head) {
    if (head.val < x) {
      const next = head.next;
      // 插入到 tail 和 tail.next 之间
      head.next = tail.next;
      tail.next = head;
      tail = tail.next;
      // 删除 head 节点,重新设置新的 head
      prev.next = next;
      head = next;
    } else {
      head = head.next;
      prev = prev.next;
    }
  }
  return emptyNode.next;
};
```

## [109. 有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/kuai-man-zhi-zhen-zhao-zhong-jian-jie-di-wj50/)

分析

1.  这里说的高度平衡，说人话其实就是尽可能平均的将节点分配到左右子树中，那么找出中间节点，然后平分到左右节点树就是比较合适的解
2.  这种设置节点然后最后成树的操作，使用自底向上的思路就很合适，不断二分切割链表，知道只有一个节点的时候就作为叶子节点，然后返回去
3.  这里使用快慢指针找到中间节点 slow ， 注意这个节点是向上取中点的，所以就是当前节点的值，然后将前面一段链表分给左树，右边一段链表分给右树
4.  这里用到了 BST 中左树节点永远小于根节点小于右侧节点的特性，以及本轮链表就是单增链表的特性
5.  时间复杂度 ${O(N)}$ 还是相当于遍历一个完整的链表

```javascript
var sortedListToBST = function (head) {
  const recursion = (head) => {
    if (!head) return null; // 空节点
    // 使用双指针找出中间节点 -- 这是向上取整
    let emptyNode = (prev = new ListNode());
    prev.next = head;
    let slow = (fast = head);
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      prev = prev.next;
    }
    // 以 slow 为根节点，左侧一段离岸边要截断
    prev.next = null;
    const node = new TreeNode(slow.val);
    node.left = recursion(emptyNode.next);
    node.right = recursion(slow.next);
    return node;
  };
  return recursion(head);
};
```

## [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-mou-xie-te-shu-shu-xue-a9vm/)

分析

1. 相比于 [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/) 不但要判断是否有环，还得算出入环的那个节点
2. 这里进行的一系列计算，都必须保证起点是一样的，这样才能保证走出来的路径长度是适合的。
3. 画图可得，将起始点到环起点记作 l , 环长 r, 快慢指针相交的点距离环起点为 s, 由于快指针是慢指针速度的 2 倍,根据速度一定可以得到等式 s = (n-2m)r-l 其中 n,m 是快慢指针走的环的圈数量，这两个变量不重要，只需要表示他们分别走了 n, m 圈后相交了
4. 这个时候我们发现如果原来的慢指针继续走到环节点，需要走的路程是 (r-s) = (1-n+2m)r+l ;这个时候我们在起始点重新开启一个新的慢节点 newSlow, 让他们一起走一段路 l, 他们切好在起点相遇
5. 时间复杂度 ${O(N)}$

```javascript
var detectCycle = function (head) {
  if (!head) return null; //一个节点都没得，还有啥环
  const emptyNode = new ListNode();
  emptyNode.next = head;
  let slow = (fast = emptyNode); // 相当于走了走了一次了
  while (fast && fast.next) {
    // 一开始都是从边界守卫开始，这样可以防止在第一个节点就有环了
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // 在环中的某一个点相交了
      let newSlow = emptyNode;
      while (slow !== newSlow) {
        newSlow = newSlow.next;
        slow = slow.next;
      }

      return newSlow;
    }
  }
  return null; //如果会跳出来，证明无环
};
```

## [147. 对链表进行插入排序](https://leetcode-cn.com/problems/insertion-sort-list/solution/du-xie-zhi-zhen-cha-ru-pai-xu-by-jzsq_ly-sj9d/)

分析

1. 编辑读写指针，write 指针前是排好序的链表，即它的是前面链表的最大值
2. read 指针遇到比 write 指针值大于等于的节点，则 write 指针跟着移动；遇到小于 read 的指针，删除节点并在 write 指针前找到一个合适的位置插入
3. 时间复杂度 ${O(nlogn)}$

```javascript
var insertionSortList = function (head) {
  if (!head || !head.next) return head;
  let emptyNode = new ListNode();
  emptyNode.next = head;
  let write = head,
    read = head.next;
  while (read) {
    if (read.val >= write.val) {
      // 读指针比写指针更大的时候，一起走
      read = read.next;
      write = write.next;
    } else {
      // 删除 read 指针，然后从 emptyNode 到 write 中找个位置插入
      // 先删除 -- 这个时候 read 指针先当做一个普通节点使用,注意: write 指针其实一直都在 read 之后，和 prev 指针的作用差不多
      write.next = read.next;
      let em = emptyNode;
      while (em.next.val < read.val) {
        em = em.next;
      }
      // 插入 em.next >= read.val , 所有插入到 em - read - em.next
      read.next = em.next;
      em.next = read;
      // 把 read 指针放回到 write 之后，再继续走 -- 这里当然可以用临时遍历处理，但是
      read = write.next;
    }
  }
  return emptyNode.next;
};
```
