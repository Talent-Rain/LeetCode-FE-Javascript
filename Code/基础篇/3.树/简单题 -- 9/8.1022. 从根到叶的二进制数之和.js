/*
 * @Author: your name
 * @Date: 2021-08-03 09:03:05
 * @LastEditTime: 2021-08-08 16:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/简单题 -- 9/8.1022. 从根到叶的二进制数之和.js
 */

// [1022. 从根到叶的二进制数之和](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/)

/**
 * @分析
 * 1. 自顶向下求出每一条路当前对应的数字，保存在入参中
 * 2. 在叶子节点处将值累加起来即可
 * 3. 需要注意的是，要在叶子节点就处理，而不是在 null 的时候处理，不然会重复计算
 */
 var sumRootToLeaf = function(root) {
    // if(!root) return 0 //题目已知节点是 1-1000
    let ret = 0
    const dfs = (root,sum) => {
        const temp = (sum<<1) + root.val
        if(!root.left && !root.right){
            ret +=temp
            return 
        }
        if(root.left) dfs(root.left,temp)
        if(root.right) dfs(root.right,temp)
    }

    dfs(root,0)
    return ret
};