/*
 * @Author: your name
 * @Date: 2021-07-18 10:12:55
 * @LastEditTime: 2021-07-18 11:21:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/并查集/3.924. 尽量减少恶意软件的传播.js
 */

// 924. 尽量减少恶意软件的传播

/**
 * @分析 -- 
 */
 var minMalwareSpread = function(graph, initial) {
    const len = graph.length ; 
    // 构建并查集
    const uf = new UnionFind(len)
    for(let i = 0;i<len;i++){
        for(let j = 0;j<len;j++){
            if(graph[i][j]){
                uf.connect(i,j)
            }
        }
    }

    // 感染源节点在并查集中感染到的根节点数组
    const injectedArr = new Array(len).fill(0);

    initial.forEach(node => {
        // 初始感染节点会传递到并查集的根节点
        const root = uf.find(node)
        injectedArr[root]++
    }) 

    let maxSize = 0 // 最少是 0 个
    let ret = -1 // 返回的节点值
    // 遍历 initial, 找出初始感染节点能感染节点最多的哪一个；
    // 对于 injectedArr 中值，如果大于 1 ，证明初始感染源超过 1 个，那么即便删除其中一个，他还是会被另外的感染源再次感染
    // 对于值为 1, 首先比对感染的人数 -- 即这个并查集根节点下的子节点数 -- 如果一致的时候，取小的那个感染源值
    initial.forEach(node => {
        const root = uf.find(node)
        const count =injectedArr[root]
        if(count === 1 ){
            const size = uf.sizes[root]
            if(size >maxSize || (size === maxSize && node<ret)){
                ret = node,
                maxSize = size
            }
        }
    })

    // 如果是 ret === -1 ，表明随便删除一个节点，得到的结果都一样，这个时候要返回索引最小的节点，这里的索引最小指 initial 中值最小的节点
    if (ret == -1) return Math.min(...initial)
    return ret

};

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