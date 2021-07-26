// 面试题 02.08. 环路检测
// https://leetcode-cn.com/problems/linked-list-cycle-lcci/

/**
 * @分析
 * 1. 这里无环返回null
 * 2. 和 lc 另外一个题是一样的  https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/
 */
var detectCycle = function(head) {
    if(!head) return null
    let emptyNode = new ListNode()
    emptyNode.next = head
    let slow = head
    let fast = head.next 
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
        if(fast === slow){
            // 相遇了
            let temp = emptyNode
            while(slow !== temp){
                slow = slow.next
                temp = temp.next
            }
            return slow
        }
    }
    return null
};