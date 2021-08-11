/*
 * @Author: your name
 * @Date: 2021-08-11 09:16:58
 * @LastEditTime: 2021-08-11 09:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/9.147. 对链表进行插入排序.js
 */

// 147. 对链表进行插入排序

/**
 * @分析
 * 1. 编辑读写指针，write 指针前是排好序的链表，即它的是前面链表的最大值
 * 2. read 指针遇到比 write 指针值大于等于的节点，则 write 指针跟着移动；遇到小于 read 的指针，删除节点并在 write 指针前找到一个合适的位置插入
 * 3. 时间复杂度 ${O(nlogn)}$
 */
 var insertionSortList = function(head) {
    if(!head || !head.next) return head
    let emptyNode  = new ListNode()
    emptyNode.next = head
    let write  = head, read = head.next
    while(read){
        if(read.val >= write.val){
            // 读指针比写指针更大的时候，一起走
            read = read.next
            write = write.next
        }else{
            // 删除 read 指针，然后从 emptyNode 到 write 中找个位置插入
            // 先删除 -- 这个时候 read 指针先当做一个普通节点使用,注意: write 指针其实一直都在 read 之后，和 prev 指针的作用差不多
            write.next = read.next
            let em = emptyNode
            while(em.next.val<read.val){
              em =em.next
            }
            // 插入 em.next >= read.val , 所有插入到 em - read - em.next
            read.next = em.next
            em.next = read
            // 把 read 指针放回到 write 之后，再继续走 -- 这里当然可以用临时遍历处理，但是
            read = write.next
        }
    }
    return emptyNode.next
};