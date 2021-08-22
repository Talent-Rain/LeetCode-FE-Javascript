// 4.寻找两个正序数组的中位数

/**
 * @分析
 * 1. 已知两个有序数据，求中位数 （和求第 k 小没啥区别）
 * 2. 根据两个数组的大小，将题转成求第 k 小的题目
 * 3.
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let sum = n + m; // 如果是偶数，取两个值 prev,cur ,取中间值
  let k = (sum + 1) / 2; // 可以是非整数
  let cur;
  while (k >= 1) {
    if (!nums1.length) {
      cur = nums2.shift();
    } else if (!nums2.length) {
      cur = nums1.shift();
    } else {
      if (nums1[0] <= nums2[0]) {
        cur = nums1.shift();
      } else {
        cur = nums2.shift();
      }
    }
    k--;
  }
  let next;
  if (k !== 0) {
    // 这里用 ?? 而不是用 || , 是因为判断 nums[0] 是否为 undefined，而如果是 0 的时候，取 0 而非切换到  Infinity;
    next = Math.min(nums1[0] ?? Infinity, nums2[0] ?? Infinity);
    return (cur + next) / 2;
  }
  return cur;
};

console.log(findMedianSortedArrays([1, 2], [3, 4]));
console.log(findMedianSortedArrays([1, 2, 5], [3, 4]));
console.log(findMedianSortedArrays([0, 0], [0, 0]));
console.log(findMedianSortedArrays([1, 2], []));
