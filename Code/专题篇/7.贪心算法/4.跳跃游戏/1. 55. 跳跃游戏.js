/*
 * @Author: your name
 * @Date: 2021-09-23 09:18:16
 * @LastEditTime: 2021-09-24 09:00:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/7.贪心算法/4.跳跃游戏/1. 55. 跳跃游戏.js
 */
// 55. 跳跃游戏
// https://leetcode-cn.com/problems/jump-game/


/**
 * @分析 -- 能否跳到指定位置
 * 1. 这里只要不遇到值为 0 就可以继续往后走，也就是局部贪心就是要跳过值为 0 的步骤
 * 2. 当然如果 0 是在数组最后一位也是 ok 的
 * 3. 我们可以判断一下是否存在一个值 nums[valIndex] > 0Index - valIndex, 这样只要到达 valIndex 就可以越过 0 这个点了
 * 4. 所以我们需要遍历所有节点，找到值为 0 的节点，然后再进行跳跃判断；
 * 5. 由于我们是要走到最后一个下标，所以最后一个下标是不用判断的，所以 i 最多走到 nums.length-1 的位置
 * 6. 时间复杂度最小是 ${n}$，
 */
 var canJump = function (nums) {
  for(let i=0;i<nums.length-1;i++){
      if(nums[i] === 0){
          // 开始寻找可以跳过当前 i 值的节点
          let valIndex = i-1
          while(nums[valIndex]<= i -valIndex && valIndex>=0){
              valIndex--
          }
          if(valIndex<0) return false
      }
  }
  return true
}

/**
 * @分析 -- 回溯 -- 超时了
 * 1. 直接将所有可能性写出来，将对应不合适的移除
 */
 var canJump = function (nums) {
    let ret = false;
    const dfs = (start) => {
      // 只要有一个成功，就直接不做其他处理了
      if (start >= nums.length || ret) return;
      if (start+nums[start] >= nums.length-1) {
        ret = true;
        return;
      }
      for (let i = 1; i <= nums[start]; i++) {
        dfs(start + i); // 在当前这一个节点，可以跳的步数
      }
    };
    dfs(0)
    return ret;
  };
  
