/*
 * @Author: your name
 * @Date: 2021-09-14 09:34:36
 * @LastEditTime: 2021-09-14 09:51:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/左右端点指针/3.977. 有序数组的平方.js
 */

// 977. 有序数组的平方

/**
 * @分析
 * 1. 分发左右指针l,r, 然后用一个额外的数组来存储平方后的数组即可
 * 2. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
 */
var sortedSquares = function(nums) {
    
    let l = 0,r = nums.length- 1

    let ret = []

    while(l<=r){
        if(nums[r]>Math.abs(nums[l])){
            ret.unshift(Math.pow(nums[r],2))
            r--
        }else{
            ret.unshift(Math.pow(nums[l],2))
            l++
        }
    }
    return ret
};
