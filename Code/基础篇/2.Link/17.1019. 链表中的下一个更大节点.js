/*
 * @Author: your name
 * @Date: 2021-08-14 07:30:16
 * @LastEditTime: 2021-08-14 07:49:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/17.1171. 从链表中删去总和值为零的连续节点.js
 */

// 1019. 链表中的下一个更大节点

/**
 * @分析 -- 双指针
 * 1. 写指针 w 遍历整个链表，读指针 r 找到第一个比当前 w 大的节点，并返回对应的值，如果 r 走完整个链表没找到，则返回 0
 * 2. 时间复杂度 ${O(n^2)}$
 */
 var nextLargerNodes = function(head) {
    if(!head) return []
    let ret = []
    while(head){
        let r = head.next
        let temp = 0
        while(r){
            if(r.val > head.val){
                temp = r.val
                break 
            }
            r = r.next
        }
        ret.push(temp)
        head = head.next
    }
    return ret
};
