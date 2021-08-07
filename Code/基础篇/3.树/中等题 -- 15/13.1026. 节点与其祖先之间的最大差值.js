/*
 * @Author: your name
 * @Date: 2021-08-06 08:42:01
 * @LastEditTime: 2021-08-06 09:48:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/13.1026. 节点与其祖先之间的最大差值.js
 */

// 1026. 节点与其祖先之间的最大差值

/**
 * 1. 在搜索过程中，就携带当前路线的最大最小值，然后就可以配对出最大的差值了
 */
var maxAncestorDiff = function(root) {
    let ret  = 0

    const dfs = (root,min,max) => {
        if(!root) return 
        ret = Math.max(ret, Math.abs(max-root.val), Math.abs(root.val-min))
        min = Math.min(min,root.val)
        max = Math.max(max,root.val)
        dfs(root.left,min,max)
        dfs(root.right,min,max)
    }
    // 题目给定最少两个节点，少于两个节点也确实无法进行差值比较
    // 所以这里直接初始化的时候，根节点的值作为初始化的路径最大最小值
    dfs(root.left,root.val,root.val) 
    dfs(root.right,root.val,root.val) 
    return ret
};

