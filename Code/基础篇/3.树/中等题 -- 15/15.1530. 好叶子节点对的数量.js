/*
 * @Author: your name
 * @Date: 2021-08-07 10:20:29
 * @LastEditTime: 2021-08-07 10:55:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/15.1530. 好叶子节点对的数量.js
 */

// 1530. 好叶子节点对的数量

/**
 * @分析
 * 1. 看题求所有的好叶子节点对，既然是叶子节点之间做文章，自底向上的去求两者距离，感觉比较符合直觉
 * 2. 后序遍历到叶子节点,开始返回，由于一个节点的叶子节点树可能不止一个，所以要用数组保存
 * 3. 递归回来的叶子节点数组，都得更新节点到叶子节点的距离数组
 * 4. 然后找出左右节点距离中符合要求的节点，最后将所有叶子节点合并起来返回
 * 5. 时间复杂度 ${O(N)}$,空间复杂度 ${O(N)}$
 */
var countPairs = function(root, distance) {
    const ret = 0
    const dfs = (root) => {
        if(!root) return []
        if(!root.left && !root.right) return [0] // 叶子节点
        // 求出叶子节点到当前节点的距离
        const left = dfs(root.left).map(i => i+1)
        const right = dfs(root.right).map(i=>i+1)
        // 然后找出所有小于 dis 的节点对
        for(let l of left) {
            for(let r of right){
                if(l + r <= distance) ret++
            }
        }
        // 将叶子节点合起来返回回去
        return [...left,...right]
    }
    dfs(root)
    return ret
};