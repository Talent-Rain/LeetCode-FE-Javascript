/*
 * @Author: your name
 * @Date: 2021-07-31 10:53:10
 * @LastEditTime: 2021-07-31 11:40:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/2.94. 二叉树的中序遍历.js
 */
// 94. 二叉树的中序遍历

/**
 * @分析
 * 1. 递归的时候前中后序都能直接处理完了
 * 2. 递归是前中后序遍历最简单也是最容易出理解的方法，不懂的画个图就好了
 */
var inorderTraversal = function(root) {
    const ret  = []
    const recursion = root => {
        if(!root) return
        recursion(root.left)
        // 这里是中序，所以在两个递归之间，如果是前序就在前面，后序就在后面
        ret.push(root.val)
        recursion(root.right)
    }
    recursion(root)
    return ret
};

/**
 * @分析 -- 迭代 -- 双色标记法
 * 1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
 * 2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
 * 3. 如果遇到的节点是灰色的，则将节点输出
 * 4. 注意这里是用 stack 栈来存储的，所以是后进先出，所以如果是中序遍历，左 - 中 - 右 ，那么在插入栈的时候要反过来 右 - 中 - 左
 */
var inorderTraversal = function(root) {
    const ret  = []
    const stack = []
    stack.push([root,0]) // 0 是白色未处理的，1 是灰色处理过的
    while(stack.length) {
        const  [root,color] = stack.pop()
        if(root){
            if(color === 0){
                // 遇到白球，则插入 -- 中序遍历
                stack.push([root.right,0])
                stack.push([root,1])
                stack.push([root.left,0])
            }else{
                // 遇到灰球，则收网
                ret.push(root.val)
            }
        } 
    }
    return ret
};