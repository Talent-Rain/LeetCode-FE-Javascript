/*
 * @Author: your name
 * @Date: 2021-08-10 09:27:24
 * @LastEditTime: 2021-08-10 09:51:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/7.109. 有序链表转换二叉搜索树.js
 */

// 109. 有序链表转换二叉搜索树

/**
 * @分析
 * 1. 这里说的高度平衡，说人话其实就是尽可能平均的将节点分配到左右子树中，那么找出中间节点，然后平分到左右节点树就是比较合适的解
 * 2. 这种设置节点然后最后成树的操作，使用自底向上的思路就很合适，不断二分切割链表，知道只有一个节点的时候就作为叶子节点，然后返回去
 * 3. 这里使用快慢指针找到中间节点 slow ， 注意这个节点是向上取中点的，所以就是当前节点的值，然后将前面一段链表分给左树，右边一段链表分给右树
 * 4. 这里用到了 BST 中左树节点永远小于根节点小于右侧节点的特性，以及本轮链表就是单增链表的特性
 * 5. 时间复杂度 ${O(N)}$ 还是相当于遍历一个完整的链表
 */
 var sortedListToBST = function(head) {

    const recursion = (head) => {
        if(!head) return null // 空节点
        // 使用双指针找出中间节点 -- 这是向上取整
        let emptyNode = prev = new ListNode()
        prev.next = head
        let slow = fast = head
        while(fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
            prev = prev.next
        }
        // 以 slow 为根节点，左侧一段离岸边要截断
        prev.next = null
        const node = new TreeNode(slow.val)
        node.left = recursion(emptyNode.next)
        node.right = recursion(slow.next)
        return node
    }
    return recursion(head)
};