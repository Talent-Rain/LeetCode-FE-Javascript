## [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/ceng-xu-bian-li-zi-ding-xiang-xia-de-dfs-hjvi/)

- 使用树的三种搜索方式，层序，自顶向下的dfs，自底向上的递归dfs

### 层序遍历
1. 无论是深度，层数等，直接用层序遍历找到最后一层的最后一个叶子节点即可
2. 时间复杂度 ${O(N)}$, 空间复杂度 ${O(K)}$ -- K 是最大宽度
```javascript
// 104. 二叉树的最大深度

/**
 * 1.无论是深度，层数等，直接用层序遍历找到最后一层的最后一个叶子节点即可
 */

 var maxDepth = function(root) {
    if(!root) return 0
    let ret = 0
    const queue = []
    queue.push(root)
    while(queue.length){
        ret++ // 进入一层
        let len = queue.length
        while(len--){
            // 层序遍历
            const root = queue.shift()
            if(root.left) queue.push(root.left)
            if(root.right) queue.push(root.right)
        }
    }
    return ret
}
```

### dfs -- 自顶向下

1. 我们在计算层数的时候，可以考虑到，没遍历一层，就携带一个参数，这个参数是一个标记，比方这里就是深度 depth
2. 这样当我们遍历到叶子节点的时候，都可以和最大值比对一下，然后结束这一条路线
3. 时间复杂度 ${O(N)}$, 空间复杂度 ${O(D)}$ -- D 是深度

```javascript
/**
 * 1. 自顶向上，带个层数参数，判定为叶子节点就进行最大值判断
 */
var maxDepth = function (root) {
    if(!root) return 0
  let ret = 0;
  const dfs = (root, depth) => {
    if (root.left) dfs(root.left, depth + 1);
    if (root.right) dfs(root.right, depth + 1);
    // 走到这的时候，证明是叶子节点了，所以取最大值，就结束这一次的
    ret = Math.max(ret, depth);
  };
  dfs(root, 1);
  return ret;
};
```

### 递归 -- 自低向上
- 既然有自顶向下，那么当然就有自低向上了；
- 就我浅薄的算法能力而已，自顶向下就是带参数的深度优先遍历 DFS, 而自低向上，是递归，需要dfs 到了底部，然后归到根节点，所以这里用的是 recursion 作为方法名。
- 自顶向下是从根节点开始算一层深度，然后跑到叶子节点结束；自低向上反过来，跑到最底层，然后不断求叶子结点的最大深度，然加上自身返回到上层
- 时间复杂度 ${O(N)}$, 空间复杂度 ${O(1)}$

```javascript
// 自低向上
var maxDepth = function (root) {
  const recursion = (root) => {
    // 只是到了底部，所以高度为 0
    if (!root) return 0;
    // 每一个节点的高度是多少，就是两个节点树的最大高度+自己所处的这一层1
    return Math.max(recursion(root.left), recursion(root.right))+1;
  };
  return recursion(root);
};

```

