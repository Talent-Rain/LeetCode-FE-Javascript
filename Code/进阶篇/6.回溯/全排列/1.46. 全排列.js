/*
 * @Author: your name
 * @Date: 2021-09-17 08:56:21
 * @LastEditTime: 2021-09-17 09:29:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/全排列/1.46. 全排列.js
 */

// 46. 全排列
// https://leetcode-cn.com/problems/permutations/

/**
 * @分析
 * 1. 不含重复数字，要求的是全排列，所以不同顺序的排列都得算上，这样在枚举过程中要知道自己曾经获取过哪些值
 * 2. 在枚举过程中缓存两个数组 arr,getIndex, arr 是枚举过程中的数组， getIndex 是走过值状态，如果当前 arr 走过对应的下标的值为1，没有走过就是 0
 * 3. 在每一层给临时数组 arr 添加值的时候，需要保证不会重复添加，可以在每一次遇到的时候再遍历 arr，由于值是唯一的，也是可以的；
 * 4. 在这里是用空间换时间，用 getIndex 数组缓存对应的状态，每一次查找的复杂度是 ${O(1)}$
 * 4. 每一次需要枚举完整的数组，需要枚举 n 次所以时间复杂度为 ${O(n^2)}$,空间复杂度 ${O(n)}$
 */
var permute = function (nums) {
  let ret = [];

  const dfs = (arr, getIndex) => {
    if (arr.length === nums.length) {
      ret.push(arr);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (!!getIndex[i]) continue; // 如果存在，则代表已经有这个值了
      getIndex[i] = 1;
      dfs([...arr, num], getIndex);
      getIndex[i] = 0;
    }
  };
  const getIndexArr = new Array(nums.length)
  dfs([], getIndexArr);
  return ret;
};
