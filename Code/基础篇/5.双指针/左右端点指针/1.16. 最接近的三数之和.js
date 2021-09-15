/*
 * @Author: your name
 * @Date: 2021-09-13 08:48:18
 * @LastEditTime: 2021-09-13 09:04:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/左右端点指针/16. 最接近的三数之和.js
 */
// 16. 最接近的三数之和
// https://leetcode-cn.com/problems/3sum-closest/

/**
 * @分析
 * 1. 暴力解法，直接固定左右两个节点i,j，然后设置第三个指针 k 在两个指针之间遍历求和，找出最接近 target 的值
 * 2. i 遍历一次nums，j 和 k 每固定一次加起来遍历一次 nums，所以时间复杂度为 ${O(n^2)}$
 */
var threeSumClosest = function(nums, target) {
    const len = nums.length 
    let ret;
    let temp = Infinity // sum 与 target 的相差值
    for(let i =0;i<len-2;i++){
        for(let j = len-1;j>1;j--){
            for(let k = i+1;k<j;k++){
                const sum=nums[i]+nums[j]+nums[k]
                const bet = Math.abs(sum-target) 
                if(bet<temp){
                    // 这一组的和比之前的更接近 target 
                    ret = sum;
                    temp = bet
                }
            }
        }
    }
    return ret
}; 

console.log(threeSumClosest([-1,2,1,-4],1))