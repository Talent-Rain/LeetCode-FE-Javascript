/*
 * @Author: your name
 * @Date: 2021-08-03 09:03:33
 * @LastEditTime: 2021-08-06 08:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/11.814. 二叉树剪枝.js
 */

// 814. 二叉树剪枝

/**
 * 1. 减掉的是不包含 1 的子树，所以可以自底向上，递归的将不符合条件的子树干掉
 */
var pruneTree = function(root) {
    const recursion = (root) => {
        if(!root) return null // 到叶子节点的下的 null 了
        // 求出左右树
         root.left  = recursion(root.left)
         root.right  = recursion(root.right)
        if(!root.left && !root.right && root.val === 0) return null //左右树都为null，且自身值为 0 ，则这课子树减除
        return root //还可以抢救一下
    }
    return recursion(root)
}