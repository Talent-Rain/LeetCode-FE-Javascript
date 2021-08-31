/*
 * @Author: your name
 * @Date: 2021-08-30 08:40:37
 * @LastEditTime: 2021-08-30 08:44:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/只出现一次的数字/1.136. 只出现一次的数字.js
 */

// 136. 只出现一次的数字

/**
 * @分析 -- 1个单值，其余是两个
 * 1. 已知 a ^ a = 0, 0 ^ a = a ,
 * 2. 所以将 nums 中所有值进行异或处理，出现两次的都会被消除，而最后的结果就是唯一一次出现的那个值
 */
var singleNumber = function(nums) {
    return nums.reduce((prev,cur) => prev ^ cur,0) // 0 和任何值异或都等于任何值，所以以 0 为初始值
};