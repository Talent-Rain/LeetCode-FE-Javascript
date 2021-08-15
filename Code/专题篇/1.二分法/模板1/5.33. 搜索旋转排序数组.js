/*
 * @Author: your name
 * @Date: 2021-08-15 09:37:50
 * @LastEditTime: 2021-08-15 10:35:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板1/5.33. 搜索旋转排序数组.js
 */

// 33. 搜索旋转排序数组

/**
 * @分析
 * 1. 已知：原始数组 nums 是生序排序的，且数组中的值不一样的
 * 2. 入参的 nums 是在某个下标 k 的作用下发生了重置，使得 nums 现在是先升序数组 [k,len-1]然后断裂后，再一个升序数组[0,k-1]
 * 3. 这是一个局部排好序的数组，所以可以用二分处理,返回的是 target 值的下标或者 -1
 * 4. 所以每次都用排好序的一半来作为判断依据，如果在排好序这边，则删除另外，反之亦然
 * 5. 时间复杂度 ${O(logn)}$
 */
 var search = function (nums, target) {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
      if (nums[mid] === target) return mid;
      if (nums[mid] >= nums[left]) {
        // [left,mid] 是有序的
        if ( nums[left] <= target && target < nums[mid]) {
          // target 在[left , mid) 中
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        // [mid,right] 是有序的
        if (  nums[mid] < target && target<=nums[right]) {
          // target 在（mid , right] 中
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
    return -1;
  };
  