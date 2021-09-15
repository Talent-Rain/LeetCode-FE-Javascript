<!--
 * @Author: your name
 * @Date: 2021-09-10 09:43:17
 * @LastEditTime: 2021-09-15 09:15:24
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

### [80. 删除有序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

> 读写指针也算是快慢指针的一种，读指针一般会先走，触发某种条件之后，才会移动写指针

分析 -- 读写指针
1. 给定的数组是排好序的，然后需要删除多余节点，使得最多出现 2次
2. 设置读写指针 read 和 write, 遍历的每一步中，读写指针都指向相同的值，但是指向的下标可能不一样
3. 当相同的值超过了2， 即 [left,right] 的长度超出 2， 则原地删除 right 指针指向的值 
4. 时间复杂度 ${O(n)}$
```javascript

 var removeDuplicates = function(nums) {
    let write = read = 0
    while(read <nums.length){
        while(nums[write] === nums[read] && read <nums.length ){
            if(right-left+1 > 2){
                nums.splice(read,1) //删除读指针当前的下标
            } else{
                read++
            }
        }
        // 一轮相同值走完，写指针和读指针指向同一个值
        write = read
    }
};
```

### [202. 快乐数](https://leetcode-cn.com/problems/happy-number/solution/yong-sethuan-cun-shi-yong-shuang-zhi-zhe-vu88/)

分析
1. 这里盲猜是用迭代的写法来求，因为没次按要求改造一个 ret，如果不符合成功或者失败要求，就会继续迭代下去
2. 因为是不断按十进制位取平方求和，所以截止条件应该是符合要求，得到的和 sum === 1
3. 如果不符合条件，肯定就是遭遇到循环了，这里用 set 缓存所有迭代过程中的 ret，只有迭代过程中再次出现 set 中的值，就是导致循环了，直接返回false 即可
4. 时间复杂度,这个不太会求，但是会需要 set 来缓存数据
```javascript
var isHappy = function (n) {
    const set = new Set()
    let result
    const dfs = n => {
        let ret = 0;
        while (n) {
          ret += Math.pow(n % 10, 2);
          n = Math.floor(n / 10);
        }
        if(ret === 1)  {
            result = true
            return 
        }
        if(set.has(ret)){
            result = false
            return 
        }
        set.add(ret)
        // 迭代写法，如果用 return 就是递归的写法了
        dfs(ret);
    }
    dfs(n)
    return result

};
```

分析
1. 这是快慢指针专题，所以其实可以用快慢指针是否有环来处理
2. 所以迭代的过程就和链表的 next 是差不多的，如果出现环，则返回 false，如果出现值 1，则返回 true
3. 这样就不需要额外的 set 去缓存值了
```javascript
var isHappy = function (n) {
    function getNext(n) {
        let ret = 0;
        while (n) {
          ret += Math.pow(n % 10, 2);
          n = Math.floor(n / 10);
        }
        return ret
    }
    let s = f = n // 初始化的值都是 n
    while(f !== 1 && getNext(f) !== 1){
        s = getNext(s)
        f = getNext(getNext(f))
        if(s === f) return false
    }
    return true
}
```