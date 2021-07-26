// 1171. 从链表中删去总和值为零的连续节点
// https://leetcode-cn.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/


var removeZeroSumSublists = function (head) {
    if (!head) return head
    let emptyNode = prev = new ListNode
    emptyNode.next = head
    let cur = head
    let temp = 0
    while (cur) {
        temp += cur.val
        let read = cur.next
        while (read && temp !== 0) {
            temp += read.val
            read = read.next
        }
        if (temp === 0) {
            // read 已经是 next 节点了
            prev.next = read
            cur = read
        }else{
            // read 走完了，没啥发生
            prev = prev.next
            cur = cur.next
        }
        temp = 0
    }
    console.log(emptyNode)

    return emptyNode.next
};