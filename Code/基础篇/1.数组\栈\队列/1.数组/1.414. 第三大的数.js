// 414. 第三大的数
// https://leetcode-cn.com/problems/third-maximum-number/

/**
 * @分析
 * 1. 注意，这里的第三大，和第 k 大是有区别，这里要求的是第三大的数，不是从大到小的第三个，因为可能遍历下来会有重复的值，必须是第3个值
 * 2. 由于只是单存要第 3 个，直接用冒泡即可
 * 3. 用 valid 表示冒泡出来的 n 个 不同的值，只要等于 3 的那个就结束冒泡遍历了
 * 4. 用 count 表示冒泡遍历的次数，由于可能会有 m 次相同给的值 k 大，所以需要和 valid 区分开来
 * 5. 最后如果找出了 3 个 valid 值，那么就取当前的第 len-count 下标下的值，如果 valid 不足 3 个，就取最大值
 * 6. 最佳的时间复杂度就是 ${O(n)}$, 最差的就是需要完全遍历 n 次，那么复杂度就是 ${O(nlogn)}$
 */
 var thirdMax = function(nums) {
    let valid = 0
    let count = 0
    while(valid < 3 && count<nums.length) {
        for(let i = 1;i<nums.length-count;i++){
            if(nums[i]<nums[i-1]){
                [nums[i-1],nums[i]] = [nums[i],nums[i-1]]
            }
        }
        if(valid === 0 || nums[nums.length-count] !== nums[nums.length-count-1]) valid++ // 如果第一次或者冒泡完之后不与上一个值值相等的时候，才会
        count++ // 这个是冒泡的次数
    }
    return valid===3 ?nums[nums.length-count]:nums[nums.length-1] // 最后找到的是 count 的那个,或者最大那个
};