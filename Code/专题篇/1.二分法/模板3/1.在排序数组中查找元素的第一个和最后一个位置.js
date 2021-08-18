/*
 * @Author: your name
 * @Date: 2021-08-16 09:05:10
 * @LastEditTime: 2021-08-16 09:56:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板3/1.在排序数组中查找元素的第一个和最后一个位置.js
 */

// 在排序数组中查找元素的第一个和最后一个位置

var searchRange = function(nums, target) {
    if(!nums) return [-1,-1]
    let left = 0,right = nums.length-1
    let ret = []
    // 找左节点
    while(left<=right){
        const mid = ((right-left)>>1) + left
        if(nums[mid]<target){
            left = mid+1
        }else{
            right = mid-1
        }
    }
    if(nums[left]!== target) return [-1,-1]
    // 找右节点
    let l = left,r = nums.length-1
    while(l<=r){
        const mid = ((r-l)>>1) + l
        if(nums[mid]>target){
            r = mid-1
        }else{
            l = mid+1
        }
    }
    return [left,r]
};