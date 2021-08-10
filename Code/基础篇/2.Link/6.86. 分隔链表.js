/*
 * @Author: your name
 * @Date: 2021-08-10 09:11:16
 * @LastEditTime: 2021-08-10 09:24:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/6.86. 分隔链表.js
 */


// 86. 分隔链表

/**
 * @分析
 * 1. 遍历链表找出值大于等于 x 的第一个节点 K，然这个时候前面那些节点都不用动了，因为都是小于 x 的
 * 2. 然后从 K 开始找出小于 x 的节点，移动到 K-1 - K 之间的位置即可
 * 3. 由于存在插入和删除操作，所以需要用到 prev 指针和 cur 指针；由于可能存在第一个节点就是大于等于 x 的 K ，所以需要安全守卫 emptyNode
 * 4. 时间复杂度 ${O(N)}$
 */
var partition = function(head, x) {
    let emptyNode = prev = new ListNode()
    emptyNode.next = head
    while(head && head.val < x){
        head =head.next
        prev = prev.next
    }
    // 走完了，或者遇到了 K,保存一下这个前置节点
    let tail = prev

    // 这个时候找到小于 x 的就要处理了
    while(head){
        if(head.val<x){
            const next = head.next
            // 插入到 tail 和 tail.next 之间
            head.next = tail.next
            tail.next = head
            tail = tail.next
            // 删除 head 节点,重新设置新的 head
            prev.next = next
            head = next
        }else{
            head =head.next
            prev = prev.next
        }
    }
    return emptyNode.next
};