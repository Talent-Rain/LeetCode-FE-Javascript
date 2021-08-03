/*
 * @Author: your name
 * @Date: 2021-08-03 08:30:01
 * @LastEditTime: 2021-08-03 08:56:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/简单题 -- 9/7.563. 二叉树的坡度.js
 */
// 129. 求根节点到叶节点数字之和
var sumNumbers = function (root) {
    let ret = 0
    const dfs = (root,num) => {
        let cur = num*10+root.val
        if(!root.left && !root.right) {
            // 叶子节点 -- 这里判断有节点才走，主要是为了找到叶子节点，而不是到叶子结点下的 null，这样会重复计算
            ret+=cur
        }
        if(root.left) dfs(root.left,cur)
        if(root.right) dfs(root.right,cur)
    }

    dfs(root,0)
    return ret
}