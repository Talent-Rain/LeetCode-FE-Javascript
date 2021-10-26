// 剑指 Offer 53 - II. 0～n-1中缺失的数字
// https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/
/**
 * @分析
 * 1. 这里是给定了 [0,len] 中缺失的一个数组，我们可以直接用异或直接取值
 * 2. 相同值异或得到0, 0 和任意值异或得任意值
 * 3. 由于数组 nums 中都是只出现过一次的值，那么我取 [1,2,...len] 来与 nums 中的值进行异或，最后剩下的值就是缺失的值，因为相同值都抵消了，只剩下 0 和 target 异或得 target
 * 4. 时间复杂度为 ${O(n)}$
 * 5. 本题同 [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/submissions/)
 */
var missingNumber = function(nums) {
    return nums.reduce((prev,cur,index) => prev ^ cur ^ (index+1), 0)
};

