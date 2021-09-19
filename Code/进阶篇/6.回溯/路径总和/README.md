### [112. 路径总和](https://leetcode-cn.com/problems/path-sum/)
分析
1. 路径是 root-leaf 完整路线上的和为 target 
2. dfs 中序遍历走下去即可
3. 时间复杂度 ${O(n)}$
```javascript
 var hasPathSum = function(root, targetSum) {
    let ret = false
    const dfs = (root,sum) => {
        if(ret || !root) return  // 只要一条路走通了，其他都不用走了
        sum += root.val
        if(!root.left && !root.right && sum  === targetSum) {
                ret = true
                return 
        }
        if(root.left) dfs(root.left,sum)
        if(root.right) dfs(root.right,sum)
    }
    dfs(root,0)
    return ret
};
```

### [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)
 分析
 1. 找的还是 root - leaf 的路径，但是这一次要把找的所有符合要求的路径都保存起来
 2. 时间复杂度 ${O(n)}$
```javascript
 var pathSum = function(root, targetSum) {
    const ret = []
    const dfs = (root,arr,sum) => {
        if(!root) return 
        sum+=root.val
        arr = [...arr,root.val]
        if(!root.left && !root.right && sum == targetSum){
            ret.push(arr)
        }
        if(root.left) dfs(root.left,[...arr],sum)
        if(root.right) dfs(root.right,[...arr],sum)
    }
    dfs(root,[],0)
    return ret
};
```

### [437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/solution/shuang-zhi-zhen-die-dai-by-jzsq_lyx-8jgq/)
分析
1. 这次找的路径可以是树中任意 `起始-结束` 节点,；
2. 但是路径必须是向下的，也就是不能是 a.left - a - a.right 的样子，这其实是减轻难度的限制条件
3. 所以还是一样的自顶向下遍历就好，但是遇到满足需求的路径，还是要继续遍历到叶子节点位置
4. 和 [112. 路径总和](https://leetcode-cn.com/problems/path-sum/) 与 [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/) 最大不同是，这一次的路径是不限制起始点和终点的；
5. 不限制终点，那么我可以在遍历过程中，只要满足 targetSum, 就记录一次，一直到叶子节点位置，不需要到了叶子节点再判断
6. 而不限制起始点是根节点，那么就是可以以任意节点为起始点，也就是需要遍历整一棵树作为起始点时候，往下去找路径了；
7. 时间复杂度${O(nlogn)}$
```javascript

var pathSum = function (root, targetSum) {
  let ret = 0;
  // 这是以任意 root 节点找路径和的 dfs
  const dfs = (root, sum) => {
    if (!root) return;
    sum += root.val;
    if (sum === targetSum) ret++;
    if (!root.left && !root.right) return; // 叶子节点了，结束
    if (root.left) dfs(root.left, sum);
    if (root.right) dfs(root.right, sum);
  };

  //   这是遍历整棵树，然后继续往下走
  const outer = (root) => {
    if (!root) return;
    dfs(root, 0);
    outer(root.left);
    outer(root.right);
  };
  outer(root);
  return ret;
};

```