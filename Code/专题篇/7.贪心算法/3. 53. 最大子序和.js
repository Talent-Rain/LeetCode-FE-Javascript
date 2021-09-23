// 53. 最大子序和
// https://leetcode-cn.com/problems/maximum-subarray/

/**
 * @分析 -- 贪心
 * 1. 求的是最大和的`连续子数组`
 * 2. 用 sum 缓存前面和大于 0 的子数组之和，一旦小于 0 ，就不再累加，重新置 0, 保持每一次迭代前 sum 的值都是 >=0
 * 3. 这样对于每一个局部子数组，它的累加值都是大于等于 0 的，这样每次累加一个新值，就进行最大值比较，保证整体是一个最大子数组之和
 * 4. 时间复杂度 ${O(n)}$
 */
var maxSubArray = function (nums) {
  let max = -Infinity;
   let sum = 0
   for(let i = 0 ;i<nums.length;i++){
       sum+=nums[i]
       max = Math.max(sum,max)
       if(sum<=0){
           sum=0
       }
   }
   return max
};
