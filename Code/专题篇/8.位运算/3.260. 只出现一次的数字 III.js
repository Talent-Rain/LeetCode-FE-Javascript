/*
 * @Author: your name
 * @Date: 2021-07-11 08:48:58
 * @LastEditTime: 2021-07-11 09:06:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/位运算/1.260. 只出现一次的数字 III.js
 */

// 260. 只出现一次的数字 III

var singleNumber = function (nums) {
  const ret = nums.reduce((prev, cur) => prev ^ cur, 0); // 两个不相等值的异或和
  // 选取第一个值为1的位，作为分治点
  let bite = 0;
  while (((1 << bite) & ret) === 0) {
    bite++;
  }
  const temp = 1 << bite;
  //   将 nums 根据这个位的值分成两半
  let left, right;
  for (let num of nums) {
    if (num & temp) {
      left ^= num;
    } else {
      right ^= num;
    }
  }
  return [left, right];
};
