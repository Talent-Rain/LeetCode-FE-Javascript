// 面试题 02.04. 分割链表
// https://leetcode-cn.com/problems/partition-list-lcci/

/**
 * @分析
 * 1. 由于 x 节点不需要放在链表的中间做两侧的分割节点，那么难度降低
 * 2. 读写指针，当读到小于 x 的节点，删除，放在写指针后面即可
 * 3. 然后发现写指针也没用了，直接用出现小于 x 的节点就放在链表头就好了
 * 4. 需要注意 prev 和 write 指针要分开，在这里就是要和 emptyNode 分开，不然第一个节点就发生替换的时候，
 * 5. 前面 prev 刚删除 next 值，后面 write 在前面又写一个值出来，就会使得 prev 和 read 指针断裂了
 */
var partition = function(head, x) {
    if(!head) return null
    let emptyNode = new ListNode()
    emptyNode.next = head
    // 第一个值无论如何都不需要处理
    let prev = head
    let read = head.next
    while(read){
        if(read.val<x){
            let next = read.next
            // 将 read 插入最前面即可
            read.next = emptyNode.next
            emptyNode.next = read
            read = next
            prev.next=next // 删除节点
        }else{
            read = read.next
            prev = prev.next
        }
    }
    return emptyNode.next
};