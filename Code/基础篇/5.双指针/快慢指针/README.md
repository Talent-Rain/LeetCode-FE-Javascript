<!--
 * @Author: your name
 * @Date: 2021-09-10 09:43:17
 * @LastEditTime: 2021-09-10 09:56:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/快慢指针/README.md
-->

### [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-mou-xie-te-shu-shu-xue-a9vm/)
分析
1. 典型的快慢指针写法，在链表专题写过相应的题解了
2. [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-mou-xie-te-shu-shu-xue-a9vm/)
3. 做一下这个题，是为了下一题的前置
```javascript
var detectCycle = function(head) {
    const emptyNode = new ListNode()
    emptyNode.next = head;
    if(!head) return null
    let slow  = fast = emptyNode
    while(fast && fast.next){
        slow = slow.next
        fast = fast.next.next
        if(slow === fast){
            // 相交了，证明相交了
            let next = emptyNode
            while(next!== slow){
                next = next.next
                slow = slow.next
            }
            // 相交的时候，就是环入口
            return slow
        }
    }
    return null
}
```

### [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/kuai-man-zhi-zhen-er-fen-fa-by-jzsq_lyx-xp0m/)
分析 -- 双指针法（快慢指针）
1. 审题: 只有一个重复的整数，而这个重复的整数的出现次数不确定
2. 可以用 map 用空间换时间，也可以排序之后直接找，但是这样都不符合题意
3. 之前在二分法 tab 中做了一次: [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-by-jzsq_lyx-5lbc/)
4. 这道题是可以用快慢指针做的，就是将数组中的值当成是指向数组下标的指针，然后将整个数组转成链表；而题目就转成了，一直一个环形链表（有重复的值，也就是在链表中有重复指向的指针），求环的入口；
5. 参考寻找环形链表的入口 -- [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-mou-xie-te-shu-shu-xue-a9vm/)
6. 时间复杂度 ${O(N)}$
```javascript
var findDuplicate = function (nums) {
    let slow = fast = 0 // 初始节点
    while(fast && nums[fast]){
        slow = nums[slow]
        fast = nums[nums[fast]]
        if(slow === fast){
            let next = 0
            while(next !== slow) {
                slow = nums[slow]
                next = nums[next]
            }
            return slow
        }
    }
}
```

分析
1. 给定长度为 n+1 的 nums，里面的值都是 1-n, 本题中只有一个值是重复的，找出这个值
2. 注意这里只是表明重复的只有一个值，但是这个值重复多少次并没有说明，所以不能用简单的异或二进制处理
3. 但是我们可以选定以 mid 值，然后判断小于等于 mid 值 count，如果 count 超出了 mid ，证明在 [1,mid] 中至少有一个值重复了，这个时候可以砍掉右侧部分
4. 当 left 和 right 相等之后，即找到了唯一重复的值，因为这个时候左右两侧的值都不服要求，就只有这个了
5. 时间复杂度 ${O(nlohn)}$, 空间复杂度 ${1}$
```javascript
var findDuplicate = function (nums) {
  let left = 1,
    right = nums.length - 1; // 值是 1 - n
    while (left < right) {
    const mid = ((right - left) >> 1) + left;
    const count = nums.reduce((prev, cur) => (cur <= mid ? prev + 1 : prev), 0); // 小于等于 count 的值
    if (count > mid) {
      // 如果 [1,mid] 这个数组满值的情况才只有 mid 个，现在 count 如果比这个还大，证明重复的值在这里面
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
```