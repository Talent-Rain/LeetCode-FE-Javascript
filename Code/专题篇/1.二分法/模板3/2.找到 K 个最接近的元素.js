/*
 * @Author: your name
 * @Date: 2021-08-16 09:27:52
 * @LastEditTime: 2021-08-16 09:56:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板3/2.找到 K 个最接近的元素.js
 */

// 找到 K 个最接近的元素

/**
 * @分析
 * 1. 先找出 arr 中值最靠近 x 左侧的下标值 -- 如果有等于 x 的就取 x 没有就取最靠近的前一个
 */
var findClosestElements = function (arr, k, x) {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = ((r - l) >> 1) + l;
    if (arr[mid] > x) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  //   这个时候 r 是左侧最靠近 x 的值下标，l 是右侧最靠近 x 的值
  let lIndex = r,
    rIndex = l; // 防止混淆
  let ret = [];
  while (k--) {
    let isLeft = true;
    if (lIndex >= 0 && rIndex < arr.length) {
      isLeft = x - arr[lIndex] <= arr[rIndex] - x;
    } else if (rIndex < arr.length) {
      isLeft = false;
    }
    if (isLeft) {
      ret.unshift(arr[lIndex]);
      lIndex--;
    } else {
      ret.push(arr[rIndex]);
      rIndex++;
    }
  }
  return ret;
};

console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3));
console.log(findClosestElements([1, 2, 3, 4, 5], 4, -1));
console.log(findClosestElements([1, 2, 3, 4, 5], 4, 5));
