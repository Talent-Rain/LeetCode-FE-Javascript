# 前端就该用 JS 写算法 -- 树 -- 简单的那 30%

这里优先选择了 [LeetCode 热题 HOT 100](https://leetcode-cn.com/problemset/all/?topicSlugs=tree&difficulty=EASY&listId=2cktkvj) 中的树题，毕竟刷题的边际收益就是冲击需要算法的面试，所以 Hot 优先级更高。

# 二叉树的遍历

递归遍历

1. 递归的时候前中后序都能直接处理完了
2. 递归是前中后序遍历最简单也是最容易出理解的方法，不懂的画个图就好了

迭代遍历 -- 双色标记法

1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
3. 如果遇到的节点是灰色的，则将节点输出
4. 注意这里是用 stack 栈来存储的，所以是后进先出，所以如果是中序遍历，左 - 中 - 右 ，那么在插入栈的时候要反过来 右 - 中 - 左

按照那个男人的指示，正常我们就用递归做就好，就好像我们做非排序题排序的时候，sort 一下就好了，但是一旦面试官问到用另外的迭代方式的时候，我们再套个模板，会比记住多个迭代写法要简单，毕竟内存容量有限，而后续遍历的迭代写法确实挺坑的，能省一点内存就省一点吧

## [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/)

```javascript
// 144. 二叉树的前序遍历

/**
 * @分析 -- 递归
 */
var preorderTraversal = function (root) {
  const ret = [];
  const recursion = (root) => {
    if (!root) return;
    ret.push(root.val);
    recursion(root.left);
    recursion(root.right);
  };
  recursion(root);
  return ret;
};

/**
 * @分析 -- 迭代 -- 双色标记法
 * 1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
 * 2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
 * 3. 如果遇到的节点是灰色的，则将节点输出
 * 4. 注意这里是用 stack 栈来存储的，所以是后进先出，这里是前序遍历，中 - 左  - 右 ，那么在插入栈的时候要反过来 右 - 左 - 中
 */
var preorderTraversal = function (root) {
  const ret = [];
  const stack = [];
  stack.push([root, 0]); // 0 是白色未处理的，1 是灰色处理过的
  while (stack.length) {
    const [root, color] = stack.pop();
    if (root) {
      if (color === 0) {
        // 遇到白球，则插入 -- 前序
        stack.push([root.right, 0]);
        stack.push([root.left, 0]);
        stack.push([root, 1]);
      } else {
        // 遇到灰球，则收网
        ret.push(root.val);
      }
    }
  }
  return ret;
};
```

## [1.94 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```javascript
// 94. 二叉树的中序遍历

/**
 * @分析
 * 1. 递归的时候前中后序都能直接处理完了
 * 2. 递归是前中后序遍历最简单也是最容易出理解的方法，不懂的画个图就好了
 */
var inorderTraversal = function (root) {
  const ret = [];
  const recursion = (root) => {
    if (!root) return;
    recursion(root.left);
    // 这里是中序，所以在两个递归之间，如果是前序就在前面，后序就在后面
    ret.push(root.val);
    recursion(root.right);
  };
  recursion(root);
  return ret;
};

/**
 * @分析 -- 迭代 -- 双色标记法
 * 1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
 * 2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
 * 3. 如果遇到的节点是灰色的，则将节点输出
 * 4. 注意这里是用 stack 栈来存储的，所以是后进先出，所以如果是中序遍历，左 - 中 - 右 ，那么在插入栈的时候要反过来 右 - 中 - 左
 */
var inorderTraversal = function (root) {
  const ret = [];
  const stack = [];
  stack.push([root, 0]); // 0 是白色未处理的，1 是灰色处理过的
  while (stack.length) {
    const [root, color] = stack.pop();
    if (root) {
      if (color === 0) {
        // 遇到白球，则插入 -- 中序遍历
        stack.push([root.right, 0]);
        stack.push([root, 1]);
        stack.push([root.left, 0]);
      } else {
        // 遇到灰球，则收网
        ret.push(root.val);
      }
    }
  }
  return ret;
};
```

## [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/submissions/)

```javascript
// 145. 二叉树的后序遍历

/**
 * @分析 -- 递归
 */
var postorderTraversal = function (root) {
  const ret = [];
  const dfs = (root) => {
    if (!root) return;
    dfs(root.left);
    dfs(root.right);
    ret.push(root.val);
  };
  dfs(root);
  return ret;
};

/**
 * @分析 -- 迭代 -- 双色球
 */
var postorderTraversal = function (root) {
  const ret = [];
  const stack = [];
  stack.push([root, 0]);
  while (stack.length) {
    const [root, color] = stack.pop();
    if (root) {
      if (color === 0) {
        stack.push([root, 1]);
        stack.push([root.right, 0]);
        stack.push([root.left, 0]);
      } else {
        ret.push(root.val);
      }
    }
  }
  return ret;
};
```

## [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/solution/dfs-di-gui-by-jzsq_lyx-92hj/)

### 分析

1. 对称二叉树，其实是要求是否镜像对齐，所以递归过程至少需要两个根节点，然后 dfs 主要就是判断是否是对称的两棵树
2. 这里是自顶向下分配相互比较的子树节点 left 和 right，然后再自底向上的返回最终结果
3. 在某一次 dfs 中，如果比较双方都是 null，那么证明比较双方是对称的；如果出现只有一方有值，或者双方有值但是值不一样的时候，返回 false；
4. 每次递归都是左右外层构成比较，左右内层构成比较
5. 时间复杂度: ${O(h)}$, 其中 h 是树的高度

```javascript
// 101. 对称二叉树

var isSymmetric = function (root) {
  if (!root) return false;
  const dfs = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right || left.val !== right.val) return false;
    return dfs(left.left, right.right) && dfs(left.right, right.left);
  };
  return dfs(root.left, root.right);
};
```

## [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/ceng-xu-bian-li-zi-ding-xiang-xia-de-dfs-hjvi/)

- 使用树的三种搜索方式，层序，自顶向下的 dfs，自底向上的递归 dfs

### 层序遍历

1. 无论是深度，层数等，直接用层序遍历找到最后一层的最后一个叶子节点即可
2. 时间复杂度 ${O(N)}$, 空间复杂度 ${O(K)}$ -- K 是最大宽度

```javascript
// 104. 二叉树的最大深度

/**
 * 1.无论是深度，层数等，直接用层序遍历找到最后一层的最后一个叶子节点即可
 */

var maxDepth = function (root) {
  if (!root) return 0;
  let ret = 0;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    ret++; // 进入一层
    let len = queue.length;
    while (len--) {
      // 层序遍历
      const root = queue.shift();
      if (root.left) queue.push(root.left);
      if (root.right) queue.push(root.right);
    }
  }
  return ret;
};
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
  if (!root) return 0;
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
- 就我浅薄的算法能力而已，自顶向下就是带参数的深度优先遍历 DFS, 而自低向上，是递归，需要 dfs 到了底部，然后归到根节点，所以这里用的是 recursion 作为方法名。
- 自顶向下是从根节点开始算一层深度，然后跑到叶子节点结束；自低向上反过来，跑到最底层，然后不断求叶子结点的最大深度，然加上自身返回到上层
- 时间复杂度 ${O(N)}$, 空间复杂度 ${O(1)}$

```javascript
// 自低向上
var maxDepth = function (root) {
  const recursion = (root) => {
    // 只是到了底部，所以高度为 0
    if (!root) return 0;
    // 每一个节点的高度是多少，就是两个节点树的最大高度+自己所处的这一层1
    return Math.max(recursion(root.left), recursion(root.right)) + 1;
  };
  return recursion(root);
};
```

## [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/solution/zi-di-xiang-shang-de-dfs-by-jzsq_lyx-gvrc/)

### 自底向上

- 因为要求的是反转二叉树，对于任意一颗子树，其实都是要做一样的操作，所以可以先递到叶子节点，然后开始进行翻转
- 自底向上将翻转好的子树传递到上层的节点，直到最后的根节点，得到了两课翻转好的树，然后交换一下一下位置就好了
- 时间复杂度 ${O(N)}$

```javascript
// 226. 翻转二叉树
var invertTree = function (root) {
  const dfs = (root) => {
    // 到达了最底部，直接返回 null
    if (!root) return null;
    // 1.递归获取翻转后的左右子树
    const left = dfs(root.left);
    const right = dfs(root.right);
    // 2.反转两棵树的位置
    root.left = right;
    root.right = left;
    // 最后返回这个反转之后的树
    return root;
  };
  return dfs(root);
};
```

## [563. 二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/solution/zi-di-xiang-shang-by-jzsq_lyx-24re/)

分析

1. 自底向上返回子树值之和，然后求出对应的坡度，累加起来即可.
2. 需要注意的是，左右子树的累加值大小不确定，需要用绝对值
3. 时间复杂度 ${O(N)}$

```javascript
var findTilt = function (root) {
  let ret = 0;
  const recursion = (root) => {
    if (!root) return 0;
    const left = recursion(root.left);
    const right = recursion(root.right);
    ret += Math.abs(left - right);
    return left + right + root.val;
  };
  recursion(root);
  return ret;
};
```

## [1022. 从根到叶的二进制数之和](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/solution/zi-ding-xiang-xia-qiu-zhi-by-jzsq_lyx-wsyc/)

分析
1. 自顶向下求出每一条路当前对应的数字，保存在入参中
2. 在叶子节点处将值累加起来即可
3. 需要注意的是，要在叶子节点就处理，而不是在 null 的时候处理，不然会重复计算

```javascript
var sumRootToLeaf = function(root) {
    // if(!root) return 0 //题目已知节点是 1-1000
    let ret = 0
    const dfs = (root,sum) => {
        const temp = (sum<<1) + root.val
        if(!root.left && !root.right){
            ret +=temp
            return 
        }
        if(root.left) dfs(root.left,temp)
        if(root.right) dfs(root.right,temp)
    }

    dfs(root,0)
    return ret

};
```

## [783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/solution/zhong-xu-bian-li-by-jzsq_lyx-kwrf/)

分析
1. 这是一课二叉搜索树 BST , 直接拍脑袋想用中序遍历，得到的值是单增的
2. 使用一个变量保存 BST 中序遍历过程中的第一个值；使用一个全局变量保存最小的差值
3. 时间复杂度${O(N)}$

```javascript
var minDiffInBST = function(root) {
    let ret = Infinity
    let prev = undefined // 保存上一个值
    const dfs = (root) => {
        if(!root) return
       dfs(root.left)
        //  在这里处理
        if(prev === undefined){
            // 第一个值，由于差值需要两个值，所以这相当于初始化了
            prev = root.val
        }else{
            ret = Math.min(ret,root.val-prev)
            prev = root.val
        }
        dfs(root.right)
    }
    dfs(root)
    return ret
};
```