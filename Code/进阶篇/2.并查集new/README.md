### [547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)
分析
1. 每一个城市都有可能是一个省份，而只有是连接的城市，就合并为一个省份，最后剩下的集合就是省份
2. 所以可以直接用 parents 数组缓存，其中 index 表示自己的唯一表示，value 表示指向集合城市
3. 当我们遇到 isConnected[i][j] === 1 的时候，将两个城市连接起来，最后得到的值就是连接状况
4. 最后的 parents[index] === index 的数量，就是集合的数量
5. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
```javascript
 var findCircleNum = function(isConnected) {
    const len = isConnected.length
    const parents = Array.from(isConnected).map((_,index) => index) // 指向自己
    for(let i = 0;i<len;i++){
        for(let j=0;j<len;j++){
            if(isConnected[i][j] === 1){
                _connect(i,j) // 将 i, j 合并
            }
        }
    }
    return parents.filter((item,index) => item === index).length //筛选出根节点

   function _connect(x,y) {
        parents[_find(x)] = _find(y)
    }

    function _find(x){
        if(parents[x] ===x) return x
        return _find(parents[x])

    }
}
```

```javascript
// 标准类写法
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
    console.log(unions)
    return new Set(unions.parents).size
}
```