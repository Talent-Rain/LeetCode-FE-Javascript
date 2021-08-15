/*
 * @Author: your name
 * @Date: 2021-08-15 11:13:07
 * @LastEditTime: 2021-08-15 14:21:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板2/2.162. 寻找峰值.js
 */


// 162. 寻找峰值

/**
 * @分析
 * 1. 已知多峰的时候只需返回一个即可，那么就是直接做二分判断即可；
 * 2. 两侧边缘值也可以是峰值,因为题目给了两侧是 -Infinity
 */
var findPeakElement = function(nums) {
    nums[-1] = nums[nums.length] = -Infinity // 设置边界值，这样保证在边缘的时候也只需要两个值就能判极值
    let left = 0,right = nums.length-1
    while(left <= right){
        const mid = ((right-left)>>1) + left
        // 找出一个有峰值的区间
        if(nums[mid]>nums[mid+1]){
            // [mid,right] 局部下降，而[-1,mid] 是局部上升的，比较有一个最低值
            right = mid-1
        }else{
            left = mid+1
        }
    }
    return left
};