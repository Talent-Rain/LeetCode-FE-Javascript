<!--
 * @Author: your name
 * @Date: 2021-08-09 08:42:44
 * @LastEditTime: 2021-08-14 07:28:35
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

> 注意：[面试题 02.04. 分割链表](https://leetcode-cn.com/problems/partition-list-lcci/) 这道题和本题类似，但是不保留每个分区的初始相对位置

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

## [328. 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/solution/kuai-man-zhi-zhen-by-jzsq_lyx-76r8/)
分析
1. 这里的奇偶性是排序奇偶性，类比数组的下标的奇偶性，而并非是值的奇偶性
2. 原地转移且要保持奇偶节点的相对顺序，也就是不能直接将奇偶节点交换位置，只能插入： 1-2-3-4-5 只能是 1-3-5-2-4 而不能是 1-3-5-4-2
3. 仍然使用快慢指针，快指针从初始位置启动，每次走 2 步，也就是说 fast 指针指向奇数节点，slow 指针指向匹配好全奇的尾结点
4. 每次将 fast 节点删除，然后插入到 slow 节点之后，由于整体长度是不变的，所以 fast 节点删除后要保持在奇数位置，就得设在临时的 prev 节点上
```javascript
 var oddEvenList = function(head) {
    if(!head || !head.next) return head // 两个节点都没得，直接回家吧
    let emptyNode = new ListNode()
    emptyNode.next = head
    let fast = slow = head
    while(fast && fast.next){
        // 这是fast的前一个节点，用来删除 fast 节点 -- 同时作为在前面插入删除节点后，重新锚点的位置
        const prev = fast.next
        fast = fast.next.next
        if(fast) {
            // 删除 fast 节点
            prev.next = fast.next
            fast.next =   slow.next
            slow.next = fast
            slow = slow.next
            // 恢复 fast
            fast = prev
        }
    }
    return emptyNode.next
};
```

## [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/shuang-zhi-zhen-qiu-xiang-deng-chang-du-o1rih/)

### 分析
1. 长度不一样的链表，肯定不会在起始节点就相交，这是必然，所谓相交链表，就是这个子链表是完全一样的，可以假设有 a,b,c 三个链表，然后 a,b 的尾结点同时指向 c, 即 aTail.next = c , bTail.next = c ，这个时候形成的新的链表 headA 和 headB 的相交链表就是 c
2. 需要注意的是， aTail 和 bTail 可能会存在值相等，但是实际缺不是一个节点的情况，但是在 LC 的链表序列化中以数组的形式存在，就会迷惑为什么不是在 aTail 这个节点就是相交节点，需要`特别注意`
3. 所以我们一起走两个链表，直到其中一个结束，找出可能剩下没走完的那个链表，就可以判断除 long 长链表和 short 短链表, 以及剩余未走的链表 tempC，如何让 long 和 tempC 一起走完，这个时候 long 和 short 长度就一致了，可以开始判断相交性

```javascript
var getIntersectionNode = function(headA, headB) {
    let tempA = headA, tempB = headB
    while(tempA && tempB){
        // 一起走
        tempA= tempA.next
        tempB= tempB.next
    }
    // tempC 是剩下的， long 是更长的链表
    if(tempA){
        tempC = tempA 
        long = headA
        short = headB
    }else{
        tempC = headB 
        long = headB
        short = headA 
    }
    // 将 long 多出来的节点先走完，得到和 short 相同长度的链表
    while(long){
        while(tempC){
            tempC= tempC.next
            long= long.next
        }
    }
    while(long){
        if(long === short) return long
        long =long.next
        short =short.next
    }
    return null
};

```

### 分析 -- 压缩一下
1. 原理基本是一致的，都是用临时变量分辨走 headA 和 headB， 然后判断是否存在相同的点，如果最后走完了还没有，则返回 null -- 目标就是实现两个长度相等的链表，再比较
2. 如果 headA 和 headB 长度一致，那么一开始就遍历两个链表，并找出是否相交，如果相交则跳出循环，返回相交节点；如果没有相交节点，则一起走到 null，也跳出循环，返回 null
3. 如果 headA 和 headB 长度不一致,那么就先一起遍历结束，短链表变量 A 切换到长链表 long，继续和剩下的原长链表多出的表走，直到长链表变量 B 切换到短链表 short，此时变量 A,B 对应的链表长度已经相等，继续遍历，然后进行步骤 2 的判断
4. 时间复杂度 ${O(n+m)}$
```javascript
var getIntersectionNode = function(headA, headB) {
    let tempA = headA, tempB = headB
    while(tempA!==tempB){
        tempA = tempA?tempA.next:headB
        tempB = tempB?tempB.next:headA
    }
    return tempA
}
```



## [1721. 交换链表中的节点](https://leetcode-cn.com/problems/swapping-nodes-in-a-linked-list/solution/shuang-zhi-zhen-qiu-jie-dian-shan-chu-ch-l4w5/)

分析
1. 先用双指针求出正序第k个节点 first 和反序第k个节点 second
2. 现在要交换 first 和 second ， 需要先判断他们两个节点是不是相邻，相邻节点可以直接处理
3. 如果不是相邻节点，那么就用删除插入的方法，将两个节点进行交换
4. 注意: 当 first 和 second 求到之后，直接将里面的 val 值修改，在 leetcode 上是可以走通的，但是这其实是不符合题意的，这就和[相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/shuang-zhi-zhen-qiu-xiang-deng-chang-du-o1rih/) 中的迷惑一样，为什么 a2 节点值明明一样，但是相交节点缺是 a3 是一样的；交换了值，但是节点在存储位置是不变的，所以真是节点并没有改变，这算是 LC 在这题中 ，边界设计有问题吧
5. 对于 JS 来说，我们一般可以用对象来模拟链表的节点，从这个方面看，每个节点都是单独的对象，里面有一个属性 val，我们声明了两个对象，val 是一样的，但是他们却是不同的对象，因为他们在内存中存储的位置是完全不一样的。

```javascript

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

```


## [725. 分隔链表](https://leetcode-cn.com/problems/split-linked-list-in-parts/solution/bao-li-qiu-chu-ge-ge-qie-ge-zi-chuan-by-44ddp/)

分析
1. 两个关键点，每一个部分尽可能平均，前面的链表长度大于后面的链表长度
2. 直接计算出链表长度，取除数可以得到最短长度 n，取余可以知道前面 m 个链表的长度要为 n+1
3. 再一次遍历链表，使用读写指针分割好，保存到数组中

```javascript
var splitListToParts = function(head, k) {
    if(!head) return new Array(k).fill(null) // 没有节点也要切，只是切成 k 份的 null
    let emptyNode = new ListNode
    emptyNode.next = head
    let temp = head
    let len = 0
    while(temp){
        len++;
        temp =temp.next
    }
    const n = Math.floor(len/k)
    let m = len % k // 前 m 个链表取 n+1 个值
    let write = read = head 
    let ret = []
    let other = k - m
    // 插入 m 个 n+1 的链表
    while(m--){
        let count = 0
        //前 m 个值,最少都还有一个值
        while(count < n){
            read = read.next
            count++
        } 
        // 此时 read 指针在切割指针的位置
        const next = read.next
        read.next = null //切割
        ret.push(write)
        write = next
        read = next
    }
    // 再插入 k-m 个 n 长度的链表
    while(other --){
        if(n === 0) {
            ret.push(null)
        }else{
            let count = 0
            while(count < n-1){
                read = read.next
                count++
            } 
            // 此时 read 指针在切割指针的位置
            const next = read.next
            read.next = null //切割
            ret.push(write)
            write = next
            read = next
        }
    }
    return ret

};
```

## [817. 链表组件](https://leetcode-cn.com/problems/linked-list-components/solution/zheng-chang-shi-bian-li-by-jzsq_lyx-puov/)

分析
1. 这里说明了 head 中的值都是唯一的，且 nums 中的值都是 haed 值中的子集，所以可以另开一个 [0,N-1] 的数组，将 nums 的值作为下标放进去
2. 这样就可以直接用数组下标判断head 中的值是否包含在 nums 中，且复杂度为 ${O(1)}$
3. 最后返回值是有多少个组件，也就是一旦断开链表，组件数量就加一
4. 时间复杂度 ${O(N)}$ ; 空间复杂度 ${O(N)}$
```javascript

var numComponents = function (head, nums) {
  const arr = [];
  for (let num of nums) {
    arr[num] = 1;
  }
  let len = nums.length;
  let ret = 0;
  let count = 0; //每一个组件的长度 -- 必须大于 1 才能组成一个组件
  while (head && len) {
    if (arr[head.val]) {
      // nums 的值在减少，一旦为 0 了，就结束遍历了
      count++; // 万一需要求最大组件，就可以用这个 count 了
      len--;
    }
    if (count && !arr[head.val]) {
      // 处于匹配状态，但是这一次却没有匹配值
      ret++;
      count = 0; // 恢复到 0, 继续下一次的匹配
    }
    head = head.next;
  }
  return count ? ret + 1 : ret; //弹出遍历时如果还存在有匹配的组件没计算，则再加1
};
```

## [707. 设计链表](https://leetcode-cn.com/problems/design-linked-list/solution/shu-zu-mo-ni-lian-biao-by-jzsq_lyx-gimw/)

分析
1. 既然是设计题，而且设计的是链表，那么自然而然想起与之相对应的数组，所以这里是用数组类模拟链表的
2. 这里设计了获取链表第 k 个值，添加头，添加尾，添加 index 位置的节点以及删除第 index 节点的 api
3. 按要求设计即可，注意边界即可；
```javascript
/**
 * @分析
 * 1. 这里是用数组来模拟链表
 */
var MyLinkedList = function () {
  this.data = [];
};

/**
 * @分析 -- 获取第 index 个节点的值
 * 1. 这里的 index 类比数组的下标值，是从 0 开始的，也就是 index 为 0 代表头节点
 * 2. 这里是获取第 index 个节点的值，如果没有这个 index，即 index 超出链表长度 len-1，返回 -1
 */
MyLinkedList.prototype.get = function (index) {
  const size = this.data.length;
  return index < size ? this.data[index] : -1;
};

/**
 * @分析 -- 从头部插入一个链表值
 */
MyLinkedList.prototype.addAtHead = function (val) {
    this.data.unshift(val)
};

/**
 * @分析 -- 从尾部插入一个链表值
 */
MyLinkedList.prototype.addAtTail = function (val) {
    this.data.push(val)
};

/**
 * @分析 -- 从 index 插入一个值
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    const len = this.data.length
    if(index<=len){
        if (index <= 0) {
            this.data.unshift(val)
        } else if (index === len) {
            this.data.push(val)
        } else{
            this.data.splice(index, 0, val) //在 index 节点删除 0 个值，并加入 val
        }
    }
};

/**
 * @分析 -- 删除第 index 个值
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    const len = this.data.length
    if(index>=0 && index<len){
        this.data.splice(index,1)
    }
};


```

## [1171. 从链表中删去总和值为零的连续节点](https://leetcode-cn.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/solution/shuang-lian-biao-zhi-zhen-bian-li-by-jzs-536b/)

分析 -- 暴力解法
1. 直接两个循环遍历链表，得到所有链表组合的和，遇到 0 的，刷新外层指针的 next ，达到删除的效果
2. 类比于数组，相当于将数组中和为0的连续子数组删除，得到剩下的数组，所以可以开两个循环，动态获取数组的长度，一旦遇到符合要求的数组，就删除，直到外层遍历结束为止
3. 画图会比较容易看到，值得注意的是，一定要有一个指针 outer 从 head -> tail , 然后每一次都有临时指针 inner 从 outer.next 开始走到 tail
4. 最差就不需要删除，所以要走 1+2+3+...n = ${O(N^2)}$

```javascript
var removeZeroSumSublists = function (head) {
  let emptyNode = new ListNode();
  emptyNode.next = head;
  let sum = 0;
  let outer = emptyNode;
  while (outer) {
    let inner = outer.next;
    while (inner) {
      // 每次都由 inner 来判断是否要删除相应的链表
      // outer 相当于是外围的一个 prev 指针，一旦某一个链表需要删除，直接 outer.next = 删除节点的下一个节点 即可
      sum += inner.val;
      inner = inner.next;
      if (sum === 0) {
        // outer -> inner 的节点都要删除
        outer.next = inner;
        sum = 0; //返回
      }
    }
    // outer 也需要不断遍历到 tail
    outer = outer.next;
    // 每一次遍历时，临时总和要重置
    sum = 0;
  }
  return emptyNode.next;
};

```