// 1721. 交换链表中的节点
// https://leetcode-cn.com/problems/swapping-nodes-in-a-linked-list/

/**
 * @分析
 * 1. 使用快慢指针求出两个节点 
 */
var swapNodes = function(head, k) {
    if(!head || !head.next) return head
    let emptyNode = new ListNode()
    emptyNode.next = head
    let fast = slow = emptyNode
    while(k--){
        // 先走 k 步，正向求得节点
        fast = fast.next
    }
    // 这个时候的 fast 节点就是正数第k个节点
    let temp = fast
    while(fast){
        fast =fast.next
        slow = slow.next
    }
    // 这个时候的 slow 节点就是反数第k个节点
    // 由于只是值交换，所以直接改变值算了
    let val = slow.val
    slow.val =  temp.val
    temp.val  = val
    return emptyNode.next
};