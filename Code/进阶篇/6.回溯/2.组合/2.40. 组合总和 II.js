/*
 * @Author: your name
 * @Date: 2021-09-16 08:39:48
 * @LastEditTime: 2021-09-16 09:26:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/组合总和/2.40. 组合总和 II.js
 */

// 40. 组合总和 II
// https://leetcode-cn.com/problems/combination-sum-ii/

/**
 * @分析
 * 1. 有重复，正整数数组，组合不能取重复的值，而不是不能取相同的值, 即 [1,1,2,3] -> 可以取 [1,1,2],[1,3] -> 4 
 * 2. 数组中的每一个值只能取一次；
 * 3. 为了不取到重复的值，就得跳过相同的值，这个时候需要对数组进排序
 * 4. 在每一层进行枚举的时候，循环中出现重复值的时候，剪掉这部分的枚举，因为肯定有相同的一部分
 */
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