/*
 * @Author: your name
 * @Date: 2021-08-02 08:36:11
 * @LastEditTime: 2021-08-02 08:48:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 18/5.98. 验证二叉搜索树.js
 */

// 98. 验证二叉搜索树

/**
 * @分析
 * 1. 二叉搜索树的特征: 根节点大于左节点，小于右节点
 * 2. 前序遍历过程中，是单增的过程；
 * 3. 我们不需要维护一个数组，只需要维护上一个值做大小判断就好
 * 4. 所以前序遍历过程中，然后和一个全局遍历进行大小比较即可；
 */
 var isValidBST = function(root) {
    if(!root) return false
    let pre = -Infinity //最小值
    let ret = true // 默认就是
    const inorder  = (root) => {
     
        if(root.left && ret) inorder(root.left)
           if(root.val<=pre) {
            ret = false // 一旦有一组失败，都不是 BST
            return
        }else {
            pre = root.val
        }
        if(root.right && ret) inorder(root.right)
    }
    inorder(root)
    return ret
};