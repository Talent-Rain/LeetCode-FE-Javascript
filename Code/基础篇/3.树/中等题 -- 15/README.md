<!--
 * @Author: your name
 * @Date: 2021-08-01 10:35:44
 * @LastEditTime: 2021-08-02 09:46:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/中等题 -- 18/README.md
-->



## [1. 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/solution/wan-quan-er-cha-shu-ji-lu-jie-dian-xia-b-hcsg/)

### 基于完全二叉树的特性
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

## [971. 翻转二叉树以匹配先序遍历](https://leetcode-cn.com/problems/flip-binary-tree-to-match-preorder-traversal/solution/qian-xu-bian-li-shu-de-fan-zhuan-by-jzsq-l485/)
分析:
1. 我觉得本题最大的难点是读题，理解题意，首先对于树的翻转概念，可以先去一道简单题 [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/solution/zi-di-xiang-shang-de-dfs-by-jzsq_lyx-gvrc/) 了解一下。
2. 这里的翻转涉及到的是根节点是否要翻转左右树，所以在遍历过程中，肯定是以根节点作为入参，然后进行一系列逻辑的，毕竟如果需要翻转的时候，ret 要存的是根节点
3. 这里给出了一个待操作的树 A 的根节点 root， 和树 V 先序遍历的数组，然后求的是 A 能否翻转最少的 n 个节点，使得 A 和 V 一致。OK，现在其实就是开始前序遍历树 V，然后用 V 的值去匹配 A， 看看能否进行树的匹配
4. 对于一次遍历，我们首先判断根节点的值是一致，才会进入这一次的遍历中，然后主要是看左右树，对于树 V 来说，用 pos 不断按照先序遍历给出值，而对于 V 来说，你可以用左树匹配，如果匹配成功，则啥事没有，大家是一样的；而如果左树不匹配，用右树先行，然后再走左树，这种情况就需要翻转一下当前的节点，保证树 A 要在前序遍历的情况和 V 匹配；
5. 如果在匹配过程中 A 的左右树都没有匹配成功，则会提取走出 A 的遍历，这个时候 pos 就没有迭代完，这个时候就是异常，返回 [-1]
6. 时间复杂度 ${O(N)}$
```javascript
// 971. 翻转二叉树以匹配先序遍历

/**
 * @分析
 * 1. voyage 是一棵树 V 的先序遍历数组，而我们现在希望能够在翻转 root 多个节点之后，最后得到树 V
 * 2. 
 */
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

## [863. 二叉树中所有距离为 K 的结点](https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/solution/zi-ding-xiang-xia-she-zhi-zhi-zhen-zi-di-yrjb/)

分析
1. 简单分解一下，如果题目改成 `找到距离根节点 K 的节点` ，是不是一下就可以找到，从根节点出发，走 K 步就好了
2. 在稍微延伸一下，`找出距离节点 target K 的子节点`，那么也一样，就是只能从子节点中去找，这道题之所以能成为 medium，就是因为它的 target 不一定是根节点，同时它可以往上去找；
3. 对于简单的二叉树，是没法子根据子节点找打它的父节点的，就好像单向链表无法根据 current 节点找到上一个节点 prev 一样，那么我们可以自己造一个，想想经典的 diff 算法，很多时候我们在用树的时候，都需要直接找到父节点的，所以这里第一步就是为 root 到 target 节点造指针 parent
4. 在正式开始寻找的时候，需要注意的时候，当我们从底往上找父节点作为根节点，然后再自顶向下找子节点的过程，会有重复取值的危险，所以需要有一个变量存储向上取父节点时的节点，然后再每一次想下找值的时候，避开这些节点

```javascript
// 863. 二叉树中所有距离为 K 的结点

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


## [面试题 04.06. 后继者](https://leetcode-cn.com/problems/successor-lcci/solution/zhong-xu-bian-li-by-jzsq_lyx-ya15/)

分析
 1. 根据中序遍历，将所有的节点都保存到数组中，然后找到 P 的时候，保存下一个值的下标，然后遍历结束后，从数组中取即可
 2. 时间和空间复杂度都是 ${O(N)}$

```javascript
// 面试题 04.06. 后继者

/**
 * @分析
 * 1. 根据中序遍历，找出节点 P 下一个节点 Q；
 */
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

## [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/solution/bst-te-xing-qiu-jie-by-jzsq_lyx-dzhi/)
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



## [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/solution/bao-li-by-jzsq_lyx-sjai/)

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

## [222. 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/submissions/)

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