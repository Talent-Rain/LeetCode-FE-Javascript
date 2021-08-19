/*
 * @Author: your name
 * @Date: 2021-08-18 09:30:49
 * @LastEditTime: 2021-08-18 09:50:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/4.349. 两个数组的交集.js
 */

// 349. 两个数组的交集

var intersection = function (nums1, nums2) {
  const l1 = nums1.length,
    l2 = nums2.length;
  if (!l1 || !l2) return [];
  // 先排序
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  const ret = [];
  for (let i = 0;i<l1;i++) {
      if(i>0 && nums1[i-1] === nums1[i]) continue // 重复值跳过
      const n = nums1[i];
    let left = 0,
      right = l2-1;
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
      if (nums2[mid] === n) {
        ret.push(n);
        break;
      }
      if (nums2[mid] > n) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return ret
};

console.log(intersection([1,2,2,1],[2,2]))
