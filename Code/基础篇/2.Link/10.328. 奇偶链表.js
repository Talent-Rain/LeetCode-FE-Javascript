/*
 * @Author: your name
 * @Date: 2021-08-12 08:07:45
 * @LastEditTime: 2021-08-12 08:31:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/10.328. 奇偶链表.js
 */

// 328. 奇偶链表

/**
 * @分析
 * 1. 这里的奇偶性是排序奇偶性，类比数组的下标的奇偶性，而并非是值的奇偶性
 * 2. 原地转移且要保持奇偶节点的相对顺序，也就是不能直接将奇偶节点交换位置，只能插入： 1-2-3-4-5 只能是 1-3-5-2-4 而不能是 1-3-5-4-2
 * 3. 仍然使用快慢指针，快指针从初始位置启动，每次走 2 步，也就是说 fast 指针指向奇数节点，slow 指针指向匹配好全奇的尾结点
 * 4. 每次将 fast 节点删除，然后插入到 slow 节点之后，由于整体长度是不变的，所以 fast 节点删除后要保持在奇数位置，就得设在临时的 prev 节点上
 */
 var oddEvenList = function(head) {
    if(!head || !head.next) return head // 两个节点都没得，直接回家吧
    let emptyNode = new ListNode()
    emptyNode.next = head
    let fast = slow = head
    while(fast && fast.next){
        // 这是fast的前一个节点，用来删除 fast 节点 -- 同时作为在前面插入删除节点后，重新锚点的位置
        const prev = fast.next
        fast = fast.next.next
        if(fast) {
            // 删除 fast 节点
            prev.next = fast.next
            fast.next =   slow.next
            slow.next = fast
            slow = slow.next
            // 恢复 fast
            fast = prev
        }
    }
    return emptyNode.next
};