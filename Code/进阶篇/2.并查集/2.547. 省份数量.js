/*
 * @Author: your name
 * @Date: 2021-07-16 09:21:22
 * @LastEditTime: 2021-07-16 10:02:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/并查集/2.547. 省份数量.js
 */
// 547. 省份数量 --- 题1是这道题的改写

/**
 * @分析 -- 并查集
 * 1. 构建一个自指向数组，最后结果也是根据自指向来判断有多少集合 -- 即有多少个根
 * 2. 遍历所有的节点，如果值为 1 ，则将节点所代表的集合合并成一个
 */
 var findCircleNum = function(isConnected) {
    const parent = Array.from(isConnected).map((item,index) => index) // 创建一个自指向的数组
    const len = isConnected.length;
    for(let i = 0;i<len;i++){
        for (let j = 0; j < len; j++) {
            if(isConnected[i][j]){
                // 将 i 和 j 所在的集合连接起来
                _connect(i,j)
            }
        }
    }
    return parent.filter((item,index)=>item === index).length
    function _connect(i,j) {
        // 先找出 i 和 j 对应的根节点，然后连接起来
        parent[_find(i)] = _find(j)
    }
    // 找出 i 的根节点
    function _find(i){
        if(parent[i] !== i){
            // 指向其他节点，并不是自指向 -- 根据当前父节点的下标继续找
            parent[i] = _find(parent[i])
        }
        // 这个时候已经是自指向了
        return parent[i]
    }

};

// 测试
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))