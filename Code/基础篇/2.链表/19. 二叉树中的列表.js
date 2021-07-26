// 1367. 二叉树中的列表
// https://leetcode-cn.com/problems/linked-list-in-binary-tree/


/**
 * @分析
 * 1. root 是自顶向下的，所以可以先求出 root 中所有和 head 第一个值相同的节点，一个一个的试
 * 2. 然后每一次找到合适的节点，都进入 recursion 递归判断是否符合条件
 */
var isSubPath = function(head, root) {
    let res = false
    const recursion = (cur,root) => {
        // 给定根节点和链表节点，判断是否存在存在
        if(!cur || res){
            res = true
            return 
        }
        if(!root || cur.val !== root.val) return
        // 证明此事 cur.val === root.val
        // 防止递归过程中，链表混乱
        let next = cur.next
        recursion(next,root.left)
        recursion(next,root.right)
    }

    const dfs = root => {
        if(!root || res) return 
        // 处理逻辑
        if(root.val === head.val){
            // 开始实现查找逻辑
            recursion(head,root)
        }
        dfs(root.left)
        dfs(root.right)
    }
    dfs(root)
    return res
};