/*
 * @Author: your name
 * @Date: 2021-09-13 09:19:45
 * @LastEditTime: 2021-09-13 09:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/左右端点指针/2.713. 乘积小于K的子数组.js
 */

// 713. 乘积小于K的子数组
// https://leetcode-cn.com/problems/subarray-product-less-than-k/

/**
 * @分析
 * 1. 求的是符合要求的，连续的子数组的最大个数，盲猜可以用不定大小的滑窗处理
 * 2. 移动 r 指针扩展窗口，然后当乘积超出 k 的时候，开始收缩 l 指针，最后得到一个符合要求的窗口 [l,r]
 * 3. 在这个窗口 [l,r] 中，任意的一种组合都符合要求，由于组合属于一种特性的判断，所以不需要用双窗口来求符合要求的数量，直接 r-l+1 即可
 * 4. 需要注意的时候，收缩 l 指针的时候，判定条件 l<=r 的原因是，当前 nums[r] 可能就比 k 大，这个情况应该收缩窗口为 0，并走到下一步
 * 5. 时间复杂度 ${O(n)}$
 */
 var numSubarrayProductLessThanK = function (nums, k) {
    let l = (r = 0);
    let product = 1; // 默认最小为 1
    let ret = 0; // 最大长度
    while (r < nums.length) {
      const rr = nums[r];
      product *= rr;
      while (product >= k && l <= r) {
        // 超出了 k
        ll = nums[l];
        product = product / ll;
        l++;
      }
      // 这个时候 [l,r] 之间的值的乘积是小于 k 的
      ret += r - l + 1;
      r++;
    }
  
    return ret;
  };