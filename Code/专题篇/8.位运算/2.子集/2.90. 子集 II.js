/*
 * @Author: your name
 * @Date: 2021-09-01 08:41:05
 * @LastEditTime: 2021-09-01 08:52:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/2.子集/2.90. 子集 II.js
 */

// 90. 子集 II -- 有重复值

var subsetsWithDup = function (nums) {
    nums.sort((a, b) => a - b); // 排序
    const ret = [];
    const len = nums.length;
    const dfs = (start, arr, isGet) => {
      if (start === len) {
        ret.push(arr);
        return
      }
      if(!isGet && nums[start] === nums[start-1]){
          // 如果当前值和上一次值相同，且这个遍历上一次是没有取值的；那么必定有一个分支是取值了的，如果这里的临时数组取了值，就会和上边那个分支重叠，所以要剪枝
          dfs(start+1,[...arr],false)
      }else{
          dfs(start+1,[...arr],false)
          dfs(start+1,[...arr,nums[start]],true)
      }
    };
    dfs(0,[],true) // 初始化是true，这样就可以避开第一次与前一个值进行比较的判定
    return ret
  };
  