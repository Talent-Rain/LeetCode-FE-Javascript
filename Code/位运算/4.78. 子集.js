/*
 * @Author: your name
 * @Date: 2021-07-12 19:58:30
 * @LastEditTime: 2021-07-13 10:24:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/位运算/4.78. 子集.js
 */

// 78. 子集

/**
 * @分析
 * 1. 直接看出特殊解法
 * 2. 每一个 nums 的值都需要和已经排好在 ret 中的数组进行合并，生成新的多维数组，并追加到 ret 中去
 */
var subsets = function (nums) {
  const ret = [];
  ret.push([]); //默认有一个空的数组
  for (let num of nums) {
    const temp = ret.map((item) => item.concat(num));
    ret.push(...temp);
  }
  return ret;
};

/**
 * @分析 -- 回溯
 * 1. 回溯函数带着 nums 的下标和一个维护好的数组
 * 2. 每一次回溯都存在两种情况，取nums 的值放到数组 arr 中和不取
 * 3. 当且仅当下标 start === nums.length 的时候，回溯结束，将 arr push 到 ret 中去
 */
var subsets = function (nums) {
  const ret = [];
  const dfs = (start, arr) => {
    if (start === nums.length) {
      ret.push(arr);
      return;
    }
    dfs(start + 1, arr);
    dfs(start + 1, [...arr, nums[start]]);
  };
  dfs(0, []);
  return ret;
};

subsets([1, 2, 3]);
subsets([]);
