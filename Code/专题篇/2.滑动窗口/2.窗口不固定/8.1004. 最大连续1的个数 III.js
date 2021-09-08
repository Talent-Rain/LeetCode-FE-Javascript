/*
 * @Author: your name
 * @Date: 2021-09-08 08:10:45
 * @LastEditTime: 2021-09-08 08:29:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/8.1004. 最大连续1的个数 III.js
 */

// 1004. 最大连续1的个数 III

/**
 * @分析
 * 1. 这里其实用到的是双指针的方式
 * 2. 左右指针形成了一个合乎要求的区域，用 arr 来缓存从 0-1 变更的值
 * 3. 每当使用完变更次数 k 之后，再次遇到 0 的时候，我们只能先保存当前长度的区域，然后将 l 指针跳转到最小的变更下标，然后再次进行区域的扩充
 * 4. 时间复杂度 ${O(n)}$,n 是 nums 的长度； 空间复杂度 ${O(k)}$
 */
var longestOnes = function (nums, k) {
  const changeArr = []; // 用 arr 来存储从 0-1 的下标的值
  let l = (r = 0);
  let ret = 0;
  while (r < nums.length) {
    const rr = nums[r];
    if (k === 0) {
      // 特殊情况，不做任何处理
      if (rr === 0) {
        ret = Math.max(ret, r - l); // 先保存当前的这个长度
        l = r + 1;
      }
    } else {
      if (rr === 0 && changeArr.length === k) {
        // 当前值是 0，且已经变更了 k 次，无法再变了
        ret = Math.max(ret, r - l); // 先保存当前的这个长度
        // 由于是连续的变动，所以 l 可以直接指向第一个变动值之前
        l = changeArr.shift() + 1;
      }
      if (rr === 0 && changeArr.length < k) {
        changeArr.push(r);
      }
    }
    r++;
  }
  return Math.max(ret, r - l);
};
console.log(longestOnes([0, 0, 1, 1, 1, 0, 0], 0));
