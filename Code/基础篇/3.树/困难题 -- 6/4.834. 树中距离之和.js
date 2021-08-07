/*
 * @Author: your name
 * @Date: 2021-08-03 08:08:12
 * @LastEditTime: 2021-08-05 21:38:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/困难题 -- 6/4.834. 树中距离之和.js
 */


// 834. 树中距离之和

/**
 * @分析
 * 1. nodeNum 存储的是子树 root 总的节点数，包括所有子节点和当前根节点 -- nodeNum[root] = sum( nodeNum[child])+1
 * 2. distSum 存储的是所有子节点到的根节点 root 的总距离，包括了所有子树的 distSum 和这些子树节点再往上走一步的距离之和 -- distSum[root] = sum(dist[child]+nodeNum[root])
 * 3. distSum 有点不好理解，其实就是从下往上递归求出子树的总距离，那么父节点的总距离就等于这些子树距离之和，然后还要让这些子树节点全部加 1 的距离，也就是 Sum(nodeNum[child]) * 1
 * 4. 这里的 distSum 求得的是，子树距离之和，还需要从上往下递归求出真正的全部节点的距离之和 
 * 5. 需要注意的是，这里只是一个模拟的树，保存的数组其实是节点附近的所有节点，之所以分父子节点，是为了保证我们再遍历过程中先走的节点为父节点，后走的节点为子节点而已；所以这个连线其实没有实际的指向关系
 */
var sumOfDistancesInTree = function(n, edges) {
    const graph= new Array(n).fill(null).map(() => []) // 下标就是根节点的坐标，值就是子节点的坐标数组
    for(let [from,to] of edges){
        graph[from].push(to) 
        graph[to].push(from) 
    }
    console.log(graph)
    const distSum = new Array(n).fill(0) // 1. 存储的是子树节点的距离之和
    const nodeNum = new Array(n).fill(1) // 存储的是子树总的节点数，最少都有一个
    // 这里是自底向上求出每个节点的 distSum 和 nodeNum ， 所以用后续遍历
    const postOrder = (root,parent) => {
        const childs = graph[root]
        for(let child of childs) {
            if(child === parent) {
                continue // parent 节点就是之前刚走过的节点
            }
            postOrder(child,root)
            console.log(distSum[child],nodeNum[child])
            nodeNum[root] += nodeNum[child]
            distSum[root] += distSum[child]+nodeNum[child]
        }
    }

    // 用前序遍历更新 distSum, 这个时候 distSum 就变成了全部节点的距离和
    const preOrder = (root,parent) => {
        const childs = graph[root]
        for(let child of childs) {
            if(child === parent) {
                continue // parent 节点就是之前刚走过的节点
            }
            distSum[child] = distSum[root] - nodeNum[child] + ( n- nodeNum[child])
            preOrder(child,root)
        }
    }
    postOrder(0,-1)
    console.log('postOrder',distSum,nodeNum)
    preOrder(0,-1)
    console.log('preOrder',distSum)
    return distSum

};

// sumOfDistancesInTree(2,[[0,1]])
sumOfDistancesInTree(3,[[1, 0],[2,0]])