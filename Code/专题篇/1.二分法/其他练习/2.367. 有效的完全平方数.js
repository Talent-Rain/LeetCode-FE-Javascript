/*
 * @Author: your name
 * @Date: 2021-08-17 09:40:41
 * @LastEditTime: 2021-08-17 09:45:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/2.367. 有效的完全平方数.js
 */

// 367. 有效的完全平方数

/**
 * @分析
 * 1. 概念：若 x*x = y ， 则 y 是完全平方数
 */
var isPerfectSquare = function (num) {
  const left = 0,
    right = num;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const temp = mid * mid;
    if (temp === num) return true;
    if (temp > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
};
