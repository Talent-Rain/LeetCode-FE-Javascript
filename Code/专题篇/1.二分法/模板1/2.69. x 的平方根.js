/*
 * @Author: your name
 * @Date: 2021-08-15 09:16:15
 * @LastEditTime: 2021-08-15 09:37:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板1/2.69. x 的平方根.js
 */

// 69. x 的平方根

var mySqrt = function(x) {
    let left = 0,right = x
    while(left<=right){
        const mid = ((right-left)>>1) +left
        const sqrt = mid * mid
        if(sqrt === x) return mid
        if(sqrt<x){
            left=mid+1
        }else{
            right = mid-1
        }
    }
    // 向下取整
    return right
};