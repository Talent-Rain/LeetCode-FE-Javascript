/*
 * @Author: your name
 * @Date: 2021-09-16 09:26:57
 * @LastEditTime: 2021-09-16 10:01:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/组合总和/4.377. 组合总和 Ⅳ.js
 */

// 377. 组合总和 Ⅳ
// https://leetcode-cn.com/problems/combination-sum-iv/

/**
 * @分析 -- 回溯
 * 1. nums 是由不同正整数组成的数组，求的是符合要求的排列的数量 -- 可以重复取
 * 2. 这道题和[组合总和](https://leetcode-cn.com/problems/combination-sum/)很像，区别在于本题求的是排列的数量，而题1 求的是不重复的组合
 * 3. 所以这里不需要限制组合起始枚举的下标了，每一次都从 0 开始即可
 * 4. 然后超时了
 */
var combinationSum4 = function (nums, target) {
  let ret = 0;
  const dfs = (sum) => {
    if (sum === target) {
      ret++;
      return;
    }
    if (sum > target) return;
    for (let i = 0; i < nums.length; i++) {
      dfs(sum + nums[i]);
    }
  };
  dfs(0);
  return ret;
};

/**
 * @分析 -- dp
 * 1. dp[i] 表示值为 i 的时候存在的组合数量
 * 2. 状态转移方程 dp[i] = sum(dp[i-nums[k]])
 * 3. base case dp[0] = 1
 */
var combinationSum4 = function (nums, target) {
    const dp = new Array(target+1)
    dp[0]= 1  // 如果刚好得到的值是0，那么就有 1，因为不取也是一种取法
    for(let i = 1;i<target+1;i++){
        dp[i] = 0
        for(let j =0;j<nums.length;j++){
            if(i>=nums[j]){
                dp[i]+=dp[i-nums[j]]
            }
        }
    }
    return dp[target]
}