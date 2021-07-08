// 109. 有序链表转换二叉搜索树
// https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/


/**
 * @分析
 * 1. 没有做出用链表转二叉树的方法
 * 2. 链表 -> 数组 -> BST
 * 3. 根据 BST 的特性，求出中点作为根节点，数组左侧的值为左树，右侧的点位右树，递归下去即可
 */
var sortedListToBST = function (head) {
    const arr = []
    while (head) {
        arr.push(head.val)
        head = head.next
    }
    const recursion = (arr) => {
        if (!arr.length) return null
        const mid = Math.floor(arr.length / 2)
        const root = new TreeNode(arr[mid])
        root.left = recursion(arr.slice(0, mid))
        root.right = recursion(arr.slice(mid + 1))
        return root
    }
    return recursion(arr)
};