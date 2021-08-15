/*
 * @Author: your name
 * @Date: 2021-08-15 09:02:15
 * @LastEditTime: 2021-08-15 09:37:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/1.简单题/2.704. 二分查找.js
 */


// 704. 二分查找

/**
 * @分析
 * 1. 一般给定的都是排好序的数组，然后才比较好进行二分;
 */
var search = function(nums, target) {
    let left = 0,right = nums.length-1
    while(left<=right){
        const mid = ((right-left)>>1) + left
        if(nums[mid] === target) return mid
        if(nums[mid]<target){
            left = mid+1
        }else{
            right = mid-1
        }
    }
    return -1
};