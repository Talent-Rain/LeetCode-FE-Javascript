/*
 * @Author: your name
 * @Date: 2021-08-03 08:30:01
 * @LastEditTime: 2021-08-08 11:09:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/简单题 -- 9/7.563. 二叉树的坡度.js
 */

// [563. 二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/)

/**
 * @分析
 * 1. 自底向上返回子树值之和，然后求出对应的坡度，累加起来即可
 */
 var findTilt = function(root) {
    let ret = 0
    const recursion = root => {
        if(!root) return 0
        const left = recursion(root.left)
       const right = recursion(root.right)
       ret += Math.abs(left-right)
       return left+right+root.val
    }
    recursion(root)
    return ret
};