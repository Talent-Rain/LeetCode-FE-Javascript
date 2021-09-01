<!--
 * @Author: your name
 * @Date: 2021-08-31 09:38:35
 * @LastEditTime: 2021-09-01 09:13:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/2.子集/README.md
-->

### [78. 子集](https://leetcode-cn.com/problems/subsets/solution/die-dai-wei-yun-suan-dfs-by-jzsq_lyx-h04u/)

分析 -- 数学法
1. 这里求的组合而不是排列，所以插入顺序与最后的结果是无关的，要保证数组中每一个子集都是唯一即可
2. 所以对于空的数组 nums，返回的子集只有一个 [[]], 每多加一个元素，那么就是在前一个已有的子集数组基础上，在每一个子集中加上这个元素，形成新的子集
3. 时间复杂度 ${2^n}$ 其中 n 是 nums 的长度
 */
```javascript

 var subsets = function (nums) {
    let ret = [[]] // 默认空数组
    for(let num of nums){
        ret = [...ret,...ret.map(item => item.concat(num))]
    }
    return ret
}
```
 分析 -- 迭代+位运算
 1. 将可能的取值转化成位运算的位，每一个位代表 nums 的下标，如果这个位 i 为 1，则这个数组存在值 nums[i]
 2. 因此我们可以直接得到所有可能的自己的二进制数，他们的值分别是 [0,2^n-1], 其中 n 是 nums 的长度
 3. 然后我们要将这些二进制重新转成数组，然后输出出来。
 4. 时间复杂度 ${n * 2^n}$ 其中 n 是 nums 的长度
```javascript
var subsets = function (nums) {
    const ret = []
    const len = nums.length
    for(let i = 0;i<(1<<len);i++){
        // i 就是其中一个二进制话的自己，所以要将它转成数组
        const temp  = []
        for(let j=0;j<len;j++){
            if(i & (1<<j)){
                // i 中存在下标为 j 的数
                temp.push(nums[j])
            }
        }
        // 现在 temp 就是 i 转成数组的子集了
        ret.push(temp)
    }
    return ret
}
```
分析 -- 迭代
1. 不需要进行什么位运算，直接用带状态的 dfs 去取，每次都有两个状态，取或者不取，和二叉树贼像，然后当迭代到数组最后一个值的时候，将状态数组收集起来即可
2. 这种就好像二叉树一样，len 就是二叉树的高度，所以时间复杂度 ${2^n}$ 
```javascript
var subsets = function (nums) {
    const ret = []
    const len = nums.length;
    const dfs = (start,arr) => {
        if(start === len){
            ret.push(arr)
            return
        }
        dfs(start+1,[...arr])
        dfs(start+1,[...arr,nums[start]])
    }
    dfs(0,[])
    return ret
}

```

### [90. 子集 II -- 有重复值](https://leetcode-cn.com/problems/subsets-ii/)
分析
1. 本题与 [78. 子集](https://leetcode-cn.com/problems/subsets/solution/die-dai-wei-yun-suan-dfs-by-jzsq_lyx-h04u/) 比更接近现实，数组 nums 中的值存在重复的，还是求组合而不是排列，所以必须要将相同的值放在一起，所以首先要做的就是排序
2. 排完序之后，我们再来看上题的三中写法，是否可以复用；
3. 先说可操作的`模拟二叉树迭代法`，这里的核心思想就是带参数的自顶向下的遍历，然后每次遍历分两种状态，一种是取值，一种是不取，而这恰好和组合去重匹配；
4. 如果在某一次的遍历中，当前路径上一次属于没有取值状态 `isGet===false`, 且当前值 nums[start] 和上一个值 nums[start-1] 相等，那么这一次的遍历有且仅有一个，就是不取值，原因是上一次遍历中的 `isGet===true` + 它后续子树的 `isGet===false` 分支会与 `isGet===false` + 后续子树的`isGet===true` 重叠，在这里我们把 `isGet===false` + 后续子树的`isGet===true` 的分支剪去
5. 其他状态的分支可以正常遍历，直到 nums 数组遍历结束，最后得到 ret 就是去重后的
6. 与之对应的第一种数学法没有带状态，比较难复用，第二种迭代+位运算中，是将所有可能性的位运算按照下标与转成了数字，这种情况对于去重，咋看上有点复杂，所以就不考虑了；

```javascript

var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b); // 排序
  const ret = [];
  const len = nums.length;
  const dfs = (start, arr, isGet) => {
    if (start === len) {
      ret.push(arr);
      return
    }
    if(!isGet && nums[start] === nums[start-1]){
        // 如果当前值和上一次值相同，且这个遍历上一次是没有取值的；那么必定有一个分支是取值了的，如果这里的临时数组取了值，就会和上边那个分支重叠，所以要剪枝
        dfs(start+1,[...arr],false)
    }else{
        dfs(start+1,[...arr],false)
        dfs(start+1,[...arr,nums[start]],true)
    }
  };
  dfs(0,[],true) // 初始化是true，这样就可以避开第一次与前一个值进行比较的判定
  return ret
};

```