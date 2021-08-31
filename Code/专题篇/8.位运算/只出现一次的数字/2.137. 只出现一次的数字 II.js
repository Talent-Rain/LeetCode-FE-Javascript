/*
 * @Author: your name
 * @Date: 2021-08-30 08:44:51
 * @LastEditTime: 2021-08-30 09:07:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/只出现一次的数字/2.137. 只出现一次的数字 II.js
 */

// 137. 只出现一次的数字 II

/**
 * @分析 -- 1个单值 x ，其余是 3 个 y1,y2...
 * 1. 将 nums 数组与 [0,30] 的位进行 & 比较，找出在这个位上存在的值的数量 count；
 * 2. 如果 count 整除 3， 证明这个位上只存在 yi；如果不整除，证明单值 x 在这个位上，那么结果要加上这个位
 * 3. 注意，由于 num 的取值范围是 [-pow(2,31),pow(2,31)-1], 所以第 31 位 是可以取到的，所以遍历的时候要遍历到第 31位,取到正负值；
 */
var singleNumber = function (nums) {
  let ret = 0;
  for (let i = 0; i < 32; i++) {
    const temp = 1 << i;
    let count = 0;
    nums.forEach((num) => {
      if (num & temp) count++;
    });
    // 在 i 这个位上，有 count 这么多个
    if (count % 3) ret |= temp;
  }
  return ret;
};
