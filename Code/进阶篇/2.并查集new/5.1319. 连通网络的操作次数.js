// 1319. 连通网络的操作次数
// https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/

/**
 * @分析
 * 1. 对于 n 台电脑，至少需要 n-1 条线才能把他们完全连接前来
 * 2. 对于 n 台机器，如果进行并查集连接后，查看集合的数量，我们最后希望只剩下一个 1 个集合，多出来的集合就是抽取网线进行操作的操作数量
 * 3. 并查集关键降低复杂度的操作 _find， 如果用的是迭代，那么就只需要遍历一遍，否则用递归就还要回来
 * 4. 最终的结果可以在 _connect 连接过程中找出最终集合的大小，也可以根据最后的 parents 的下标和值相等的值来获取
 * 5. 时间复杂度 ${O(n)}$
 */
 var makeConnected = function (n, connections) {
    const len = connections.length // 网络连接数
    if(len <n -1) return -1 // 如果len 小于 n-1
    const parents = Array.from({length:n}).map((_,index) => index)
    const _find= (x) => {
        if( x !== parents[x]){
             parents[x] = _find(parents[x])
        }
        return parents[x]
    }
    let sizes = n
    const _connect = (x,y) => {
        const px= _find(x)
        const py= _find(y)
        if(px===py) return 
        parents[px] = py
        sizes--
    }
    for(let con of connections){
        _connect(con[0],con[1]) // 连接起来
    }
    return sizes-1
}