// 145. 二叉树的后序遍历

/**
 * @分析 -- 递归
 */
var postorderTraversal = function(root) {
    const ret = []
    const dfs = (root) => {
        if(!root) return 
        dfs(root.left)
        dfs(root.right)
        ret.push(root.val)
    }
    dfs(root)
    return ret
};

/**
 * @分析 -- 迭代 -- 双色球
 */
var postorderTraversal = function(root) {
    const ret = []
    const stack = []
    stack.push([root,0])
    while(stack.length){
        const [root,color] = stack.pop()
        if(root) {
            if(color === 0){
                stack.push([root,1])
                stack.push([root.right,0])
                stack.push([root.left,0])
            }else{
                ret.push(root.val)
            }
        } 
    }
    return ret
}