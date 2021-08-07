## [987. 二叉树的垂序遍历](https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/solution/mapbfs-by-jzsq_lyx-4jq1/)

分析
1. 这道题主要还是看图做题，上面都标记了一些垂序的坐标，所以就考虑遍历一次，给节点标注上垂序位置属性，然后将相同垂序位置的放在同一个数组中即可；
2. 值得注意的是，在二叉树相互交替的子树中，同一层中会出现多个垂序位置一样的值，这个时候题目也告诉怎么处理了 `同行同列相同时，才会将值从小到大排序`；
3. 所以不能直接将所有垂序位置相同的值，存储到全局的 map 中，而是需要在每一层有一个变量 tempMap ，处理好可能存在的同层同列的值的顺序后，再合并到全局的 map；
4. 遍历完树得到一个 map 后，key 是垂序位置，value 是相应的值，是一个数组
5. 对 key 值进行排序后转成一个合规的数组即可
6. 空间复杂度 ${O(N)}$, 时间复杂度 ${O(N)}$ + ${O(MlogM)}$, 其中 N 是树的节点值， M 是垂序位置宽度


```javascript
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
```



## [2.剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/solution/shu-de-xu-lie-hua-by-jzsq_lyx-stqq/)
- 这道题其实就是让你了解一下，为啥我们做树题的时候，明明在做树题（或者链表）这些题目的时候，控制台的例子都是数组，而不是一个可视化的树结构的数据，之前我一直很难理解，直到了解到序列化和反序列化之后。
- 个人理解这是为了兼容不同语言内置数据结构的不同而做出来的优化策略，比方说 JS 就没有树这种结构，所以我们在做树的时候，需要自己构建一个类，然后用我们常用的数据结构转成树，然后再进行运算，而这个过程，其实就是树的反序列化。而数组，字符串这些作为基本数据结构，几乎在常用语言中都会内置，所以就成了树这些结构序列化结构的优先选择。

### 分析 -- 序列化 -- 节点转成字符串
 1. 我们主观上看一个反序列化的数组或者字符串的时候，也是从上到下，从左到右进行匹配，所以我们再做序列化的时候，就直接使用的 bfs 了 
 2. 需要注意的是，这里是直接用单个字符串存储，最后会有一个 "," 多出来，需要去除
 3. 时间复杂度和空间复杂度都是：${O(N)}$, 
```javascript
 var serialize = function (root) {
  if (!root) return "";
  let ret = "";
  const queue = [];
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    let isNull = true; // 确定一下这一层是不是全是 null，如果是,那么就要结束了
    let str = "";
    while (len--) {
      const root = queue.shift();
      if (!root) {
        // 因为在反序列化的时候，你可不知道当前一层对应的节点的位置在哪里，所以只能用 null 来做占位符了
        str += "null"+ ",";
      } else {
        isNull = false;
        str += root.val + ",";
        queue.push(root.left);
        queue.push(root.right);
      }
    }
    // 一层遍历完了
    if (isNull) {
      // 这一层都是 null，所以结束了
      return ret.substr(0,ret.length-1);
    } else {
      ret += str; // 将字符串加上
    }
  }
};

```
### 分析 -- 反序列化 -- 字符串转成节点
1. 给定一个数组，反序列化出一课树
2. 使用的是 BFS 平铺的方式，每次取走 nodes 中的两个节点，如果有值，则保存到队列中，保证循环结束前将所有有值的节点和对应的左右节点都串联好。
3. 具体来说就是 queue 保存有值的节点, index 取得弹出节点的左右子节点（左右节点是保存在 nodes 中的）
4.  时间复杂度和空间复杂度都是：${O(N)}$；
```javascript
var deserialize = function (data) {
    if(!data) return null // 空节点
    const nodes = data.split(',') // 切割成数组
    const root = new TreeNode(nodes[0]); //根节点
    const queue = [] // 队列，用来存储每一层的节点；
    queue.push(root)

    let index = 0; // 当前节点的下标
    while(index < nodes.length - 2){
      const root = queue.shift()
      const lv = nodes[index+1]
      const rv = nodes[index+2]
      if(lv!== 'null') {
        const lnode = new TreeNode(lv)
        root.left = lnode
        queue.push(lnode)
      }
      if(rv!== 'null') {
        const rnode = new TreeNode(rv)
        root.right = rnode
        queue.push(rnode)
      }
      index +=2
    }
   
    return root

};
```


## [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/solution/er-cha-shu-de-zui-da-lu-jing-he-by-jzsq_-e1th/)
 分析
 1. 求以某个节点最根节点的最大路径和，和以这个节点为截止点的最大路径和，是两个不一样的值
 2. 前者根节点是路径中的一环，如果 l -> root -> r
 3. 而后者是作为子树的最大单边路径和，返回给父节点，让父节点进行判断，如 l(e) -> root
 4. 所以整体来说就是一个递归过程，但是在递归的过程中又存在局部最优解需要保存；
 5. 每一次的递归的最大值是包含`根节点`的最大值，这样可以保证衔接上左右子树的最大值，如果其中一课子树的最大值比这个大，那么在后面递归中自然会替代当前值，不需要额外处理
 6. 时间复杂度是 ${O(N)}$, 空间复杂度是 ${O(1)}$
```javascript

var maxPathSum = function(root) {
    let max = -Infinity
    const dfs = root => {
        if(!root) return 0
        const l = dfs(root.left)
        const r = dfs(root.right)
        // 这里的 root.val 不需要和0比较，必须包含根节点，否则无法衔接
        // 同时单子树最大值如果更大，会在后面的 dfs 中取代 max
        const tempMax = Math.max(l,0)+Math.max(r,0)+root.val
        max =Math.max(max,tempMax) 
        return Math.max(0,l,r)+root.val // 这里的根节点是必须存在的，不然没法衔接上
    }
    dfs(root)
    return max
};
```

## [834. 树中距离之和](https://leetcode-cn.com/problems/sum-of-distances-in-tree/solution/qian-xu-hou-xu-de-shi-yong-by-jzsq_lyx-kx2f/)
> 参考题解: https://leetcode-cn.com/problems/sum-of-distances-in-tree/solution/shou-hua-tu-jie-shu-zhong-ju-chi-zhi-he-shu-xing-d/

分析
1. nodeNum 存储的是子树 root 总的节点数，包括所有子节点和当前根节点 -- nodeNum[root] = sum( nodeNum[child])+1
2. distSum 存储的是所有子节点到的根节点 root 的总距离，包括了所有子树的 distSum 和这些子树节点再往上走一步的距离之和 -- distSum[root] = sum(dist[child]+nodeNum[root])
3. distSum 有点不好理解，其实就是从下往上递归求出子树的总距离，那么父节点的总距离就等于这些子树距离之和，然后还要让这些子树节点全部加 1 的距离，也就是 Sum(nodeNum[child])*1
4. 这里的 distSum 求得的是，子树距离之和，还需要从上往下递归求出真正的全部节点的距离之和 
5. 需要注意的是，这里只是一个模拟的树，保存的数组其实是节点附近的所有节点，之所以分父子节点，是为了保证我们再遍历过程中先走的节点为父节点，后走的节点为子节点而已；所以这个连线其实没有实际的指向关系
6. 
```javascript
var sumOfDistancesInTree = function(n, edges) {
    const graph= new Array().fill(null).map(() => []) // 下标就是根节点的坐标，值就是子节点的坐标数组
    for(let [from,to] of edges){
        graph[from].push(to) 
        graph[to].push(from) 
    }
    const distSum = new Array(n).fill(0) // 1. 存储的是子树节点的距离之和
    const nodeNum = new Array(n).fill(1) // 存储的是子树总的节点数，最少都有一个
    // 这里是自底向上求出每个节点的 distSum 和 nodeNum ， 所以用后续遍历
    const postOrder = (root,parent) => {
        const childs = graph[root]
        for(let child of childs) {
            if(child === parent) continue // parent 节点就是之前刚走过的节点
            postOrder(child,root)
            nodeNum[root] += nodeNum[child]
            distSum[root] += distSum[child]+nodeNum[child]
        }
    }

    // 用前序遍历更新 distSum, 这个时候 distSum 就变成了全部节点的距离和
    const preOrder = (root,parent) => {
        const childs = graph[root]
        for(let child of childs) {
            if(child === parent) continue // parent 节点就是之前刚走过的节点
            distSum[child] = distSum[root] - nodeNum[child] + ( n- nodeNum[child])
            preOrder(child,root)
        }
    }
    postOrder(0,-1)
    preOrder(0,-1)
    return distSum

};
```