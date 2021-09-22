/*
 * @Author: your name
 * @Date: 2021-09-17 09:29:51
 * @LastEditTime: 2021-09-17 09:57:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/全排列/2.47. 全排列 II.js
 */

// 47. 全排列 II
// https://leetcode-cn.com/problems/permutations-ii/

/**
 * @分析
 * 1. 由于这个时候包含了重复的数字了，且不能有重复值，所以可以考虑到先排序
 * 2. 整理思路和题1 一直，都是缓存两个数组，而且由于值有重复，所以不能用值是否相同来判断，只能用下标判断了
 * 3. 区别在于，每一次回溯回来，需要判断下一次的值是否和当前回溯值一样，如果一样就需要跳过，防止出现重复排列
 * 4. 时间复杂度 ${O(n^2)}$,空间复杂度 ${O(n)}$
 */
var permuteUnique = function(nums) {
    const ret = []
    const len = nums.length
    nums.sort((a,b)=>a-b) // 排序
    const dfs = (arr,indexArr) => {
        if(arr.length === len ){
            ret.push(arr)
            return 
        }
        for(let i = 0;i<len;i++){
            if(!!indexArr[i]) continue
            const num = nums[i]
            indexArr[i] = 1
            dfs([...arr,num],indexArr)
            indexArr[i] = 0
            // 回溯回来，如果下一个值一样，那么就是要重复走之前的老路了，所以还是直接跳过的好
            while(nums[i+1]=== nums[i]) {
                i++
            }
        }
    }
    dfs([],[])
    return ret
}

console.log(permuteUnique([1,1,2]))