/*
 * @Author: your name
 * @Date: 2021-08-14 09:00:57
 * @LastEditTime: 2021-08-14 14:09:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/19.剑指 Offer 35. 复杂链表的复制.js
 */

// 剑指 Offer 35. 复杂链表的复制

/**
 * @分析
 * 1. 因为要复制一个链表，所以所有 head 上节点其实都已经不能使用了，需要重新创建新的 Node 节点，然后对应的 next 和 random 也需要是新的节点，而不是 head 已经保存好的。
 * 2. 因为新的节点 next 指针指向的节点还没创建，对应的 random 节点无法确定，所以使用 map 先保存一份单个值的节点，其中 key 是旧的 Node 节点，value 是新创建的节点
 * 3. 然后再遍历 head 链表，找到就节点的复制节点，，为它指向新的 next 和 random 
 */
var copyRandomList = function(head) {
    if(!head) return head
    const map = new WeakMap()
    let temp =head
    while(temp){
        // key 是旧节点，value 保存一个新的节点
        map.set(temp,new Node(temp.val)) 
        temp = temp.next
    }
    // 开始复制
    temp = head
    while(temp){
        const node = map.get(temp) //这个是一个新的节点，它的 next 和 random 也要是新的，存在 map 中
        node.next = map.get(temp.next)
        node.random = map.get(temp.random)
        temp = temp.next
    }
    return map.get(head)
};