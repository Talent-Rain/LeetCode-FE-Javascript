// 78. 子集
// https://leetcode-cn.com/problems/subsets/

/**
 * @分析 -- 找规律
 * 1.  数组元素不相同，返回值不包含重复的子集，也就是不考虑位置排列情况
 * 2. 由于跟排列无关，所以只需要遍历一遍 nums 即可，没遍历一次获取到的值，都可以和现有的 ret 组合成新的一批数组，然后和旧的item组合成新的枚举数组
 * 3. 时间复杂度 ${O(n^2)}$
 */
 var subsets = function (nums) {
    let ret = [[]]
    for(let num of nums ){
        ret = [...ret,...ret.map(item => item.concat(num))]
    }
    return ret
}

/**
 * @分析 -- 迭代回溯
 * 1. 使用迭代的方法枚举所有的情况出来, 和多叉树遍历没啥区别
 * 2. 时间复杂度 ${O(N^2)}$
 */
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