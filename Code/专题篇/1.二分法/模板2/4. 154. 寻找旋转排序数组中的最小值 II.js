/*
 * @Author: your name
 * @Date: 2021-08-16 08:20:42
 * @LastEditTime: 2021-08-16 08:52:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板2/4. 154. 寻找旋转排序数组中的最小值 II.js
 */

// 154. 寻找旋转排序数组中的最小值 II


var findMin = function(nums) {
    const len  = nums.length
    nums[-1] = nums[len] = Infinity
    let left = 0,right = len-1
    while(left<=right){
        const mid = ((right-left)>>1) + left

        // 将右侧与 mid 同值的值删掉
        while(nums[right] === nums[mid] && right>mid){
            right -- 
        }
        // 由于存在重复值，所以拐点值右侧可以是直线，而不一定是单增
        if(nums[mid-1]>nums[mid] && nums[mid]<=nums[mid+1]) return nums[mid]

        if(nums[mid]<=nums[right]){
            // 上一题这里的等号是当 left 和 right 重合时的特殊情况
            // 现在由于值可能重复，所以不能直接判断出 [mid,right] 是递增的区间了，所以要先为右侧相同的值进行删减，然后再进行即可
            right = mid-1
        }else{
            left = mid+1
        }
    }
    return nums[left]
};