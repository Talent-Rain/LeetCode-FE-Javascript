/*
 * @Author: your name
 * @Date: 2021-10-02 23:39:26
 * @LastEditTime: 2021-10-08 08:59:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/2.并查集new/1.UnionFind.js
 */

 class UnionFind {
    constructor(n){
        // 缓存两个数组，父节点数组和当前节点的子节点数量数组
        // 1. 初始化的父节点数组都是指向自己当前的下标的； -- 其中下标是唯一值
        this.parents = new Array(n).fill(1).map((_,index) => index)
        // 2. 初始化的子节点数量数组都是只有一个；-- 其中下标是唯一值
        this.sizes = new Array(n).fill(1) // 
    }

    // 寻找 x 的根节点
    find(x){
        if(this.parents[x] === x) return x
        return this.find(this.parents[x])
    }

    // 合并两个并查集
    connect(x,y){
        const px = this.find(x)
        const py = this.find(y)
        if(px === py) return // 如果他们是一个集合，则直接返回
        if(this.sizes[px]>this.sizes[py]){
            // px 挂的节点更多，所以将 py 也挂过来
             this.parents[py] =px
             this.sizes[px]++
        }else{
            this.parents[px] =py
             this.sizes[py]++ 
        }
    }
}

var findCircleNum = function(isConnected) {
    const len = isConnected.length
    const unions = new UnionFind(isConnected.length)
    for(let i = 0;i<len;i++){
        for(let j=0;j<len;j++){
            if(isConnected[i][j] === 1){
                unions.connect(i,j) // 将 i, j 合并
            }
        }
    }
    return new Set(unions.parents).size
}