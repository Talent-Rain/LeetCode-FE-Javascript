// 328. 奇偶链表
// https://leetcode-cn.com/problems/odd-even-linked-list/

var oddEvenList = function (head) {
    if (!head || !head.next) return head
    let prev = emptyNode = new ListNode()
    emptyNode.next = head
    let write = read = head
    while (read && read.next) {
        if (write === read) {
            read = read.next.next
            prev = prev.next.next
            continue
        }
        next = read.next.next
        // 删除节点
        prev.next = read.next
        // 插入节点
        read.next = write.next
        write.next = read
        write = write.next
        read = next
        prev =prev.next
    }
    if(read){
        // 最后一个节点了
        prev.next = null
        read.next = write.next
        write.next = read
    }
    return emptyNode.next
};