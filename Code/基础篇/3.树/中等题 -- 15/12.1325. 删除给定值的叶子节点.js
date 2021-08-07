/*
 * @Author: your name
 * @Date: 2021-08-06 08:23:43
 * @LastEditTime: 2021-08-06 08:30:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/12.1325. 删除给定值的叶子节点.js
 */
// 1325. 删除给定值的叶子节点

/**
 * @分析
 * 1. 这里删除有两个标准：叶子节点 + target
 * 2. 一旦删除某个叶子节点，它的父节点很可能就`复阳`，然后需要继续删除
 * 3. 所以自底向上的删除，使用后序遍历最合适了
 * 
 */
var removeLeafNodes = function(root, target) {
    const postOrder = (root) => {
        if(!root) return null
        root.left =  postOrder(root.left)
        root.right = postOrder(root.right)
        // 叶子节点且值等于 target 的时候
        if(!root.left && !root.right && root.val === target) return null
        return root
    }
    return postOrder(root)
};