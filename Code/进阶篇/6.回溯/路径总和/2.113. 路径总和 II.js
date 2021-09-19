// 113. 路径总和 II
// https://leetcode-cn.com/problems/path-sum-ii/

/**
 * @分析
 * 1. 找的还是 root - leaf 的路径，但是这一次要把找的所有符合要求的路径都保存起来
 * 2. 时间复杂度 ${O(n)}$
 */
 var pathSum = function(root, targetSum) {
    const ret = []
    const dfs = (root,arr,sum) => {
        if(!root) return 
        sum+=root.val
        arr = [...arr,root.val]
        if(!root.left && !root.right && sum == targetSum){
            ret.push(arr)
        }
        if(root.left) dfs(root.left,[...arr],sum)
        if(root.right) dfs(root.right,[...arr],sum)
    }
    dfs(root,[],0)
    return ret
};