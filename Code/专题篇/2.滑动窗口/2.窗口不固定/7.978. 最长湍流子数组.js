/*
 * @Author: your name
 * @Date: 2021-09-07 08:46:32
 * @LastEditTime: 2021-09-07 09:55:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/7.978. 最长湍流子数组.js
 */

// 978. 最长湍流子数组

/**
 * @分析
 * 1. 审题可得，这里可以转换成对于某一个节点 i, 必须满足这个 i 是一个最高点或者最低点
 * 2. 当 l === r 的时候，如果出现 arr[l] === arr[l + 1], 则先去重
 * 3. 对于不同的 l 和 r ，需要对 r 两侧的值进行判断，如是极值，则扩展窗口，如果 r 不是极值, 那么对应的 [l,r+1] 肯定也不是了，所以将窗口收缩到 l = r 的程度，重新再进行窗口的创建
 * 4. 需要注意，为什么 l 收缩到 r 而不是 r+1, 因为比对 r 是否是极值的时候，需要进行 r-1,r,r+1, 所以 r 和 r+1 的值可能会符合是后续的 [r,r+x] 的湍流数组，所以 l 收缩到 r 
 * 5. 至于 r 和 r+1 对应的值可能会相等，会在循环的第一次判断中的去重进行处理
 * 6. 本题最难是审题
 * 7. 时间复杂度 ${O(n)}$
 */
var maxTurbulenceSize = function (arr) {
  const len = arr.length;
  let max = 1; // 最少是 1
  let l = 0,
    r = 0; // 来个初始值
  while (r < len - 1) {
    if (l === r) {
      // 上一次比对不符合要求
      if (arr[l] === arr[l + 1]) {
        //  去重
        l++;
      }
      r++;
    } else {
      // 有和下一个进行比对
      if (arr[r - 1] < arr[r] && arr[r] > arr[r + 1]) {
        r++;
      } else if (arr[r - 1] > arr[r] && arr[r] < arr[r + 1]) {
        r++;
      } else {
        // 不符合要求
        l = r;
      }
    }

    max = Math.max(max, r - l + 1);
  }
  return max;
};

console.log(maxTurbulenceSize([4, 8, 12, 16]));
console.log(maxTurbulenceSize([4, 5]));
