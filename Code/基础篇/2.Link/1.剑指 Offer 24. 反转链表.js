/*
 * @Author: your name
 * @Date: 2021-08-09 09:19:10
 * @LastEditTime: 2021-08-09 09:42:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/1.剑指 Offer 24. 反转链表.js
 */

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