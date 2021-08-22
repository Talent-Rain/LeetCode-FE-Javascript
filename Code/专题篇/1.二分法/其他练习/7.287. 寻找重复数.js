/*
 * @Author: your name
 * @Date: 2021-08-19 09:45:35
 * @LastEditTime: 2021-08-20 10:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/7.287. 寻找重复数.js
 */

// 287. 寻找重复数

/**
 * @分析
 * 1. 给定长度为 n+1 的 nums，里面的值都是 1-n, 本题中只有一个值是重复的，找出这个值
 * 2. 注意这里只是表明重复的只有一个值，但是这个值重复多少次并没有说明，所以不能用简单的异或二进制处理
 * 3. 但是我们可以选定以 mid 值，然后判断小于等于 mid 值 count，如果 count 超出了 mid ，证明在 [1,mid] 中至少有一个值重复了，这个时候可以砍掉右侧部分
 * 4. 当 left 和 right 相等之后，即找到了唯一重复的值，因为这个时候左右两侧的值都不服要求，就只有这个了
 * 5. 时间复杂度 ${O(nlohn)}$, 空间复杂度 ${1}$
 */
var findDuplicate = function (nums) {
  let left = 1,
    right = nums.length - 1; // 值是 1 - n
  while (left < right) {
    const mid = ((right - left) >> 1) + left;
    const count = nums.reduce((prev, cur) => (cur <= mid ? prev + 1 : prev), 0); // 小于等于 count 的值
    if (count > mid) {
      // 如果 [1,mid] 这个数组满值的情况才只有 mid 个，现在 count 如果比这个还大，证明重复的值在这里面
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

console.log(findDuplicate([1, 1]));
console.log(findDuplicate([1, 2, 3, 2]));
console.log(findDuplicate([1, 2, 3, 4, 3]));
console.log(findDuplicate([1, 1, 1, 2]));
