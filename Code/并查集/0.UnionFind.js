/*
 * @Author: your name
 * @Date: 2021-07-18 10:29:02
 * @LastEditTime: 2021-07-18 11:21:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/并查集/0.UnionFind.js
 */

class UnionFind {
    constructor(size){
        // 用下标表示节点本身，值表示连接的节点，初始化的时候都是自连接
        this.parents = Array.from({length:size}).map((_,index) => index)
        // 用下标表示节点本身，值为作为根节点时，挂在自己下的节点数，默认情况就是挂了自己，所以是 1
        this.sizes = new Array(size).fill(1);
    }

    //  查找节点 x 的根节点
    find(x){
        if(x!== this.parents[x]){
            this.parents[x] = this.find(this.parents[x])
        }
        return this.parents[x]
    }

    connect(x,y){
        const fx = this.find(x)
        const fy = this.find(y)
        if(fx === fy) return 
        if(this.sizes[fx]>this.sizes[fy]){
            // 如果连接 fx 的节点更多，那么就让 fy 指向 fx
            this.parents[fy] = fx
            this.sizes[fx] += this.sizes[fy]
        }else{
            this.parents[fx] = fy
            this.sizes[fy] += this.sizes[fx]
        }
    }
}