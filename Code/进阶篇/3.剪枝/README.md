<!--
 * @Author: your name
 * @Date: 2021-07-19 08:48:28
 * @LastEditTime: 2021-07-22 10:04:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/剪枝/README.md
-->


## [814. 二叉树剪枝](https://leetcode-cn.com/problems/binary-tree-pruning/solution/hou-xu-bian-li-or-jian-zhi-by-jzsq_lyx-h7tl/)
### 分析
1. 通过 dfs 获取到当前节点的左右树的情况，然后判断当前节点最后的返回值
2. 只有当左右树和当前节点都为为 0 的时候，当前节点才会返回 null，否则的话都说返回递归回来的子树
3. 这里所谓用到剪枝，是因为自底向上遍历过程中，只要当前节点某一子树么得了，那么这个节点最后返回去的对应子树，也不会存在被删除的子树，即上一层的父节点不比再次判断被删除的孙子子树节点，所以也算是剪枝了；
3. 时间复杂度：${O(N)}$ -- N 是节点数，空间复杂度 ${O(h)}$ -- h 是树的高度，因为创建了 h 个 dfs 函数
```javascript
// 814. 二叉树剪枝

var pruneTree = function(root) {
    const dfs = root => {
        if(root.left) root.left = dfs(root.left)
        if(root.right) root.right = dfs(root.right)
        if(!root.left && !root.right && !root.val) return null 
        return root
    }
    return dfs(root)
};

```

## [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-jian-zhi-by-jzsq_lyx-01vx/)
### 分析
1. 求子数组和为 target 的集合，因为涉及到了组合，所以最好先给初始数组排个序，这样后续回溯的时候比较好剪枝；排序：${O(NlogN)}$
2. 从高到低进行排序后，dfs 遍历，一但遇到大于等于 target 的总和，就返回从新取
3. 这里需要注意的是，由于值不能完全一致，而我们从 0-N 下标取值都是从高到低的，所以取了低位的值，下一次取值就只能取低位以下的值，否则就会出现重复的数组，这里就用到了剪枝，剪掉所有当前值之前坐标的值，具体做法是在遍历的时候带一个下标值 start
4. 空间复杂度 ${N}$ -- N 是 candidates 的长度，时间复杂度 ${O(NlogN)}$
```javascript
// 39. 组合总和

var combinationSum = function(candidates, target) {
    const len  = candidates.length
    const ret = []
    candidates.sort((a,b) => b-a) // 排个序 -- 从大到小
    const dfs = (sum,arr,start) => {
        if(sum === target) {
            ret.push(arr)
            return
        }
        if(sum>target) return 

        // 只能取当前或低位以下的值
        for(let i = start;i<len;i++){
            dfs(sum+candidates[i],arr.concat(candidates[i]),i)
        }
        
    }
    dfs(0,[],0)
    return ret
};

// 测试
console.log(combinationSum([2,3,6,7],7))
console.log(combinationSum([2,3,5],8))
```

## [40. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/solution/hui-su-jian-zhi-by-jzsq_lyx-cmt4/)
### 分析
- 和 39 题相比，这里不允许重复取值，每个值只能用一次，所以 dfs 越往下走，可以选的值越少
- 为了能够在某一时刻砍掉一整段的子树，这里排序用单增，这样一旦取得的值合适或者超出预期，那么剩下的遍历就可以一起砍掉了，因为后面的值肯定不符合条件了
- 需要注意的是，39题是直接暴力排序然后剪枝，这里是回溯后剪枝，所以回溯之后需要注意值的去重问题，一旦回溯值和下一个要取的值一样，那么就得跳过这个值。
- 最后回溯如果有返回值 -1，则表示当前的循环可以跳出了，接着走下一个回溯，直到所有遍历结束。

```javascript
// 40. 组合总和 II

/**
 * @分析 -- 不允许重复使用
 * 1.
 */
var combinationSum2 = function (candidates, target) {
  const len = candidates.length;
  candidates.sort((a, b) => a-b); // 排序 -- 从小到大
  const ret = [];
  const dfs = (index, sum, arr) => {
    if (sum === target) {
      ret.push(arr);
      return -1
    }
    if (sum > target || index >= len) {
      return -1
    }

    while(index<len){
        const temp = candidates[index]
        const res = dfs(++index, sum + temp, arr.concat(temp));
        // 回溯过程中，如果回溯值和下一个取值相等时，需要去重
        while(temp === candidates[index]){
            index++ //去重，返回之后再取的时候，不能取重复的
        }
        // 由于是从小到大，所以一旦 res 有值，证明后面的的子树都没用了，直接剪掉
        if(res === -1) return 
    }
   
  };
  dfs(0, 0, []);
  return ret
};

// 测试
console.log(combinationSum2([10,1,2,7,6,1,5],8))
console.log(combinationSum2([2,5,2,1,2],5))
console.log(combinationSum2([3,1,3,5,1,1],8))
```


## [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-jian-zhi-by-jzsq_lyx-7efc/)
### 分析 -- 使用 arr 保存使用到的下标值

- 在外层保存一个长度 N 的数组，数组的值表示  nums 已经被使用的情况，其中 1 表示已经被使用过
- 使用回溯的方式不断为临时数组temp 添加值，每一次迭代的时候从参考 visited，将被使用过的值剪掉
- 注意的是，如果是回溯回来的值，要保证下一次迭代的值和回溯回来的值不一样，防止重复获取，所以需要做 `nums[i] === nums[i-1] && !visited[i-1]` 判断
- 时间复杂度: ${O(NlogN)}$ 其中 N 是nums 的长度；空间复杂度 ${O(NlogN)}$ 因为每一层 N 是长度都是会递增的

```javascript

var permuteUnique = function(nums) {
    const len = nums.length
    const ret = []
    const visited = new Array(len).fill(0) // 用来保存已经记录到临时数组的下标值,下标为 1 代表已经用了
    nums.sort((a,b) => a-b) // 排序，这样才能在回溯的时候，防止在相同的位置注入一样的值，导致重复排列的出现
    const recursion = (temp) => {
        if(temp.length === len) {
            ret.push(temp);
            return 
        }

        for(let i=0;i<len;i++){
            // 下标值已经取了，值在 temp 里了
            if(visited[i]) continue 
            // 如果当前值和上一个值相等且 visited 中没有上一个值的下标 i-1,证明当前状态是回溯回来后，去掉上一个 i-1 值，继续往下取的情况
            // 这个时候就需要去重，防止临时数组的当前值重复取；
            if(nums[i] === nums[i-1] && !visited[i-1]) continue 
            visited[i] = 1
            recursion([...temp,nums[i]])
            visited[i] = 0 // 回溯回来之后，将下标去掉
        }
    }
    recursion([])
    return ret
};
```

### 分析 -- 简单暴力法
- 有的时候没有想到用全局变量来处理，那么就简单粗暴的将所有可能发生的情况列出来，每一次迭代都保存剩余可以取的数组
- 迭代的入参初了取值的临时数组，还有一个是剩余可取值的 restArr，这样每一层都只需要变量剩余数组，也能达到剪枝的效果
- 需要注意的是，每一层取向下迭代的时候注意去重，同时每一次的迭代都必须多维护一个数组
- 时间复杂度 ${O(NlogN)}$, 空间复杂度 ${N^2}$ 其中 N 是数组 nums 长度 ，这里每一次迭代都保存两个数组，数组长度和刚好就是 N 

```javascript
var permuteUnique = function(nums) {
    const ret = []
    nums.sort((a,b) => a-b) // 排序，这样才能在回溯的时候，防止在相同的位置注入一样的值，导致重复排列的出现
    const recursion = (temp,restArr) => {
        if(!restArr.length) {
            ret.push(temp);
            return 
        }
        for(let i=0;i<restArr.length;i++){
            const num = restArr[i]
            if(i === 0 || restArr[i-1]!== num) recursion([...temp,num],[...restArr.slice(0,i),...restArr.slice(i+1)])
        }
    }
    recursion([],nums)
    return ret
};
```