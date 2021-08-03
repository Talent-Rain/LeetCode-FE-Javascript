/*
 * @Author: your name
 * @Date: 2021-08-02 09:40:13
 * @LastEditTime: 2021-08-02 09:47:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 18/7.222. 完全二叉树的节点个数.js
 */

// 222. 完全二叉树的节点个数

var countNodes = function(root) {
    let ret = 0
    const preorder =  root => {
        if(!root) return 
        ret++
        preorder(root.left)
        preorder(root.right)
    }
    preorder(root)
    return ret
};