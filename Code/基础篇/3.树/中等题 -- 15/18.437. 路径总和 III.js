/*
 * @Author: your name
 * @Date: 2021-08-08 10:20:40
 * @LastEditTime: 2021-08-08 10:34:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/18.437. 路径总和 III.js
 */
// 437. 路径总和 III

/**
 * @分析
 * 1. 关键点，路径必须向下，也就是不可以往上重复；
 * 2. 然后起点不必是根节点，所以需要有一个 dfs 遍历不同的起点
 * 3. 终点不一定是叶子节点，所以可能在半途就得到合规的路径，但是由于值有正有负，所以必须走到叶子节点，才能保证不遗漏
 * 4. outer 负责前序遍历获取其实节点， inner 负责以某个子树节点为起点，找出和为 targetSum 的路径
 */
 var pathSum = function(root, targetSum) {
    let ret = 0
    const inner = (root,sum) => {
        const temp = sum + root.val
        if(temp === targetSum) ret++
        if(root.left) inner(root.left,temp)
        if(root.right) inner(root.right,temp)
    }

    const outer = (root) => {
        if(!root) return 
        inner(root,0)
        outer(root.left)
        outer(root.right)
    }
    outer(root)
    return ret
};
