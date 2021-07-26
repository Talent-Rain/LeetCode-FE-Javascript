// 剑指 Offer 35. 复杂链表的复制
// https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/

/**
 * @分析
 * 1. 先用 map 保存所有的节点
 */
var copyRandomList = function (head) {
    if (!head) return null
    const map = new Map()
    let cur = head
    while (cur) {
        map.set(cur, new Node(cur.val)) // 保存的是一个新的节点，next 和 random 都是 null
        cur = cur.next
    }
    map.set(null,null)
    cur = head
    while (cur) {
        map.get(cur).next = map.get(cur.next) 
        map.get(cur).random = map.get(cur.random)
        cur = cur.next
    }
    return map.get(head)
};