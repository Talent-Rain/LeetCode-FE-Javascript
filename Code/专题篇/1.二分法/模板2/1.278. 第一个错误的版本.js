/*
 * @Author: your name
 * @Date: 2021-08-15 11:00:13
 * @LastEditTime: 2021-08-15 14:22:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板2/1.278. 第一个错误的版本.js
 */


// 278. 第一个错误的版本

/**
 * @分析
 * 1. 这里要找出的是第一个错误版本，而整理版本排列是 `正常 -> 错误`，所以这里是根据错误向左逼近
 * 2. 如果是错误版本， right 指针不断往左，如果是正常版本，left 指针不断往右，当左右指针相交时，如果是错误版本，right 继续往左，到达正常区，这个时候 left 就是第一个错误版本了
 * 3. 时间复杂度 ${O(logn)}$
 */
var solution = function(isBadVersion) {
    return function(n) {
        let left = 1, right = n
        while(left<=right){
            const mid = ((right-left)>>1) + left
            if(isBadVersion(mid)) {
                // 如果是错误版本
                right = mid-1
            }else{
                left = mid+1
            }
        }
        
        return left
    };
};