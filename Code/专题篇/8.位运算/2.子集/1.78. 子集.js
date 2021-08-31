/*
 * @Author: your name
 * @Date: 2021-08-31 08:55:20
 * @LastEditTime: 2021-08-31 09:38:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/2.子集/1.78. 子集.js
 */

// 78. 子集

/**
 * @分析
 * 1. 这里求的组合而不是排列，所以插入顺序与最后的结果是无关的，要保证数组中每一个子集都是唯一即可
 * 2. 所以对于空的数组 nums，返回的子集只有一个 [[]], 每多加一个元素，那么就是在前一个已有的子集数组基础上，在每一个子集中加上这个元素，形成新的子集
 * 3. 时间复杂度 ${2^n}$ 其中 n 是 nums 的长度
 */
 var subsets = function (nums) {
    let ret = [[]] // 默认空数组
    for(let num of nums){
        ret = [...ret,...ret.map(item => item.concat(num))]
    }
    return ret
}

/**
 * @分析 -- 迭代+位运算
 * 1. 将可能的取值转化成位运算的位，每一个位代表 nums 的下标，如果这个位 i 为 1，则这个数组存在值 nums[i]
 * 2. 因此我们可以直接得到所有可能的自己的二进制数，他们的值分别是 [0,2^n-1], 其中 n 是 nums 的长度
 * 3. 然后我们要将这些二进制重新转成数组，然后输出出来。
 * 4. 时间复杂度 ${n * 2^n}$ 其中 n 是 nums 的长度
 */
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

/**
 * @分析 -- 迭代
 * 1. 不需要进行什么位运算，直接用带状态的 dfs 去取，每次都有两个状态，取或者不取，和二叉树贼像，然后当迭代到数组最后一个值的时候，将状态数组收集起来即可
 * 2. 这种就好像二叉树一样，len 就是二叉树的高度，所以时间复杂度 ${2^n}$ 
 */
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