/*
 * @Author: your name
 * @Date: 2021-08-16 07:12:17
 * @LastEditTime: 2021-08-16 08:52:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板2/3.153. 寻找旋转排序数组中的最小值.js
 */

// 153. 寻找旋转排序数组中的最小值

/**
 * @分析
 * 1. 这里其实就是找谷值，注意的是，这里的值互不相等且局部单增 ，所以可以加一个辅助条件 nums[-1] = nums[len] = infinite,这样能保证谷值在边缘也能直接找到
 * 2. 注意：这里返回的是最小值，而不是最小坐标
 */
 var findMin = function (nums) {
    let len = nums.length;
    nums[-1] = nums[len] = Infinity;
    let left = 0,
      right = len - 1;
  
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
  
      if (nums[mid - 1] > nums[mid] && nums[mid] < nums[mid + 1])
        return nums[mid]; //谷值

      if(nums[mid]<nums[mid+1] && nums[mid]<=nums[right]){
          // [mid,right] 单增
          // 注意这个等号为啥要加，可以考虑一下如果 left 和 right 相等时，对应的 mid 也是这个点，那么是让 right 走，还是让 left 走；这里我们最后返回值是 left,所以让 right 走一步结束战斗
          right = mid-1
      }else{
          left = mid+1
      }
    }
  
    return nums[left];
  };
  