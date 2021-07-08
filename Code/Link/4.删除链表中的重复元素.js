// 82. 删除排序链表中的重复元素 II
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/


/**
 * @分析
 * 1. 这个链表已经排序了，所以相同的值都在一起了
 * 2. 只要快慢指针的值相同，则进行读写操作
 */
var deleteDuplicates = function (head) {
    if (!head || !head.next) return head
    let emptyNode = prev = new ListNode()
    emptyNode.next = head
    let slow = head
    let fast = head.next
    let isDelete = false // 标志是否开启删除模式
    while (fast) {
        if(fast.val === slow.val){
            // 这个时候只有fast 走，同时开启删除模式
            isDelete = true
        }else{
            if(isDelete){
                // 删除模式
                prev.next = fast
                slow = fast
                isDelete = false
            }else{
                prev = prev.next
                slow = slow.next
            }
        }
        fast = fast.next
        
    }
    // 遍历完了，但是可能最后的那一段是需要删除的
    if(isDelete){
        // 删除模式
        prev.next = fast
    }
    return emptyNode.next

};