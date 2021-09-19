/*
 * @Author: your name
 * @Date: 2021-09-18 07:57:32
 * @LastEditTime: 2021-09-18 08:06:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/子集/2.90. 子集 II.js
 */


// 90. 子集 II
// https://leetcode-cn.com/problems/subsets-ii/

/**
 * @分析 -- 有重复值
 * 1. 和题1相比，就是多了重复值，且不允许重复值出现在返回数组中，所以明显要先排序了
 */
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