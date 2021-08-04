/*
 * @Author: your name
 * @Date: 2021-08-01 11:28:39
 * @LastEditTime: 2021-08-04 09:17:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/困难题 -- 3/1.987. 二叉树的垂序遍历.js
 */

// 987. 二叉树的垂序遍历

/**
 * @分析
 * 1. 使用 BFS 遍历每一层的节点，将每一层垂直一列的暂存起来，然后存在同一个 map 里
 * 2. 同行同列相同时，才会将值从小到大排序，所以不能将每一层的值直接存在全局变量中，而是需要在每一层有一个变量 tempMap ，处理好可能存在的同层同列的值的顺序后，再合并到全局的 map ；
 */
 var verticalTraversal = function (root) {
    const ret = []
    const queue = []
    const map = new Map(); // 总的存储不同垂序位置的数组
    queue.push([root,0]) // 第一个参数的节点，第二个参数是垂序距离 -- 这里以根节点为 0

    while(queue.length) {
        let len = queue .length
        const tempMap = new Map() // 每一层的临时 map
        while(len--){
            // 进入每一层处理
            const [root,index] = queue.shift()
            if(root.left) queue.push([root.left,index-1])
            if(root.right) queue.push([root.right,index+1])
            // 处理当前节点的存放位置
            if(tempMap.has(index)){
                tempMap.set(index,tempMap.get(index).concat(root.val))
            }else{
                tempMap.set(index,[root.val])
            }
        }
        for(let [index,val] of tempMap.entries()){
            val.sort((a,b) =>a-b)
            if(map.has(index)){
                map.set(index,map.get(index).concat(val))
            }else{
                map.set(index,val)
            }
        }
    }
    // 处理完了
    return [...map.keys()].sort((a,b) => a-b).map(key => map.get(key))
}