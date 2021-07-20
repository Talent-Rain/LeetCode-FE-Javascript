<!--
 * @Author: your name
 * @Date: 2021-07-19 08:48:28
 * @LastEditTime: 2021-07-20 09:56:44
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