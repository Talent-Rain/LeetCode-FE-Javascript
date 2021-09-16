/*
 * @Author: your name
 * @Date: 2021-09-16 09:08:19
 * @LastEditTime: 2021-09-16 09:55:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/组合总和/3.216. 组合总和 III.js
 */

// 216. 组合总和 III
// https://leetcode-cn.com/problems/combination-sum-iii/

/**
 * @分析
 * 1. 给定的不是具体的数组，而是长度限制 k, 和目标值  target
 * 2. 其实也给定可选择的数组，那就是单增的 [1,9] 数组
 * 3. 这是组合，不能排列，所以还得按照顺序来搞；同时不能有相同的值
 */
var combinationSum3 = function (k, n) {
  const ret = [];

  const dfs = (start, arr, sum) => {
    if (arr.length === k && sum === n) {
      ret.push(arr);
      return;
    }
    if (arr.length > k || sum > n) {
      return;
    }

    for (let i = start + 1; i < 10; i++) {
      dfs(i, [...arr, i], sum + i);
    }
  };
  dfs(0, [], 0);
  return ret
};
