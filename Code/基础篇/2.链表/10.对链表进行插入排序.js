// 147. 对链表进行插入排序
// https://leetcode-cn.com/problems/insertion-sort-list/


var insertionSortList = function(head) {
    if(!head || !head.next) return head
    let  emptyNode = new ListNode()
    emptyNode.next = head
    let  write = head
    let read =write.next
    while(read){
        if(read.val<write.val){
            // 先删除
            let next = read.next
            write.next = next

            // 从empty指针开始，查找要插入的位置
            let prev = emptyNode
            let temp = emptyNode.next
            while(temp.val<=read.val){
                temp = temp.next
                prev = prev.next
            }
            // 插入到 temp 之前
            prev.next = read
            read.next = temp
            read = next
        }else{
            read = read.next
            write=write.next
        }
    }
    return emptyNode.next
};