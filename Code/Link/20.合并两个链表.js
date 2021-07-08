// 1669. 合并两个链表
// https://leetcode-cn.com/problems/merge-in-between-linked-lists/

/**
 * @分析
 * 1. 因为可能会删除到 head 节点，所以需要安全守卫
 * 2. 这里head 节点被认为是第 0 个节点，
 * 3. 所以这里也没必要设置 emptyNode 了，因为前提条件不允许删除头节点 list1
 * 
 */
var mergeInBetween = function(list1, a, b, list2) {
    let temp = 1
    let prev = list1
    let cur = list1.next
    while(temp<a){
        temp++
        prev=prev.next
        cur = cur.next
    }
    let left = prev
    while(temp<b){
        temp++
        prev=prev.next
        cur = cur.next
    }
    let right = cur.next
    left.next = list2
    while(list2 && list2.next){
        list2 = list2.next
    }
    list2.next = right
    return list1
};