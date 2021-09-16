<!--
 * @Author: your name
 * @Date: 2021-09-16 08:32:16
 * @LastEditTime: 2021-09-16 10:01:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/组合总和/README.md
-->


### [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)
 分析
 1. candidates 是`无重复`，正整数数组 
 2. 可以重复取值，但是由于和排列无关，不能倒退取，所以需要维护一个初始的下标值;与 [组合总和IV] 形成对比
```javascript
 var combinationSum = function(candidates, target) {
    const ret = []

    const dfs = (start,arr,sum) => {
        if(sum === target){
            ret.push(arr)
            return 
        }
        if(sum>target) return 

        for(let i = start;i<candidates.length;i++){
            // 因为允许重复取，所以每一次都是从 start 这个节点开始取的
            dfs(i,[...arr,candidates[i]],sum+candidates[i])
        }
    }

    dfs(0,[],0)
    return ret
}
```

### [40. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

分析
1. candidates 是`有无重复`，正整数数组 
2. 数组中的每一个值只能取一次；不可以重复取值，但是对于重复的值是可以取的，即 [1,1,2,3] -> 可以取 [1,1,2],[1,3] -> 4 
3. 为了不取到重复的值，就得跳过相同值，这个时候需要对数组`排序`
4. 在每一层进行枚举的时候，循环中出现重复值的时候，剪掉这部分的枚举，因为肯定有相同的一部分
5. 由于不可以重复取，所以 dfs 第一个入参的下标是要 +1 的，表示不可以重复取上一次哪一个值
```javascript
 var combinationSum2 = function (candidates, target) {
    candidates.sort((a,b)=>a-b)
    const ret= []

    const dfs = (start,arr,sum) => {
        if(sum === target) {
            ret.push(arr)
            return 
        }
        if(sum>target || start>= candidates.length) return 
        for(let i = start;i<candidates.length;i++){
            // 将重复的剪掉
            if(i > start && candidates[i] === candidates[i-1]) continue
            // 这里的 start 是启动枚举的下标，但是插入到临时数组的值是当前下标的值
            dfs(i+1,[...arr,candidates[i]],sum+candidates[i])
        }
    }
    dfs(0,[],0)
    return ret
}
```

### [216. 组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)
分析
1. 给定的不是具体的数组，而是长度限制 k, 和目标值  target -- 等同于 candidates 是`无重复`，1-9 的正整数数组
2. 所以可以看做是 [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/) 的特殊情况，只是判定条件有出入
```javascript
var combinationSum3 = function (k, n) {
  const ret = [];

  const dfs = (start, arr, sum) => {
    if (arr.length === k && sum === n) {
      ret.push(arr);
      return;
    }
    if (arr.length > k || sum > n) {
      return;
    }

    for (let i = start + 1; i < 10; i++) {
      dfs(i, [...arr, i], sum + i);
    }
  };
  dfs(0, [], 0);
  return ret
};
```

### [377. 组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/solution/zu-he-zong-he-1-4-hui-su-by-jzsq_lyx-0p1l/)
分析 -- 回溯
1. candidates 是`无重复`，正整数数组,可以重复取值且要取`排列不同`的组合
2. 这道题和[组合总和](https://leetcode-cn.com/problems/combination-sum/)很像，区别在于本题求的是排列的数量，而题1 求的是不重复的组合
3. 所以这里不需要限制组合起始枚举的下标了，每一次都从 0 开始即可
4. 然后超时了
 */
```javascript
var combinationSum4 = function (nums, target) {
  let ret = 0;
  const dfs = (sum) => {
    if (sum === target) {
      ret++;
      return;
    }
    if (sum > target) return;
    for (let i = 0; i < nums.length; i++) {
      dfs(sum + nums[i]);
    }
  };
  dfs(0);
  return ret;
};
```

分析 -- dp
1. dp[i] 表示值为 i 的时候存在的组合数量
2. 状态转移方程 dp[i] = sum(dp[i-nums[k]])
3. base case dp[0] = 1
```javascript
var combinationSum4 = function (nums, target) {
    const dp = new Array(target+1)
    dp[0]= 1  // 如果刚好得到的值是0，那么就有 1，因为不取也是一种取法
    for(let i = 1;i<target+1;i++){
        dp[i] = 0
        for(let j =0;j<nums.length;j++){
            if(i>=nums[j]){
                dp[i]+=dp[i-nums[j]]
            }
        }
    }
    return dp[target]
}
```