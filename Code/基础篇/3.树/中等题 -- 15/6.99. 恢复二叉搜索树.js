/*
 * @Author: your name
 * @Date: 2021-08-02 08:53:50
 * @LastEditTime: 2021-08-02 09:39:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 18/6.99. 恢复二叉搜索树.js
 */

// 99. 恢复二叉搜索树

// 暴力法 -- 空间复杂度为 ${O(N)}$
var recoverTree = function(root) {
    const ret = []
    const dfs = (root) => {
        if(!root) return
        dfs(root.left)
        ret.push(root)
        dfs(root.right)
    }
    dfs(root);

    // 移动两个值，使得数组 ret 单增
    // 另开一个数组 ret2，排序
    let sorted = ret.map(item => item.val)
    sorted.sort((a,b)=> a-b)
    sorted.forEach((sorted,index) => {
        if(sorted !== ret[index].val) {
            ret[index].val = sorted
        }
    })
};