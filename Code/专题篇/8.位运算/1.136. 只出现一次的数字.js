/*
 * @Author: your name
 * @Date: 2021-07-11 09:25:53
 * @LastEditTime: 2021-07-11 09:26:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/位运算/1.136. 只出现一次的数字.js
 */

// 136. 只出现一次的数字

/**
 * @分析 -- 只出现一次的有一个，其余都出现两次
 */
var singleNumber = function(nums) {
  return nums.reduce((prev,cur)=>prev^cur,0)
};