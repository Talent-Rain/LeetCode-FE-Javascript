// 971. 翻转二叉树以匹配先序遍历

/**
 * @分析
 * 1. voyage 是一棵树 V 的先序遍历数组，而我们现在希望能够在翻转 root 多个节点之后，最后得到树 V
 * 2. 
 */
 var flipMatchVoyage = function(root, voyage) {
    if(root.val !== voyage[0]) return [-1] // 用来在进入 dfs 前对根节点的判断
    const ret = [] 
    let pos = 0 // 这是用来获取 voyage 值，也是遍历树 V 的，如果没有走完，证明无法匹配 root
    const dfs = root => {
        // 每一次的遍历 pos 都要跟随着
        pos++ 
        // 对于每一个节点，都是按照先序遍历的写法
        if(root.left && root.left.val === voyage[pos] ){
            // 如果在这节点左树适配，那就继续走，因为这是先序遍历
            dfs(root.left)
        }
        if(root.right && root.right.val === voyage[pos] ){
            dfs(root.right)
            // 右树完成之后，需要看看现在 pos 所在的值是否可以匹配左树，即是否先走右树再走左树，成立即当前的 root 节点就是需要进行翻转的节点
            if(root.left && root.left.val === voyage[pos] ){
                ret.push(root.val)
                dfs(root.left)
            }
        }
    }

    dfs(root)
    if(pos<voyage.length){
        // voyage 还没有走完，就被限制条件卡住了
        return [-1]
    }
    
    return ret
};