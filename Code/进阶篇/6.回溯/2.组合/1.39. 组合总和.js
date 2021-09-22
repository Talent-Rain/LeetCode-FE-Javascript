/*
 * @Author: your name
 * @Date: 2021-09-16 08:25:58
 * @LastEditTime: 2021-09-16 10:01:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/组合总和/1.39. 组合总和.js
 */

// 39. 组合总和
// https://leetcode-cn.com/problems/combination-sum/

/**
 * @分析
 * 1. candidates 是无重复，正整数数组 -- 因为都是正整数，所以组合成功后，后面的就不用走了
 * 2. 数组中的值可以重复取，但是不能倒退取，不然就会出现排列不一样，但是值一样的组合了
 */
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

