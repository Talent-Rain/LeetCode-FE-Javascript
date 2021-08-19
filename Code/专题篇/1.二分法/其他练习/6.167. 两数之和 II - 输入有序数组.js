/*
 * @Author: your name
 * @Date: 2021-08-19 09:36:22
 * @LastEditTime: 2021-08-19 09:41:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/6.167. 两数之和 II - 输入有序数组.js
 */

// 167. 两数之和 II - 输入有序数组

/**
 * @分析
 * 1. numbers 是升序数组，找出 n1+n2 = target , 返回 n1,n2 对应的下标值 [i1,i2] -- 注意下标值从 1 开始
 * 2. 每个输入只有唯一的输出值
 */
var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length-1; i++) {
    const temp = target - numbers[i];
    let l = i + 1,
      r = numbers.length - 1;
    while (l <= r) {
      const mid = ((r - l) >> 1) + l;
      if (numbers[mid] === temp) return [i + 1, mid + 1];
      if (numbers[mid] < temp) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
};
