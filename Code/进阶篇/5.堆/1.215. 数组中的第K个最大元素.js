/*
 * @Author: your name
 * @Date: 2021-07-25 10:49:41
 * @LastEditTime: 2021-07-25 10:49:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/1.215. 数组中的第K个最大元素.js
 */

// 215. 数组中的第K个最大元素

var findKthLargest = function (nums, k) {
    // 创建一个 K 大的小顶堆
    const minHeap = new MinHeap(k);
    const len = nums.length;
    for (let i = 0; i < len; i++) {
      if (i < k) {
        // 初始化堆
        minHeap.data.push(nums[i]);
        minHeap.upper();
      } else {
        // 这个时候开始考虑是否要压到小顶堆中了
        // 因为维护的是一个 k 大的小顶堆，而目的是求第 k 大，所以只需要判断后面的值是否大于小顶堆的堆顶值，即可晓得是否需要取代
        if (nums[i] > minHeap.data[1]) {
          minHeap.data[1] = nums[i];
          minHeap.down(1);
        }
      }
    }
    return minHeap.data[1]
  };
  
  