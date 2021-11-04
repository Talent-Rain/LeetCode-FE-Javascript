### [133. 克隆图](https://leetcode-cn.com/problems/clone-graph/solution/dfs-bfs-by-jzsq_lyx-7982/)

分析 -- DFS
1. 使用 dfs 遍历整个图，用 map 缓存经历过的节点，其中 key 是 node 图的节点，value 是clone 之后的节点
```javascript

var cloneGraph = function(node) {
    const map = new Map()
    const dfs = node => {
        if(!node || map.has(node)) return  // 如果是空节点，或者是已经遍历过的节点，直接返回
        const clone = new Node(node.val)
        map.set(node,clone) // 将遍历过的节点缓存起来
        for(let neighbor of node.neighbors) {
            if(!map.has(neighbor)) {
                dfs(neighbor)
            }
            clone.neighbors.push(map.get(neighbor))
        }
    }
    dfs(node)
    return map.get(node) 
};
```
分析 -- BFS
1. 使用 bfs 的写法就是用到了队列这种结构
2. 由于这个图最后还是会回到原点，所以用队列 queue 缓存没遍历一层的节点，然后迭代到最后 queue 的长度为 0 的时候结束
 ```javascript
 var cloneGraph = function(node) {
    if(!node) return node
    const map = new Map()
    const queue = []
    map.set(node,new Node(node.val))
    queue.push(node) 
    while(queue.length) {
        const node = queue.shift()
        node.neighbors.forEach(neighbor=>{
            if(!map.has(neighbor)){
                queue.push(neighbor)
                map.set(neighbor,new Node(neighbor.val))
            }
            // 为 node 这个节点的 clone 节点配置 neighbors
            map.get(node).neighbors.push(map.get(neighbor))
        })
        
    }   
    return map.get(node)     
}
```