/*
 * @Author: your name
 * @Date: 2021-09-09 09:12:44
 * @LastEditTime: 2021-09-09 09:23:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/11.1658. 将 x 减到 0 的最小操作数.js
 */

// 1658. 将 x 减到 0 的最小操作数

/**
 * @分析
 * 1. 其实这道题截止条件可以转成，设置一个窗口，使得 total - sum === x ,其中 total 就是数组的总和，sum 就是窗口里的值的和；这样移除的值就刚好等于 x 了
 * 2. 在这么多情况下，我们维护一个窗口的长度最大的时候，那么移除的元素就越少，也就是对应的操作数最少
 */
var minOperations = function(nums, x) {
    const len = nums.length
    const total = nums.reduce((prev,cur) => prev+cur,0)
    if(total<x) return -1 //边界，如果总和都不达 x, 那就直接跑路吧
    let ret = Infinity //最少的操作数
    let sum = 0
    let l =r =0
    while(r<len){
        sum+=nums[r]
        while(total-sum<x){
            // 外面的值已经小于 x 了，所以需要收缩窗口
            sum-=nums[l]
            l++
        }
        if(total-sum === x){
            // 符合要求
            ret= Math.min(ret,len-(r-l+1))
        }
        r++
    }
    return ret=== Infinity?-1:ret
};