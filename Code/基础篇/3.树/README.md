## 前言

某个男人说过 [几乎刷完了力扣所有的树题，我发现了这些东西。。。](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/thinkings/tree),而我作为一个致力称为厨师界最会写算法的前端，总得刷上一部分题，有那么一点发现吧，现在我们就来聊聊，菜鸡如我，发现了什么。

## 正文

很多大佬都推荐我们入门算法可以从`树专题`开始，然后从`树专业`放弃，那么树为什么那么的重要 -- 我也不知道，因为我不是大佬；

但是在前端中确实用到不少与树相关的的知识，比方说 DOM 树，Diff 算法，包括原型链其实都算是树，学会树，其实对于学这些知识还是有比较大的帮助的，当然我们学算法还是得考虑面试，而树恰好也是一个大重点 -- 起码在前端而言；

主要原因在于，树它华而不实，比较下里巴人，需要抽象但是又能把图画出来不至于让你毫无头绪，简单而言就是看上去很厉害，但实际上也很接地气，俗称`比较一般`；要知道做前端的面试算法，考的不就是你有么得主动学习能力，抽象能力等，但是考虑到参差不齐的前端娱乐圈，考得难吧可能就全是漏网之鱼了，所以既要筛选出鱼，但是又不能难度过大，树就是那个比较适中的，所以赶紧刷起来吧朋友们；

这里本来是要遵照 3:5:2 难度来刷，预计刷个30题就差不多，但是实际中等题刷得欲罢不能，难题是欲仙欲死，容易题是味如嚼蜡，所以 XDM 担待一下。选题主要是那个男人精选的例题以及 Leetcode 中 HOT 题和字节专题，总的来说代表性还是够的，刷完应该大概或许能够应付一下树这方面的算法了。

如果觉得有那么点帮助，请点个赞留个言，点赞超过10个就更新下一part；好吧，即便不过也会更新，就是这么臭不要脸，大家伙加油吧，欧力给！！

## 二叉树的遍历

递归遍历
1. 递归的时候前中后序都能直接处理完了
2. 递归是前中后序遍历最简单也是最容易出理解的方法，不懂的画个图就好了

迭代遍历 -- 双色标记法
1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
3. 如果遇到的节点是灰色的，则将节点输出
4. 注意这里是用 stack 栈来存储的，所以是后进先出，所以如果是中序遍历，左 - 中 - 右 ，那么在插入栈的时候要反过来 右 - 中 - 左

按照那个男人的指示，正常我们就用递归做就好，就好像我们做非排序题排序的时候，sort 一下就好了，但是一旦面试官问到用另外的迭代方式的时候，我们再套个模板，会比记住多个迭代写法要简单，毕竟内存容量有限，而后续遍历的迭代写法确实挺坑的，能省一点内存就省一点吧


### [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/)

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

### [1.94 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```javascript
// 94. 二叉树的中序遍历

/**
 * @分析
 * 1. 递归的时候前中后序都能直接处理完了
 * 2. 递归是前中后序遍历最简单也是最容易出理解的方法，不懂的画个图就好了
 */
var inorderTraversal = function(root) {
    const ret  = []
    const recursion = root => {
        if(!root) return
        recursion(root.left)
        // 这里是中序，所以在两个递归之间，如果是前序就在前面，后序就在后面
        ret.push(root.val)
        recursion(root.right)
    }
    recursion(root)
    return ret
};

/**
 * @分析 -- 迭代 -- 双色标记法
 * 1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
 * 2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
 * 3. 如果遇到的节点是灰色的，则将节点输出
 * 4. 注意这里是用 stack 栈来存储的，所以是后进先出，所以如果是中序遍历，左 - 中 - 右 ，那么在插入栈的时候要反过来 右 - 中 - 左
 */
var inorderTraversal = function(root) {
    const ret  = []
    const stack = []
    stack.push([root,0]) // 0 是白色未处理的，1 是灰色处理过的
    while(stack.length) {
        const  [root,color] = stack.pop()
        if(root){
            if(color === 0){
                // 遇到白球，则插入 -- 中序遍历
                stack.push([root.right,0])
                stack.push([root,1])
                stack.push([root.left,0])
            }else{
                // 遇到灰球，则收网
                ret.push(root.val)
            }
        } 
    }
    return ret
};
```

### [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/submissions/)

```javascript
// 145. 二叉树的后序遍历

/**
 * @分析 -- 递归
 */
var postorderTraversal = function(root) {
    const ret = []
    const dfs = (root) => {
        if(!root) return 
        dfs(root.left)
        dfs(root.right)
        ret.push(root.val)
    }
    dfs(root)
    return ret
};

/**
 * @分析 -- 迭代 -- 双色球
 */
var postorderTraversal = function(root) {
    const ret = []
    const stack = []
    stack.push([root,0])
    while(stack.length){
        const [root,color] = stack.pop()
        if(root) {
            if(color === 0){
                stack.push([root,1])
                stack.push([root.right,0])
                stack.push([root.left,0])
            }else{
                ret.push(root.val)
            }
        } 
    }
    return ret
}
```


## 刷题过程一些疑惑点

### 自顶向下(前序遍历)和自低向上(后续遍历)

这两个名词在很多讲树的题解中经常会出现，而这与我们遍历树求值到底关联点在哪里，慢慢刷题之后我发现，虽然 dfs 有三种形式，但在抽象到具体题目的时候，其实是属于不同的方法的。

对于`前序遍历`而言，就是先获取到根节点的信息，然后做了一定编码后，再向下遍历，这种遍历方式就是所谓的 `自顶向下` 的思维，我们从根节点开始，可以携带一定的信息，再继续往下遍历时，先处理，得到临时性结果，给顶层的节点作为信息；

对于`自顶向下`的遍历而已，遍历到根节点，就处理结束所有的节点，也相应的得到预期结果了，所以一般使用`前序遍历`方法解题的，都会声明一个全局变量，然后遍历完之后，返回这个值.

例子:[563. 二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/solution/zi-di-xiang-shang-by-jzsq_lyx-24re/)
```javascript
分析
1. 自底向上返回子树值之和，然后求出对应的坡度，累加起来即可.
2. 需要注意的是，左右子树的累加值大小不确定，需要用绝对值
3. 时间复杂度 ${O(N)}$

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

对于`后序遍历` 而言，是想遍历到叶子节点，然后再向上去处理根节点，也就是所谓的 `自底向上` ；

实际上，`自底向上`是一种递归的方法，先`递` 到叶子节点，处理完返回一定的值，再`归`回来，后续的处理都是根据子树的值作为入参的，所以不要被 `遍历` 迷惑，`后续遍历` 可不是遍历完就结束了，那才刚刚开始呢。

所以后面为了区分，在处理`自底向上`题目的时候，函数名字都不再使用 dfs，而是直接使用 recursion ；

例子: 


### 判断遍历到边界，什么在叶子节点处判断，什么时候直接跑到 null 返回？

先来解释一下，在做 dfs 遍历的时候，我们需要遍历到叶子节点，然后做最终的处理，有的题目我们看到的是判 `null` 时返回 null/0 等；有的时候我们直接判断是否叶子节点，`if(!root.left && !root.right)`；

这是在刷题过程中感觉忒迷惑的地方，在最开始的时候，我喜欢使用 null ，因为它写的更少，而且顺便把根节点为空的边界也做了，最近刷的时候我开始觉得`判断节点`会更稳妥一点，而且不用做更深的处理，直到我再写👆上面的文字时，有那么一点想法

在我们使用`自底向上`的时候，因为需要从子节点中 return 值，这个时候即便是 null 也是`有用`的，所以使用 `null` 基本是 OK 的。


例子: [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/ceng-xu-bian-li-zi-ding-xiang-xia-de-dfs-hjvi/)
```javascript

/**
 * 1. 自顶向下，带个层数参数，判定为叶子节点就进行最大值判断
 */
var maxDepth = function (root) {
  if (!root) return 0;
  let ret = 0;
  const dfs = (root, depth) => {
    if (root.left) dfs(root.left, depth + 1);
    if (root.right) dfs(root.right, depth + 1);
    ret = Math.max(ret, depth);
    return;
  };
  dfs(root, 1);
  return ret;
};

// 自低向上
var maxDepth = function (root) {
  const dfs = (root) => {
    if (!root) return 0;
    return Math.max(dfs(root.left), dfs(root.right))+1;
  };
  return dfs(root);
};

```

而在一些携带数据，`自顶向下`求值的题目中，如果跑到 `null` 才结束遍历，就比较容易出现重复计算的错误，而且由于不需要获取 return 值，这个时候我建议是使用`判断节点`的方法。

例子:[1022. 从根到叶的二进制数之和](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/solution/zi-ding-xiang-xia-qiu-zhi-by-jzsq_lyx-wsyc/)
```javascript

/**
 * @分析
 * 1. 自顶向下求出每一条路当前对应的数字，保存在入参中
 * 2. 在叶子节点处将值累加起来即可
 * 3. 需要注意的是，要在叶子节点就处理，而不是在 null 的时候处理，不然会重复计算
 */
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

## 简单题
### [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/solution/dfs-di-gui-by-jzsq_lyx-92hj/)
分析
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

### [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/ceng-xu-bian-li-zi-ding-xiang-xia-de-dfs-hjvi/)

- 使用树的三种搜索方式，层序，自顶向下的 dfs，自底向上的递归 dfs

#### 层序遍历

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

#### dfs -- 自顶向下

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

#### 递归 -- 自低向上

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

### [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/solution/zi-di-xiang-shang-de-dfs-by-jzsq_lyx-gvrc/)

分析 -- 自底向上

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

### [563. 二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/solution/zi-di-xiang-shang-by-jzsq_lyx-24re/)

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

### [1022. 从根到叶的二进制数之和](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/solution/zi-ding-xiang-xia-qiu-zhi-by-jzsq_lyx-wsyc/)

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

### [783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/solution/zhong-xu-bian-li-by-jzsq_lyx-kwrf/)

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

## 中等题

### [662. 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/solution/wan-quan-er-cha-shu-ji-lu-jie-dian-xia-b-hcsg/)

分析 -- 基于完全二叉树的特性
1. 求宽度，盲猜用层序遍历比较合适，但是啥时候加 null 是个体面活
2. 这里有一个降难度的点 -- 该层最左和最右的非空节点，两端点间的null节点也计入长度 -- 也就是在遍历存在节点的一层时，第一个节点肯定是存在，最后一个节点也是
3. 虽然左侧节点确定了，但是右侧节点大小不确定啊，中间存在有多少个 null，后面是否存在一个节点隔开了n个 null都不确定，这个时候可以考虑把树当成是完全二叉树，然后所有的节点再带一个 pos 属性
4. 我们以 1 作为根节点 root 的 pos，左节点就是 2n, 右节点是 2n+1
5. 注意，由于节点 pos 的值是呈现指数级别上升的，即 2^k, 其中 k 是树的深度，我们又知道当 2^53 之后，精度会丢失，
6. 所以坑爹的就是，输入可以是先右树走1个节点53次，然后第 54层开始来真实值，酱紫前面 53 层的宽度都是1，从 54 层开始需要开始计算，但是这个时候，pos 已经超出 JS 的 Number 类型的计算极限了
6. 这个时候我们考虑使用 js 的新的基本类型 BigInt 作为节点 pos 的值，但是又由于数字类型和大数类型之间是不能进行运算的，所以最后求值的时候，要进行响相应的转换。

```javascript
// 662. 二叉树最大宽度
var widthOfBinaryTree = function (root) {
  const queue = [];
  queue.push([root, 1n]);
  let max = 0;
  let steps = 0,
    curDepth = 0; // 这是用来确定第一个节点的
  let leftPos = 0n; // 每一次左侧节点的位置
  while (queue.length) {
    // 层数+1
    steps++;
    // 如果还有层
    let len = queue.length;
    while (len--) {
      // 开始一层的遍历了
      const [root, pos] = queue.shift(); // 取出节点
      if (root) {
        // 只要有子节点，那么即便有一个不存在，也得放到队列中
        queue.push([root.left, 2n * pos]);
        queue.push([root.right, 2n * pos + 1n]);

        if (curDepth !== steps) {
          // 第一个节点
          curDepth = steps; // 这个时候更新一下深度
          leftPos = pos; // 左侧节点的位置
        }
        // 每一个存在的节点，都会不断进行更新
        // 由于 bigInt 和 number 是不能进行数学运算的，所以先将 bigint 转成字符串类型，然后隐式转成数字，然后进行比较
        max = Math.max(max, (pos - leftPos + 1n).toString());
      }
    }
  }

  return max;
};

```

### [971. 翻转二叉树以匹配先序遍历](https://leetcode-cn.com/problems/flip-binary-tree-to-match-preorder-traversal/solution/qian-xu-bian-li-shu-de-fan-zhuan-by-jzsq-l485/)
分析:
1. 我觉得本题最大的难点是读题，理解题意，首先对于树的翻转概念，可以先去一道简单题 [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/solution/zi-di-xiang-shang-de-dfs-by-jzsq_lyx-gvrc/) 了解一下。
2. 这里的翻转涉及到的是根节点是否要翻转左右树，所以在遍历过程中，肯定是以根节点作为入参，然后进行一系列逻辑的，毕竟如果需要翻转的时候，ret 要存的是根节点
3. 这里给出了一个待操作的树 A 的根节点 root， 和树 V 先序遍历的数组，然后求的是 A 能否翻转最少的 n 个节点，使得 A 和 V 一致。OK，现在其实就是开始前序遍历树 V，然后用 V 的值去匹配 A， 看看能否进行树的匹配
4. 对于一次遍历，我们首先判断根节点的值是一致，才会进入这一次的遍历中，然后主要是看左右树，对于树 V 来说，用 pos 不断按照先序遍历给出值，而对于 V 来说，你可以用左树匹配，如果匹配成功，则啥事没有，大家是一样的；而如果左树不匹配，用右树先行，然后再走左树，这种情况就需要翻转一下当前的节点，保证树 A 要在前序遍历的情况和 V 匹配；
5. 如果在匹配过程中 A 的左右树都没有匹配成功，则会提取走出 A 的遍历，这个时候 pos 就没有迭代完，这个时候就是异常，返回 [-1]
6. 时间复杂度 ${O(N)}$
```javascript
 var flipMatchVoyage = function(root, voyage) {
    if(root.val !== voyage[0]) return [-1] // 用来在进入 dfs 前对根节点的判断
    const ret = [] 
    let pos = 0 // 这是用来获取 voyage 值，也是遍历树 V 的，如果没有走完，证明无法匹配 root
    const dfs = root => {
        // 每一次的遍历 pos 都要跟随着
        pos++ 
        // 对于每一个节点，都是按照先序遍历的写法
        if(root.left && root.left.val === voyage[pos] ){
            // 如果在这节点左树适配，那就继续走，因为这是先序遍历
            dfs(root.left)
        }
        if(root.right && root.right.val === voyage[pos] ){
            dfs(root.right)
            // 右树完成之后，需要看看现在 pos 所在的值是否可以匹配左树，即是否先走右树再走左树，成立即当前的 root 节点就是需要进行翻转的节点
            if(root.left && root.left.val === voyage[pos] ){
                ret.push(root.val)
                dfs(root.left)
            }
        }
    }

    dfs(root)
    if(pos<voyage.length){
        // voyage 还没有走完，就被限制条件卡住了
        return [-1]
    }
    
    return ret
};
```

### [863. 二叉树中所有距离为 K 的结点](https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/solution/zi-ding-xiang-xia-she-zhi-zhi-zhen-zi-di-yrjb/)

分析
1. 简单分解一下，如果题目改成 `找到距离根节点 K 的节点` ，是不是一下就可以找到，从根节点出发，走 K 步就好了
2. 在稍微延伸一下，`找出距离节点 target K 的子节点`，那么也一样，就是只能从子节点中去找，这道题之所以能成为 medium，就是因为它的 target 不一定是根节点，同时它可以往上去找；
3. 对于简单的二叉树，是没法子根据子节点找打它的父节点的，就好像单向链表无法根据 current 节点找到上一个节点 prev 一样，那么我们可以自己造一个，想想经典的 diff 算法，很多时候我们在用树的时候，都需要直接找到父节点的，所以这里第一步就是为 root 到 target 节点造指针 parent
4. 在正式开始寻找的时候，需要注意的时候，当我们从底往上找父节点作为根节点，然后再自顶向下找子节点的过程，会有重复取值的危险，所以需要有一个变量存储向上取父节点时的节点，然后再每一次想下找值的时候，避开这些节点

```javascript
var distanceK = function (root, target, k) {
  let targetNode = undefined;
  // 第一个 dfs ，是为了在 根节点 -> target 之间的的节点打上 parent 的指针，方便从下往上找
  const setDfs = (root) => {
    if (root === target) {
      // 找到了, 就让剩下的搜索停止
      targetNode = root;
    }
    if (root.left && !targetNode) {
      root.left.parent = root;
      setDfs(root.left);
    }
    if (root.right && !targetNode) {
      root.right.parent = root;
      setDfs(root.right);
    }
  };
  setDfs(root);

  const ret = [];
  const paths = []; // 向上取父节点时，走过节点

  // 从上往下去找, 其中 index 表示距离 target 的距离
  const find = (root, index) => {
    if (index === k) {
      ret.push(root.val);
    }
    if (index < k) {
      if (root.left && !paths[root.left.val]) find(root.left, index + 1);
      if (root.right && !paths[root.right.val]) find(root.right, index + 1);
    }
  };

  let index = 0;
  while (targetNode && index <= k) {
    // 记录向上取的父节点
    paths[targetNode.val] = targetNode.val;
    // 从根节点向下求取合适的值
    find(targetNode, index);
    targetNode = targetNode.parent;
    // 每网上一次，就要将节点走一次
    index++;
  }

  return ret;
};

```


### [面试题 04.06. 后继者](https://leetcode-cn.com/problems/successor-lcci/solution/zhong-xu-bian-li-by-jzsq_lyx-ya15/)

分析
 1. 根据中序遍历，将所有的节点都保存到数组中，然后找到 P 的时候，保存下一个值的下标，然后遍历结束后，从数组中取即可
 2. 时间和空间复杂度都是 ${O(N)}$

```javascript
 var inorderSuccessor = function(root, p) {
    if(!root) return null
    let arr = []
    let ret = 0
    const dfs = (root) => {
        if(!root) return 
        dfs(root.left)
        arr.push(root)
        if(root === p) {
            ret = arr.length
        }
        dfs(root.right)

    }
     dfs(root)
     return arr[ret] || null 
};
```

### [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/solution/bst-te-xing-qiu-jie-by-jzsq_lyx-dzhi/)
分析
1. 二叉搜索树的特征: 根节点大于左节点，小于右节点
2. 前序遍历过程中，是单增的过程；
3. 我们不需要维护一个数组，只需要维护上一个值做大小判断就好
4. 所以前序遍历过程中，然后和一个全局遍历进行大小比较即可；

```javascript
 var isValidBST = function(root) {
    if(!root) return false
    let pre = -Infinity //最小值
    let ret = true // 默认就是
    const inorder  = (root) => {
     
        if(root.left && ret) inorder(root.left)
           if(root.val<=pre) {
            ret = false // 一旦有一组失败，都不是 BST
            return
        }else {
            pre = root.val
        }
        if(root.right && ret) inorder(root.right)
    }
    inorder(root)
    return ret
};
```

### [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/solution/bao-li-by-jzsq_lyx-sjai/)

分析
1. 既然提示使用 ${O(N)}$ 空间复杂度很容易实现，那就是如果直接用数组保存中序遍历的数组，得到结果比较简单，所以我们就来一下暴力解法
2. 先中序遍历得到一个节点数组
3. 这个数组的值肯定不是单增的，那么就是存在两个值和排序后不一样，所以另开一个数组存储值，排序后，再比对，然后改变节点的对应的值
4. 时间复杂度 ${O(nlogn)}$, 空间复杂度 ${O(N)}$
```javascript
// 暴力法 -- 空间复杂度为 ${O(N)}$
var recoverTree = function(root) {
    const ret = []
    const dfs = (root) => {
        if(!root) return
        dfs(root.left)
        ret.push(root)
        dfs(root.right)
    }
    dfs(root);

    // 移动两个值，使得数组 ret 单增
    // 另开一个数组 ret2，排序
    let sorted = ret.map(item => item.val)
    sorted.sort((a,b)=> a-b)
    sorted.forEach((sorted,index) => {
        if(sorted !== ret[index].val) {
            ret[index].val = sorted
        }
    })
};
```

### [222. 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/submissions/)
直接遍历一次就可以得到节点的数量

```javascript
var countNodes = function(root) {
    let ret = 0
    const preorder =  root => {
        if(!root) return 
        ret++
        preorder(root.left)
        preorder(root.right)
    }
    preorder(root)
    return ret
};
```

### [面试题 04.12. 求和路径](https://leetcode-cn.com/problems/paths-with-sum-lcci/solution/shuang-zhi-zhen-shuang-dfs-by-jzsq_lyx-4d6m/)

分析 -- 双 dfs
1. 起始点不限制，但是路径必须是向下，也就不能倒转网上走
2. 两个 dfs，一个指向起始节点，一个以起始节点为根节点往下找
3. 注意1：这里的值是任意值，所以不能用超出值或者取到路径就接续 dfs，而是必须要扫到叶子节点
4. 时间复杂度 ${O(NlogN)}$ 相当于树中的每一个节点都当了初始节点，然后去遍历子树(find)

```javascript
var pathSum = function (root, sum) {
  let ret = 0;

  // 遍历节点的 dfs
  const dfs = (root) => {
    if (!root) return;
    find(root, 0);
    dfs(root.left);
    dfs(root.right);
  };

  const find = (root, total) => {
    total += root;
    // if (total > sum) return; // 结束这跳线 -- 这里
    if (total === sum) {
      // 符合条件
      ret++;
      //   return; 
    }
    if (root.left) find(root.left, total);
    if (root.right) find(root.right, total);
  };

  dfs(root);
  return ret;
};

```

### [129. 求根节点到叶节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/solution/qian-xu-bian-li-by-jzsq_lyx-ui9b/)

分析：
1. 这里实际考察的就是按要求从根节点走到叶子节点，而所谓的数字相加只是一种形式
2. 显然使用前序遍历，每一次先处理根节点的值，然后再处理左右节点的值，符合题意
3. 时间复杂度 ${O(N)}$
```javascript
var sumNumbers = function (root) {
    let ret = 0
    const dfs = (root,num) => {
        let cur = num*10+root.val
        if(!root.left && !root.right) {
            // 叶子节点 -- 这里判断有节点才走，主要是为了找到叶子节点，而不是到叶子结点下的 null，这样会重复计算
            ret+=cur
        }
        if(root.left) dfs(root.left,cur)
        if(root.right) dfs(root.right,cur)
    }

    dfs(root,0)
    return ret
}
```

### [1448. 统计二叉树中好节点的数目](https://leetcode-cn.com/problems/count-good-nodes-in-binary-tree/solution/qian-xu-bian-li-by-jzsq_lyx-pwwn/)

分析
1. 将题目转化，在前序遍历过程中，维护一个最大值，如果在整条路径中的最大值小于等于当前节点的值，那么这个节点就是号节点
2. 只有是好节点的时候，才需要替换最大值，然后遍历完就可以找出所有的号节点
3. 时间复杂度 ${O(N)}$


```javascript
var goodNodes = function(root) {
    let ret = 0

    const dfs = (root,max) => {
        if(root.val>=max) {
            ret++
            max = ret
        }
        if(root.left) dfs(root.left,max)
        if(root.right) dfs(root.right,max)
    }

    dfs(root,-Infinity)
    return ret
};
```

### [814. 二叉树剪枝](https://leetcode-cn.com/problems/binary-tree-pruning/solution/zi-di-xiang-shang-di-gui-by-jzsq_lyx-yz0j/)

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

### [1325. 删除给定值的叶子节点](https://leetcode-cn.com/problems/delete-leaves-with-a-given-value/solution/er-cha-shu-jian-zhi-by-jzsq_lyx-v8ez/)

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

### [1026.节点与其祖先之间的最大差值](https://leetcode-cn.com/problems/maximum-difference-between-node-and-ancestor/solution/zi-ding-xiang-xia-qiu-chai-zhi-by-jzsq_l-zcsm/)

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

### [865. 具有所有最深节点的最小子树](https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/solution/zi-ding-xiang-xia-he-zi-di-xiang-shang-b-y0nc/)

#### 分析 1 -- 求出 depth 然后匹配

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

#### 分析 2 -- 深度不比求出来

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

### [1530. 好叶子节点对的数量](https://leetcode-cn.com/problems/number-of-good-leaf-nodes-pairs/solution/hou-xu-bian-li-by-jzsq_lyx-ds6a/)
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

### [894. 所有可能的满二叉树](https://leetcode-cn.com/problems/all-possible-full-binary-trees/solution/bian-li-hou-xu-bian-li-by-jzsq_lyx-jimw/)
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

### [96. 不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/solution/bao-li-jie-fa-dp-jian-zhi-by-jzsq_lyx-1e5w/)
#### 分析 -- 暴力拆分法
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
#### 分析 -- dp
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

### [437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/solution/shuang-bian-li-by-jzsq_lyx-ht1i/)
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

## 困难题

### [987. 二叉树的垂序遍历](https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/solution/mapbfs-by-jzsq_lyx-4jq1/)
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

### [2.剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/solution/shu-de-xu-lie-hua-by-jzsq_lyx-stqq/)
- 这道题其实就是让你了解一下，为啥我们做树题的时候，明明在做树题（或者链表）这些题目的时候，控制台的例子都是数组，而不是一个可视化的树结构的数据，之前我一直很难理解，直到了解到序列化和反序列化之后。
- 个人理解这是为了兼容不同语言内置数据结构的不同而做出来的优化策略，比方说 JS 就没有树这种结构，所以我们在做树的时候，需要自己构建一个类，然后用我们常用的数据结构转成树，然后再进行运算，而这个过程，其实就是树的反序列化。而数组，字符串这些作为基本数据结构，几乎在常用语言中都会内置，所以就成了树这些结构序列化结构的优先选择。

#### 分析 -- 序列化 -- 节点转成字符串
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
#### 分析 -- 反序列化 -- 字符串转成节点
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


### [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/solution/er-cha-shu-de-zui-da-lu-jing-he-by-jzsq_-e1th/)
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

### [834. 树中距离之和](https://leetcode-cn.com/problems/sum-of-distances-in-tree/solution/qian-xu-hou-xu-de-shi-yong-by-jzsq_lyx-kx2f/)
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




