// 1005. K 次取反后最大化的数组和
// https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/

/**
 * @分析
 * 1. 我们要转换，肯定是要将负数转成正数，这样能达到最大，那么情况有两种， k 充足将所有负数转换成正数，k 不足
 * 2. 第一次贪心，如果 k 不充足的时候，要先将最大的非负数，这种情况就需要排序了，所以一开始先排个序吧 -- 优先给最大的负数进行转换
 * 3. 第二次贪心，如果将所有非负数转成正数后，k 还有，那么这个时候只需要处理最小的那个值就好了；
 * 4. 我们在第一次贪心的时候是排好序去处理非负数的，所以当处理完非负数之后，index 所在的位置要不就是数组之外，要不就是原始数组第一个非负数，这个时候 index-1 就是转换后的最小非负数，他们之间的对比可以找出当前数组的最小值
 * 5. 需要注意两种特殊情况，如果入参 nums 全是非负数，则 index 不会移动，那么 nums[index-1] 就取不到，同理，如果 nums 全是负数，则 index 在数组外了，所以要把两种情况考虑进去
 * 6. 最后只需要对 min 进行反复转换，如果 k 是偶数，那么就直接不转了，如果是奇数，那么就减去 min*2
 * 7. 时间复杂度 ${O(nlogn)}$
 */
 var largestSumAfterKNegations = function(nums, k) {
     nums.sort((a,b)=>a-b)
     let index = 0
     while(k && nums[index] < 0){
        // 如果 k 还存在且当前值还是负数的时候，就转换
        nums[index] = - nums[index]
        k--
        index++
     }
    // 转换后 index 所在的位置就是最开始最小值非负数了，但是它有可能比转换后的最小正数小，所以要对比一下
    // 但是如果 index 是第一个值，也就是一开始全都是非负数的时候，这个时候就没有 index-1 了；
    // 同理，如果全是负数，那么 index 就不存在了

    let min = index=== 0 ? nums[index] : index=== nums.length?nums[index-1] :Math.min( nums[index], nums[index-1])
    // 先将所有负数都转成正数 -- 如果 k 还存在，那么就处理 nums[index] 就好了
    let sum  = nums.reduce((pre,cur)=>pre+cur,0)
    if(k % 2) sum -= min*2
    return sum
};