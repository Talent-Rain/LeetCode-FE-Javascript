/*
 * @Author: your name
 * @Date: 2021-08-11 08:51:16
 * @LastEditTime: 2021-08-11 09:48:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/8.142. 环形链表 II.js
 */

// 142. 环形链表 II

/**
 * @分析
 * 1. 相比于 [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/) 不但要判断是否有环，还得算出入环的那个节点
 * 2. 这里进行的一系列计算，都必须保证起点是一样的，这样才能保证走出来的路径长度是适合的。
 * 3. 画图可得，
 */
var detectCycle = function(head) {
    if(!head) return null //一个节点都没得，还有啥环 
    const emptyNode = new ListNode()
    emptyNode.next = head
   let slow = fast = emptyNode // 相当于走了走了一次了
    while(fast && fast.next){
        // 一开始都是从边界守卫开始，这样可以防止在第一个节点就有环了
        slow = slow.next 
        fast = fast.next.next
        if(slow === fast){
            // 在环中的某一个点相交了
            let newSlow = emptyNode
            while(slow !== newSlow){
                newSlow = newSlow.next
                slow = slow.next
            }

            return newSlow
        }
    }
    return null //如果会跳出来，证明无环

};