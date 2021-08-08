## [814. 二叉树剪枝](https://leetcode-cn.com/problems/binary-tree-pruning/solution/zi-di-xiang-shang-di-gui-by-jzsq_lyx-yz0j/)

分析

1. 减掉的是不包含 1 的子树，所以可以自底向上，递归的将不符合条件的子树干掉
2. 自底向上一般就是所谓的递归，一直搜索（递）到叶子节点下的 null，然后开始往上（归）返回所得的的值，一般最后的返回值都是直接返回而不是外层的全局变量
3. 对于每一个根节点，我们都用递归函数求出剪枝后的左右子树，并且拼在当前的节点上，如果左右子树已经剪掉了（null），同时自己的值也是 0 ， 那么这个子树就可以剪掉，具体表现就是返回 null, 那么它的上一层父节点就可以识别出这课子树没了，一直归到根节点，然后返回最终结果
4. 时间复杂度: ${O(N)}$

```javascript
var pruneTree = function (root) {
  const recursion = (root) => {
    if (!root) return null; // 到叶子节点的下的 null 了
    // 求出左右树
    root.left = recursion(root.left);
    root.right = recursion(root.right);
    if (!root.left && !root.right && root.val === 0) return null; //左右树都为null，且自身值为 0 ，则这课子树减除
    return root; //还可以抢救一下
  };
  return recursion(root);
};
```

## [1325. 删除给定值的叶子节点](https://leetcode-cn.com/problems/delete-leaves-with-a-given-value/solution/er-cha-shu-jian-zhi-by-jzsq_lyx-v8ez/)

分析

1. 这里删除有两个标准：叶子节点 + target
2. 一旦删除某个叶子节点，它的父节点很可能就`复阳`，然后需要继续删除
3. 所以自底向上的删除，使用后序遍历最合适了.
4. 这题和楼上 [814. 二叉树剪枝](https://leetcode-cn.com/problems/binary-tree-pruning/solution/zi-di-xiang-shang-di-gui-by-jzsq_lyx-yz0j/) 基本一样，本题是给定值 target，上题是给定值 0， 本质上都是剪枝
5. 时间复杂度: ${O(N)}$

```javascript
var removeLeafNodes = function (root, target) {
  const postOrder = (root) => {
    if (!root) return null;
    root.left = postOrder(root.left);
    root.right = postOrder(root.right);
    // 叶子节点且值等于 target 的时候
    if (!root.left && !root.right && root.val === target) return null;
    return root;
  };
  return postOrder(root);
};
```

## [1026.节点与其祖先之间的最大差值](https://leetcode-cn.com/problems/maximum-difference-between-node-and-ancestor/solution/zi-ding-xiang-xia-qiu-chai-zhi-by-jzsq_l-zcsm/)

分析

1. 采用自顶向下的搜索方式，在搜索过程中，就携带当前路线的最大最小值，然后就可以配对出最大的差值了
2. 需要注意的是，差值最低是两个节点，这个题目已经限定好了，所以在函数中不需要再做判断，但是初始化的时候要注意
3. 这里直接将根节点的值作为路径的初始 min, max 值，然后从根节点的子节点开始搜索，所以有左右节点进行，最后返回最终的结果
4. 时间复杂度: ${O(N)}$

```javascript
var maxAncestorDiff = function (root) {
  let ret = 0;

  const dfs = (root, min, max) => {
    if (!root) return;
    ret = Math.max(ret, Math.abs(max - root.val), Math.abs(root.val - min));
    min = Math.min(min, root.val);
    max = Math.max(max, root.val);
    dfs(root.left, min, max);
    dfs(root.right, min, max);
  };
  // 题目给定最少两个节点，少于两个节点也确实无法进行差值比较
  // 所以这里直接初始化的时候，根节点的值作为初始化的路径最大最小值
  dfs(root.left, root.val, root.val);
  dfs(root.right, root.val, root.val);
  return ret;
};
```

## [865. 具有所有最深节点的最小子树](https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/solution/zi-ding-xiang-xia-he-zi-di-xiang-shang-b-y0nc/)

### 分析 1 -- 求出 depth 然后匹配

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
      max = Math.max(max, depth); //求出最大深度
      return depth;
    }
    const left = dfs(root.left, depth + 1);
    const right = dfs(root.right, depth + 1);

    // 后序遍历根据左右子树的最大深度是否同时满足 max，判断是否需要替换成更大的子树
    if (left === max && right === max) {
      // 只有在两子树的最大深度同时等于最大深度的时候，才需置换节点
      ret = root;
    }
    // 后序遍历完了，到达根节点
    return Math.max(left, right); //返回的是当前节点子树中的的最大深度
  };
  dfs(root, 0);
  return ret;
};
```

### 分析 2 -- 深度不比求出来

1. 之前是用全局变量保存最大深度和最小的树，实际上在每一次递归中，我们都能得到左右子树的情况，包括子树中`最大的深度`以及`对应的最小子树`,
2. 所以递归 return 回来 `最大的深度`以及`对应的最小子树`，就可以不需要额外的变量了
3. 实际上我们根本不需要知道具体的最大深度是多少，只需要比较深度，得到最大的那个即可

```javascript
var subtreeWithAllDeepest = function (root) {
  const dfs = (root, depth) => {
    if (!root) return [root, depth];
    const [lr, ld] = dfs(root.left, depth + 1); // lr -- left root, ld -- left depth
    const [rr, rd] = dfs(root.right, depth + 1);
    if (ld === rd) return [root, ld]; // 如果左右树的最大值相同，即最大深度节点两边都有，所以要更新一下最小树节点
    if (ld > rd) return [lr, ld];
    if (ld < rd) return [rr, rd];
  };
  return dfs(root, 0);
};
```

## [1530. 好叶子节点对的数量](https://leetcode-cn.com/problems/number-of-good-leaf-nodes-pairs/solution/hou-xu-bian-li-by-jzsq_lyx-ds6a/)

分析

1. 看题求所有的好叶子节点对，既然是叶子节点之间做文章，自底向上的去求两者距离，感觉比较符合直觉
2. 后序遍历到叶子节点,开始返回，由于一个节点的叶子节点树可能不止一个，所以要用数组保存
3. 递归回来的叶子节点数组，都得更新节点到叶子节点的距离数组
4. 然后找出左右节点距离中符合要求的节点，最后将所有叶子节点合并起来返回
5. 时间复杂度 ${O(N)}$,空间复杂度 ${O(N)}$

```javascript
var countPairs = function (root, distance) {
  const ret = 0;
  const dfs = (root) => {
    if (!root) return [];
    if (!root.left && !root.right) return [0]; // 叶子节点
    // 求出叶子节点到当前节点的距离
    const left = dfs(root.left).map((i) => i + 1);
    const right = dfs(root.right).map((i) => i + 1);
    // 然后找出所有小于 dis 的节点对
    for (let l of left) {
      for (let r of right) {
        if (l + r <= distance) ret++;
      }
    }
    // 将叶子节点合起来返回回去
    return [...left, ...right];
  };
  dfs(root);
  return ret;
};
```

## [894. 所有可能的满二叉树](https://leetcode-cn.com/problems/all-possible-full-binary-trees/solution/bian-li-hou-xu-bian-li-by-jzsq_lyx-jimw/)

分析

1.  如果给定的 n 是偶数，那么直接返回空的数组，因为不能组成满二叉树，而如果只有 1 个节点，则可以返回 [node] -- 这个是边界
2.  对于每一个子树而言，都是在构建`满二叉树`,只是对应的节点数 n 有所区别而言 -- 换句话说，对于每一个子节点，都要进行一次构建满二叉树，知道边界为止
3.  每一层都是遍历分配左右树的节点数，然后使用`后续遍历`的方式遍历到边界条件处，然后开始进行处理；
4.  只有当左右节点树都存在节点的时候，才需要进行拼接，组合成新的节点数组往上递归
5.  整体就是自顶向下分配子树节点数，来求满二叉树；然后自低向上组合更新节点树，最后得到一个合规的满二叉树节点数组；
6.  时间复杂度 ${N^2}$, 每一层都需要遍历切割，切割完之后分别进行树的创建

```javascript
var allPossibleFBT = function (n) {
  const recursion = (n) => {
    if (n % 2 === 0) return []; // 偶数
    if (n === 1) return [new TreeNode(0)];
    const ret = []; // 保存当前节点下，所有满足`满二叉树`情况的节点
    for (let i = 0; i < n; i++) {
      const left_num = i,
        right_num = n - i - 1; // 之所以再减去 1 个，因为根节点占据了 1
      // 构建左树的满二叉树
      const lefts = recursion(left_num);
      const rights = recursion(right_num);
      if (lefts && rights) {
        // 必须同时存在的时候，才是满的；要不都没有
        for (let l of lefts) {
          for (let r of rights) {
            const root = new TreeNode(0);
            root.left = l;
            root.right = r;
            ret.push(root);
          }
        }
      }
    }
    return ret;
  };
  return recursion(n);
};
```

## [96. 不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/solution/bao-li-jie-fa-dp-jian-zhi-by-jzsq_lyx-1e5w/)

### 分析 -- 暴力拆分法

1. 对于 BST 中每一个子节点，他们所在的子树也是 BST，所以我们要求 [1,n] 有多少个不同的 BST， 可以拆解成 N 种方式的子树集合，比方说给定的 n == 3， 则可以拆解成 [0,2],[1,1],[2,0] 三种左右子树节点分配
2. 所以我们可以不断网下拆分，边界条件是节点数为 1 或者 0 的时候，就只有一种情况了，然后开始返回
3. 最后递归回来的值就是我们想要的值。
4. 时间复杂度 ${n^2logn}$

```javascript
var numTrees = function (n) {
  const recursion = (n) => {
    if (n === 0) return 1;
    if (n === 1) return 1;
    let temp = 0;
    for (let i = 1; i <= n; i++) {
      const l = i - 1,
        r = n - i;
      const left = recursion(l);
      const right = recursion(r);
      temp += left * right;
    }
    return temp;
  };

  return recursion(n);
};
```

### 分析 -- dp

1. 基于上面的理论，发现其实对于能够形成多少个 BST 只和有序数组数量 n 有关，而且我们最终只是求一个总值而不是各种情况的树的集合；
2. 所以在拆解过程中，会不断重复的去进行递归操作，返回对应的值，这些值其实是可以保存起来直接使用的，比方说 fn(1) = 1.fn(2) = 2 等，可以用一个集合保存起来，然后求的时候直接返回而不用再进行递归。
3. 然后就想到了使用 dp 的方式，dp[i] 表示的就是有 i 有值的有序数组可以有多少不同的 BST
4. 边界条件：dp[0] = dp[1] = 1
5. 状态转移方程: dp[i] = Sum(dp[k]\*dp[i-k]) 左右两树分别给与不同的节点数，他们之间的乘积就是其中一种情况的总和，再累加起来即可，这个时候由于前面小的 dp 值已经存在，所以可以 O(1)的形式求出 dp[k] 和 dp[i-k]
6. 时间复杂度 ${O(NlogN)}$, 空间复杂度 ${N}$

```javascript
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};
```

## [437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/solution/shuang-bian-li-by-jzsq_lyx-ht1i/)

分析
1. 关键点，路径必须向下，也就是不可以往上重复；
2. 然后起点不必是根节点，所以需要有一个 dfs 遍历不同的起点
3. 终点不一定是叶子节点，所以可能在半途就得到合规的路径，但是由于值有正有负，所以必须走到叶子节点，才能保证不遗漏
4. outer 负责前序遍历获取其实节点， inner 负责以某个子树节点为起点，找出和为 targetSum 的路径
5. 时间复杂度 ${O(NlogN)}$

```javascript
var pathSum = function (root, targetSum) {
  let ret = 0;
  const inner = (root, sum) => {
    const temp = sum + root.val;
    if (temp === targetSum) ret++;
    if (root.left) inner(root.left, temp);
    if (root.right) inner(root.right, temp);
  };

  const outer = (root) => {
    if (!root) return;
    inner(root, 0);
    outer(root.left);
    outer(root.right);
  };
  outer(root);
  return ret;
};
```
