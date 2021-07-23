/*
 * @Author: your name
 * @Date: 2021-07-21 09:18:16
 * @LastEditTime: 2021-07-22 09:49:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/剪枝/3.40. 组合总和 II.js
 */

// 40. 组合总和 II

/**
 * @分析 -- 不允许重复使用
 * 1.
 */
var combinationSum2 = function (candidates, target) {
  const len = candidates.length;
  candidates.sort((a, b) => a-b); // 排序
  const ret = [];
  const dfs = (index, sum, arr) => {
    if (sum === target) {
      ret.push(arr);
      return -1
    }
    if (sum > target || index >= len) {
      return -1
    }

    while(index<len){
        const temp = candidates[index]
        const res = dfs(++index, sum + temp, arr.concat(temp));
        while(temp === candidates[index]){
            index++ //去重，返回之后再取的时候，不能取重复的
        }
        // 由于是从小到大，所以一旦 res 有值，证明后面的的子树都没用了，直接剪掉
        if(res === -1) return 
    }
   
  };
  dfs(0, 0, []);
  return ret
};

// 测试
console.log(combinationSum2([10,1,2,7,6,1,5],8))
console.log(combinationSum2([2,5,2,1,2],5))
console.log(combinationSum2([3,1,3,5,1,1],8))