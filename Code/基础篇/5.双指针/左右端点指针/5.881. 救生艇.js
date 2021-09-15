/*
 * @Author: your name
 * @Date: 2021-09-15 08:17:32
 * @LastEditTime: 2021-09-15 08:38:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/左右端点指针/5.881. 救生艇.js
 */

// 881. 救生艇

/**
 * @分析 -- 二分
 * 1. 由于这里最多只能载人 2， 负重最多是 limit，所以选择载人的时候，尽量先选择最重的和最轻的进行匹配，尽量一船二人坐，可以减少数量，所以先给 people 排序
 * 2. l,r 指针指向最轻和最重的人
 * 3. 然后每次求出2人组合的最轻总量和 sum， 让它和 limit 进行比较，进而控制 l, r 的移动
 * 4. 时间复杂度 ${O(nlogn)}$ 主要是排序问题
 */
var numRescueBoats = function (people, limit) {
  let l = 0,
    r = people.length - 1;
  people.sort((a, b) => a - b);
  let count = 0; // 需要的船的数量
  while (l <= r) {
    const sum = people[l] + people[r];
    if (sum > limit) {
      r--;
    } else {
      l++;
      r--;
    }
    count++;
  }
  return count;
};
