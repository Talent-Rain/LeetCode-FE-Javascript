## [814. 二叉树剪枝](https://leetcode-cn.com/problems/binary-tree-pruning/solution/zi-di-xiang-shang-di-gui-by-jzsq_lyx-yz0j/)

分析
1. 减掉的是不包含 1 的子树，所以可以自底向上，递归的将不符合条件的子树干掉
2. 自底向上一般就是所谓的递归，一直搜索（递）到叶子节点下的 null，然后开始往上（归）返回所得的的值，一般最后的返回值都是直接返回而不是外层的全局变量
3. 对于每一个根节点，我们都用递归函数求出剪枝后的左右子树，并且拼在当前的节点上，如果左右子树已经剪掉了（null），同时自己的值也是 0 ， 那么这个子树就可以剪掉，具体表现就是返回 null, 那么它的上一层父节点就可以识别出这课子树没了，一直归到根节点，然后返回最终结果
4. 时间复杂度: ${O(N)}$

```javascript
var pruneTree = function(root) {
    const recursion = (root) => {
        if(!root) return null // 到叶子节点的下的 null 了
        // 求出左右树
         root.left  = recursion(root.left)
         root.right  = recursion(root.right)
        if(!root.left && !root.right && root.val === 0) return null //左右树都为null，且自身值为 0 ，则这课子树减除
        return root //还可以抢救一下
    }
    return recursion(root)
}
```


## [1325. 删除给定值的叶子节点](https://leetcode-cn.com/problems/delete-leaves-with-a-given-value/solution/er-cha-shu-jian-zhi-by-jzsq_lyx-v8ez/)

分析
1. 这里删除有两个标准：叶子节点 + target
2. 一旦删除某个叶子节点，它的父节点很可能就`复阳`，然后需要继续删除
3. 所以自底向上的删除，使用后序遍历最合适了.
4. 这题和楼上 [814. 二叉树剪枝](https://leetcode-cn.com/problems/binary-tree-pruning/solution/zi-di-xiang-shang-di-gui-by-jzsq_lyx-yz0j/) 基本一样，本题是给定值 target，上题是给定值 0， 本质上都是剪枝
5. 时间复杂度: ${O(N)}$
```javascript
var removeLeafNodes = function(root, target) {
    const postOrder = (root) => {
        if(!root) return null
        root.left =  postOrder(root.left)
        root.right = postOrder(root.right)
        // 叶子节点且值等于 target 的时候
        if(!root.left && !root.right && root.val === target) return null
        return root
    }
    return postOrder(root)
};
```

## [1026.节点与其祖先之间的最大差值](https://leetcode-cn.com/problems/maximum-difference-between-node-and-ancestor/solution/zi-ding-xiang-xia-qiu-chai-zhi-by-jzsq_l-zcsm/)

分析
1. 采用自顶向下的搜索方式，在搜索过程中，就携带当前路线的最大最小值，然后就可以配对出最大的差值了
2. 需要注意的是，差值最低是两个节点，这个题目已经限定好了，所以在函数中不需要再做判断，但是初始化的时候要注意
3. 这里直接将根节点的值作为路径的初始 min, max 值，然后从根节点的子节点开始搜索，所以有左右节点进行，最后返回最终的结果
4. 时间复杂度: ${O(N)}$
```javascript
var maxAncestorDiff = function(root) {
    let ret  = 0

    const dfs = (root,min,max) => {
        if(!root) return 
        ret = Math.max(ret, Math.abs(max-root.val), Math.abs(root.val-min))
        min = Math.min(min,root.val)
        max = Math.max(max,root.val)
        dfs(root.left,min,max)
        dfs(root.right,min,max)
    }
    // 题目给定最少两个节点，少于两个节点也确实无法进行差值比较
    // 所以这里直接初始化的时候，根节点的值作为初始化的路径最大最小值
    dfs(root.left,root.val,root.val) 
    dfs(root.right,root.val,root.val) 
    return ret
};


```

## [865. 具有所有最深节点的最小子树](https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/solution/zi-ding-xiang-xia-he-zi-di-xiang-shang-b-y0nc/)

### 分析1 -- 求出 depth 然后匹配
1. 既然是要最大深度，那么就先自顶向下求出最大深度 max, 然后再自底向上返回根节点的最大深度，找出匹配最大深度对应最小节点树； -- 这里匹配的时候需要先求出最大深度 depth，然后再一一匹配；
2. 因为我们要求的是最小的子树，但是这个子树要包含所有的最大深度节点，所以我们递归返回的是当前节点子树的最大深度，只有当子树的左右子树同时存在最大深度的节点时，我们才会替换到高度更高的树，即更大的树
3. 先搜索到叶子节点，在递归回根节点，时间复杂度为 ${O(N)}$
```javascript
var subtreeWithAllDeepest = function (root) {
  let max = 0; // 最大深度
  let ret = undefined; // 目标节点
  const dfs = (root, depth) => {
    // 叶子节点 -- 前序遍历求出最大深度
    if (!root) {
        max = Math.max(max,depth) //求出最大深度
        return depth;
    }
    const left = dfs(root.left, depth + 1);
    const right = dfs(root.right, depth + 1);

    // 后序遍历根据左右子树的最大深度是否同时满足 max，判断是否需要替换成更大的子树
    if(left === max && right === max){
        // 只有在两子树的最大深度同时等于最大深度的时候，才需置换节点
        ret = root
    }
    // 后序遍历完了，到达根节点
    return Math.max(left, right); //返回的是当前节点子树中的的最大深度
  };
  dfs(root, 0);
  return ret
};
```

### 分析2 -- 深度不比求出来
1. 之前是用全局变量保存最大深度和最小的树，实际上在每一次递归中，我们都能得到左右子树的情况，包括子树中`最大的深度`以及`对应的最小子树`,
2. 所以递归 return 回来 `最大的深度`以及`对应的最小子树`，就可以不需要额外的变量了
3. 实际上我们根本不需要知道具体的最大深度是多少，只需要比较深度，得到最大的那个即可
```javascript
var subtreeWithAllDeepest = function (root) {
    const dfs = (root, depth) => {
      if (!root)  return [root,depth];
      const [lr,ld] = dfs(root.left, depth + 1); // lr -- left root, ld -- left depth
      const [rr,rd] = dfs(root.right, depth + 1);
        if(ld === rd) return [root,ld] // 如果左右树的最大值相同，即最大深度节点两边都有，所以要更新一下最小树节点
        if(ld>rd) return [lr,ld]
        if(ld<rd) return [rr,rd]
    };
    return dfs(root, 0);
  };
```