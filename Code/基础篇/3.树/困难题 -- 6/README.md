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