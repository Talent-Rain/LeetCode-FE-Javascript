/*
 * @Author: your name
 * @Date: 2021-07-19 08:17:49
 * @LastEditTime: 2021-07-19 08:39:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/剪枝/1.814. 二叉树剪枝.js
 */

// 814. 二叉树剪枝

var pruneTree = function(root) {
    const dfs = root => {
        if(root.left) root.left = dfs(root.left)
        if(root.right) root.right = dfs(root.right)
        if(!root.left && !root.right && !root.val) return null 
        return root
    }
    return dfs(root)
};
