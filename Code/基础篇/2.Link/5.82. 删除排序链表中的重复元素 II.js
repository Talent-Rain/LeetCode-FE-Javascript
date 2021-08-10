/*
 * @Author: your name
 * @Date: 2021-08-10 08:29:29
 * @LastEditTime: 2021-08-10 09:07:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/5.82. 删除排序链表中的重复元素 II.js
 */

// 82. 删除排序链表中的重复元素 II

/**
 * @分析
 * 1. 删除已经排好序的链表的重复节点，最后返回一个新的链表
 * 2. 需要注意的是，这里是删除所有重复的节点，而不是保留一个值，即 1-2-2-3 将重复的 2 节点全部删除，得到 1-3
 */
var deleteDuplicates = function(head) {
    let emptyNode = prev  = new ListNode()
    emptyNode.next = head

    while(head){
        while(head.next && head.val === head.next.val){
            head = head.next
        }
        if(prev.next !== head && head.val === prev.next.val) {
            // 如果还和重合时的那个值相等，则还要走一步
            head = head.next
            // 重新连接起来
            prev.next = head
        }else{
            // 这是正常没有重复值走
            prev = prev.next
            head = head.next
        }
    }
    return emptyNode.next
};