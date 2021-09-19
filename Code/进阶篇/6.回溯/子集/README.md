<!--
 * @Author: your name
 * @Date: 2021-09-18 08:06:47
 * @LastEditTime: 2021-09-18 08:09:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/子集/README.md
-->

### [78. 子集](https://leetcode-cn.com/problems/subsets/)

分析 -- 找规律
1.  数组元素不相同，返回值不包含重复的子集，也就是不考虑位置排列情况
2. 由于跟排列无关，所以只需要遍历一遍 nums 即可，没遍历一次获取到的值，都可以和现有的 ret 组合成新的一批数组，然后和旧的item组合成新的枚举数组
3. 时间复杂度 ${O(n^2)}$
```javascript
 var subsets = function (nums) {
    let ret = [[]]
    for(let num of nums ){
        ret = [...ret,...ret.map(item => item.concat(num))]
    }
    return ret
}
```

分析 -- 迭代回溯
1. 使用迭代的方法枚举所有的情况出来, 和多叉树遍历没啥区别
2. 时间复杂度 ${O(N^2)}$
```javascript
var subsets = function (nums) {
    const ret = []
    const dfs = (start,arr) => {
        ret.push(arr)
        if(arr.length === nums.length || start=== arr.length) return 
        for(let i = start;i<nums.length;i++){
            dfs(i+1,[...arr,nums[i]])
        }
    }
    dfs(0,[])
    return ret
}
```

### [90. 子集 II](https://leetcode-cn.com/problems/subsets-ii/)
分析 -- 有重复值
1. 和[78. 子集](https://leetcode-cn.com/problems/subsets/)相比，就是多了重复值，且不允许重复值出现在返回数组中，所以明显要先排序了
2. 然后在回溯过程中，如果下一次迭代的值和当前值一样，则跳过，达到去重的效果
```javascript
var subsetsWithDup = function (nums) {
    nums.sort((a,b)=> a-b)
    const ret = []
    const dfs = (start,arr) => {
        ret.push(arr)
        if(start === nums.length ) return // start 超出下标，就是取到了最大下标值的时候了
        for(let i = start;i<nums.length;i++){
            dfs(i+1,[...arr,nums[i]])
            while(nums[i] === nums[i+1]){
                i++ // 去重
            }
        }
    }
    dfs(0,[])
    return ret
}
```

