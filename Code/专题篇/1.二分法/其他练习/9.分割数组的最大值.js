/*
 * @Author: your name
 * @Date: 2021-08-21 14:39:58
 * @LastEditTime: 2021-08-21 15:17:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/9.分割数组的最大值.js
 */

// 410. 分割数组的最大值

/**
 * @分析
 * 1. 切分数组 nums，使得切割后数组和最大的那个值最小 -- 子数组是连续的；
 * 2. 也就是尽可能按照总和均匀的将值分配到每一个数组中，且每个数组中最少有一个值,所以最小值应该就是 max(nums[i]), 最大值是 sum(nums)
 * 3. 设计一个函数 check(max), 判断是否能切割出 m 个连续子数组，且值小于等于 max；如果可以，证明这个是一个较大值，可以继续向左侧逼近，找到一个更小的值；如果不可以，证明这个值 max 偏小了，需要求的值在右侧
 */
 var splitArray = function (nums, m) {
    //    先找到 left 和 right
    let left = 0,
      right = 0;
    for (let num of nums) {
      left = Math.max(num, left);
      right += num;
    }
      //  切割最大值不超过 max 的数组，如果切出来的数组数量少于 m，则证明可以切得更新，发挥 true
    // 如果切除来的数组数量超出了 m, 证明只且 m 组的时候，最小值要超出 max 了，返回 false
    function check(max) {
      let ret = 0,
        sum = 0;
      let i = 0;
      while (i < nums.length) {
        sum += nums[i];
        if (sum >max) {
        // 一旦超出 max，则分组结束，sum 重新设置为 nums[i]
          ret++;
          sum = nums[i];
        }
        i++
      }
    //   如果最后还有剩，单独成团
      ret = sum ? ret + 1 : ret;
      return ret<=m
    }
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
      if (check(mid)) {
        //   如果能找到，向左逼近 -- right 最后得到的是一个不成功的值，因为只要成功它就要发生改变
        right = mid - 1;
      } else {
        //  left 最终出去的时候，肯定代表一个成功的值
        left = mid + 1;
      }
    }
  
    return left;
  };

  console.log(splitArray([7,2,5,10,8],2))
  console.log(splitArray([1,2,3,4,5],2))
  