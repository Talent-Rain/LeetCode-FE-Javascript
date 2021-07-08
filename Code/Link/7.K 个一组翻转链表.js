// 25. K 个一组翻转链表
// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/


/**
 * @分析
 * 1. 先求出链表的长度，然后计算出要翻转多少次 count
 * 2. 每次给定翻转前节点 left=== prev 和开始翻转的头节点 head === cur
 * 3. 翻转后得到 4 个点，left, head, prev, cur, 将他们连接起来 left->prev, head -> cur
 * 4. 然后移动 prev 和 head 的位置，进行下一轮的反转，知道 count 变回 0
 */
var reverseKGroup = function (head, k) {
    let len = 0
    let temp = head
    while (temp) {
        len++
        temp = temp.next
    }
    let count = Math.floor(len / k)
    let emptyNode = prev = new ListNode()
    emptyNode.next = head
    while (count--) {
        let left = prev
        let cur = head
        let len = 0
        while (len < k) {
            let next = cur.next
            cur.next = prev
            prev = cur
            cur = next
            len++
        }
        // 这个时候 cur 是right 节点
        left.next = prev
        head.next = cur
        prev = head
        head = head.next
    }
    return emptyNode.next
};