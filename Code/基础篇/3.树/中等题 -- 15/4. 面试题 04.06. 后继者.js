// 面试题 04.06. 后继者

/**
 * @分析
 * 1. 根据中序遍历，将所有的节点都保存到数组中，然后找到 P 的时候，保存下一个值的下标，然后遍历结束后，从数组中取即可
 */
 var inorderSuccessor = function(root, p) {
    if(!root) return null
    let arr = []
    let ret = 0
    const dfs = (root) => {
        if(!root) return 
        dfs(root.left)
        arr.push(root)
        if(root === p) {
            ret = arr.length
        }
        dfs(root.right)

    }
     dfs(root)
     return arr[ret] || null 
};