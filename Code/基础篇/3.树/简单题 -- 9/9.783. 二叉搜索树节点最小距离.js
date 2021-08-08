/*
 * @Author: your name
 * @Date: 2021-08-06 08:38:35
 * @LastEditTime: 2021-08-08 11:58:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/简单题 -- 9/9.783. 二叉搜索树节点最小距离.js
 */
// [783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)

/**
 * @分析
 * 1. 这是一课二叉搜索树 BST , 直接拍脑袋想用中序遍历，得到的值是单增的
 * 2. 使用一个变量保存 BST 中序遍历过程中的第一个值；使用一个全局变量保存最小的差值
 * 3. 时间复杂度${O(N)}$
 */
var minDiffInBST = function(root) {
    let ret = Infinity
    let prev = undefined // 保存上一个值
    const dfs = (root) => {
        if(!root) return
       dfs(root.left)
        //  在这里处理
        if(prev === undefined){
            // 第一个值，由于差值需要两个值，所以这相当于初始化了
            prev = root.val
        }else{
            ret = Math.min(ret,root.val-prev)
            prev = root.val
        }
        dfs(root.right)
    }
    dfs(root)
    return ret
};