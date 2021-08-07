/*
 * @Author: your name
 * @Date: 2021-08-03 08:07:09
 * @LastEditTime: 2021-08-05 09:09:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/困难题 -- 6/3.124. 二叉树中的最大路径和.js
 */

// 124. 二叉树中的最大路径和

/**
 * @分析
 * 1. 求以某个节点最根节点的最大路径和，和以这个节点为截止点的最大路径和，是两个不一样的值
 * 2. 前者根节点是路径中的一环，如果 l -> root -> r
 * 3. 而后者是作为子树的最大单边路径和，返回给父节点，让父节点进行判断，如 l(e) -> root
 * 4. 所以整体来说就是一个递归过程，但是在递归的过程中又存在局部最优解需要保存；
 * 5. 每一次的递归的最大值是包含`根节点`的最大值，这样可以保证衔接上左右子树的最大值，如果其中一课子树的最大值比这个大，那么在后面递归中自然会替代当前值，不需要额外处理
 */
var maxPathSum = function(root) {
    let max = -Infinity
    const dfs = root => {
        if(!root) return 0
        const l = dfs(root.left)
        const r = dfs(root.right)
        // 这里的 root.val 不需要和0比较，必须包含根节点，否则无法衔接
        // 同时单子树最大值如果更大，会在后面的 dfs 中取代 max
        const tempMax = Math.max(l,0)+Math.max(r,0)+root.val
        max =Math.max(max,tempMax) 
        return Math.max(0,l,r)+root.val // 这里的根节点是必须存在的，不然没法衔接上
    }
    dfs(root)
    return max
};