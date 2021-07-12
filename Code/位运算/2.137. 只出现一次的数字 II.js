/*
 * @Author: your name
 * @Date: 2021-07-11 09:29:58
 * @LastEditTime: 2021-07-11 09:42:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/位运算/2.137. 只出现一次的数字 II.js
 */

/**
 * @分析 --- 一个值出现 1 次，其余值出现 3次 --
 * 1. 将所有值相加，转成二进制，然后相同的值在同一个位上肯定也是一样的，然后对每一个位进行除 3 取余，得到的值就是唯一一个出现 1 次的值了
 */
var singleNumber = function (nums) {
  let ret = 0;
  for (let i = 0; i < 32; i++) {
    const temp = 1 << i;
    let count = 0;
    nums.forEach((num) => {
      if (num & temp) count++;
    });
    if (count % 3) ret |= temp;
  }
  return ret;
};
