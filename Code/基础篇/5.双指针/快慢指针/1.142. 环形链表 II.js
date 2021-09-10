/*
 * @Author: your name
 * @Date: 2021-09-10 09:30:21
 * @LastEditTime: 2021-09-10 09:46:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/快慢指针/1.142. 环形链表 II.js
 */

// 142. 环形链表 II
// https://leetcode-cn.com/problems/linked-list-cycle-ii/


/**
 * @分析
 * 1. 典型的快慢指针写法，在链表专题写过相应的题解了
 * 2. [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-mou-xie-te-shu-shu-xue-a9vm/)
 * 
 */
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