/*
 * @Author: your name
 * @Date: 2021-09-10 09:16:48
 * @LastEditTime: 2021-09-10 09:55:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/快慢指针/2.287. 寻找重复数.js
 */
// 287. 寻找重复数


/**
 * @分析 -- 双指针法（快慢指针）
 * 1. 审题: 只有一个重复的整数，而这个重复的整数的出现次数不确定
 * 2. 可以用 map 用空间换时间，也可以排序之后直接找，但是这样都不符合题意
 * 3. 之前在二分法 tab 中做了一次: [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-by-jzsq_lyx-5lbc/)
 * 4. 这道题是可以用快慢指针做的，就是将数组中的值当成是指向数组下标的指针，然后将整个数组转成链表；而题目就转成了，一直一个环形链表（有重复的值，也就是在链表中有重复指向的指针），求环的入口；
 * 5. 参考寻找环形链表的入口 -- [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-mou-xie-te-shu-shu-xue-a9vm/)
 * 6. 时间复杂度 ${O(N)}$
 */
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

