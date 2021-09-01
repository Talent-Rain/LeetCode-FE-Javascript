/*
 * @Author: your name
 * @Date: 2021-09-01 09:25:22
 * @LastEditTime: 2021-09-01 09:51:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/3.其他/1.645. 错误的集合.js
 */

// 645. 错误的集合

/**
 * @分析
 * 1. 一般这些有单值，和出现两次的值，第一时间考虑的就是异或，可以将大部分值给筛选掉
 * 2. 用 [1,len] 和 nums 的中值进行异或，得到的就是丢失值 a 和 重复值 b 的异或值
 */
var findErrorNums = function (nums) {
  const temp = nums.reduce((prev, cur, index) => prev ^ cur ^ (index + 1), 0);

};

console.log(findErrorNums([1, 1, 2]));
