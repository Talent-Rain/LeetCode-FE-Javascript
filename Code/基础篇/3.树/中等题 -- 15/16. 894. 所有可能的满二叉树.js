/*
 * @Author: your name
 * @Date: 2021-08-07 10:57:24
 * @LastEditTime: 2021-08-07 14:39:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 15/16. 894. 所有可能的满二叉树.js
 */

// 894. 所有可能的满二叉树

/**
 * @分析
 * 1. 如果给定的 n 是偶数，那么直接返回空的数组，因为不能组成满二叉树，而如果只有 1 个节点，则可以返回 [node] -- 这个是边界
 * 2. 对于每一个子树而言，都是在构建`满二叉树`,只是对应的节点数 n 有所区别而言 -- 换句话说，对于每一个子节点，都要进行一次构建满二叉树，知道边界为止
 * 3. 每一层都是遍历分配左右树的节点数，然后使用`后续遍历`的方式遍历到边界条件处，然后开始进行处理；
 * 4. 只有当左右节点树都存在节点的时候，才需要进行拼接，组合成新的节点数组往上递归
 * 5. 整体就是自顶向下分配子树节点数，来求满二叉树；然后自低向上组合更新节点树，最后得到一个合规的满二叉树节点数组；
 * 6. 时间复杂度 ${N^2}$, 每一层都需要遍历切割，切割完之后分别进行树的创建
 */
var allPossibleFBT = function(n) {
    const recursion = n => {
        if(n%2 === 0) return [] // 偶数
        if(n === 1) return [new TreeNode(0)]
        const ret = [] // 保存当前节点下，所有满足`满二叉树`情况的节点
        for (let i = 0; i < n; i++) {
            const left_num = i,right_num = n-i -1 // 之所以再减去 1 个，因为根节点占据了 1 
            // 构建左树的满二叉树
           const lefts  = recursion(left_num)
            const rights = recursion(right_num)
            if(lefts && rights) {
                // 必须同时存在的时候，才是满的；要不都没有
                for(let l of lefts){
                    for(let r of rights){
                        const root = new TreeNode(0)
                        root.left = l
                        root.right = r
                        ret.push(root)
                    }
                }
            }
        }
        return ret
    }
    return recursion(n)
    
};

