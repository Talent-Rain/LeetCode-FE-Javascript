// 4. 寻找两个正序数组的中位数
// https://leetcode-cn.com/problems/median-of-two-sorted-arrays/

/**
 * @分析 -- 双指针
 */
var findMedianSortedArrays = function (nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    let mid = (m + n + 1)/2; //求出中位数，可以是非整数
    let ret;
    let l1 = (l2 = 0);
    while (mid >= 1) {
      // 每次比对两个数组大小
      if (l1 >= n) {
        ret = nums2[l2];
        l2++
      } else if (l2 >= m) {
        ret = nums1[l1];
        l1++
      } else if (nums1[l1] > nums2[l2]) {
        ret = nums2[l2];
        l2++;
      } else {
        ret = nums1[l1];
        l1++;
      }
      mid--;
    }
    if (mid) {
      // 还存在，证明是 n+m 是偶数，所以还需要找一个值
      const next = Math.min(nums1[l1] ?? Infinity, nums2[l2] ?? Infinity);
      return (ret+next)/2
    }
    return ret
  };
  