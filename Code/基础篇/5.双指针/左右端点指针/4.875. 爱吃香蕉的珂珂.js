/*
 * @Author: your name
 * @Date: 2021-09-15 08:00:40
 * @LastEditTime: 2021-09-15 08:10:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/左右端点指针/4.875. 爱吃香蕉的珂珂.js
 */

// 875. 爱吃香蕉的珂珂

/**
 * @分析 -- 二分
 * 1. l = 1 , r = piles[max],他们分别代表了最大和最小的速度； 这样找出中间值，然后判断是否能在 h 小时内吃完，能吃完则向左逼近，不能吃完则向右逼近，直到最小的速度出现
 * 2. 每一次二分取 mid 之后，都要遍历一次 piles， 所以时间复杂度是 ${nlogn}$
 */
var minEatingSpeed = function (piles, h) {
  let l = 1,
    r = piles.reduce((prev, cur) => (prev >= cur ? prev : cur), 1);
  while (l <= r) {
    const mid = ((r - l) >> 1) + l;
    if (getHours(mid) > h) {
      // 需要的时间超出了 h, 证明速度不够
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  // 速度为 v 的时候，需要多久吃完
  function getHours(v) {
    let ret = 0;
    for (let i = 0; i < piles.length; i++) {
      ret += Math.ceil(piles[i] / v);
    }
    return ret;
  }
  return l;
};
