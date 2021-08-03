/*
 * @Author: your name
 * @Date: 2021-08-03 08:43:53
 * @LastEditTime: 2021-08-03 09:03:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/9.1448. 统计二叉树中好节点的数目.js
 */

// 1448. 统计二叉树中好节点的数目

/**
 * @分析
 * 1. 前序遍历，维护一个最大值，如果节点大于等于之前路径中的最大，那么就是好节点
 */
var goodNodes = function(root) {
    let ret = 0

    const dfs = (root,max) => {
        if(root.val>=max) {
            ret++
            max = ret
        }
        if(root.left) dfs(root.left,max)
        if(root.right) dfs(root.right,max)
    }

    dfs(root,-Infinity)
    return ret
};