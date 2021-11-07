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

### [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/submissions/)
分析
1. 回溯搞起来
2. 遍历每个点，只要是土地就启动一次，然后上下左右蔓延，遇到土地久转出水，这样可以防止重复获取，一直到孤岛的时候返回
```javascript

 var numIslands = function(grid) {
    let valid = 0

    const rows = grid.length
    const columns = grid[0].length

    const dfs = (r,c) => {
        if( r<0 || r>=rows || c<0 || c>=columns || grid[r][c] === '0') {
            // 都是水，直接返回
            return
        }
        // 走过了就设置为水，防止二次经历
        grid[r][c] = '0'
        dfs(r-1,c)
        dfs(r+1,c)
        dfs(r,c-1)
        dfs(r,c+1)
    }
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            if(grid[i][j] === '1') {
                valid++
                // 启动一次
                dfs(i,j)
            }
        }
    }
    return valid
};
```

### [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
```javascript

var MyQueue = function() {
    this.queue = []
    this.tempStack = []
    this.size = 0
};

MyQueue.prototype.push = function(x) {
    this.queue.push(x) // 做为一个栈，本身就是可以在栈尾加入值
    this.size++
};



MyQueue.prototype.pop = function() {
    if(!this.size) return null // 如果没有，就弹出没有
    //转移到 tempStack 中
    while(this.queue.length){
        this.tempStack.push(this.queue.pop())
    }
    // 弹出一个
    const ret = this.tempStack.pop()
    this.size--
    while(this.tempStack.length){
        this.queue.push(this.tempStack.pop())
    }
    return ret
};

MyQueue.prototype.peek = function() {
    if(!this.size) return null // 如果没有，就弹出没有
    //转移到 tempStack 中
    while(this.queue.length){
        this.tempStack.push(this.queue.pop())
    }
    // 弹出一个
    const ret = this.tempStack[this.size-1]
    while(this.tempStack.length){
        this.queue.push(this.tempStack.pop())
    }
    return ret
};

MyQueue.prototype.empty = function() {
    return this.size === 0
};

```