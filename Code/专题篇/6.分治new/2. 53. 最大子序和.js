// 53. 最大子序和
// https://leetcode-cn.com/problems/maximum-subarray/

/**
 * @分析 -- 分治法
 * 1. 先分 -- 运用递归的方法将数组区间的左右节点 l,r 不断二分出去，直到 l === r 为止，这个时候需要考虑怎么治理了
 * 2. 再治 -- 这里最终要求的是最大的连续子序列，我们先考虑两个值合并，最大的情况是三种, Math.max(L,R,L+R), 
 *          但是当再多一点值的时候，我们就需要改变一下 Math.max(LMAX,RMAX,L_Rmax+R_Lmax) 这里的 LMAX, RMAX 是指合并两个区间的最大值，L_Rmax 是指在 L 区间包含 right 终点为最大区间；
 * 3. 所以治的过程中，每个区间需要有4个变量，分别是 totalSum 区间总和，leftSum 包含 left 节点的最大连续子列和, rightSum 包含 right 节点的最大连续子列和, maxSum 区间的最大值
 * 4. 初始化的时候，也就是单个节点的时候，4个变量都是唯一值 nums[l]
 * 5. 开始合并治理，totalSum 直接将两个节点的 totalSum 合并即可；
 *       leftSum 总是和 left 区间相关 -- Math.max(left.maxSum,left.totalSum+right.leftSum), 要不直接区左区间的最大值，要不全取左区间 + 右区间的 leftSum
 *       同理 rightSum 也总是和 right 区间相关 -- Math.max(right.maxSum,right.totalSum+left.rightSum)
 *       maxSum 分三种情况 -- Math.max(left.maxSum,right.maxSum,left.rightSum+right.leftSum)
 * 6. 所以先递后归，时间复杂度为 ${O(n)}$
 */
var maxSubArray = function (nums) {
    const recursion = (l,r) => {
        if(l === r) {
            return {
                totalSum: nums[l],
                leftSum: nums[l],
                rightSum: nums[l],
                maxSum: nums[l]
            }
        }
        const mid = ((r-l)>>2)+l
        const left = recursion(l,mid)
        const right = recursion(mid+1,r)
        return {
            totalSum:left.totalSum+right.totalSum, // 区间内值的总和
            leftSum:Math.max(left.leftSum,left.totalSum+right.leftSum), // 左边界开始的最大连续子列和
            rightSum: Math.max(right.rightSum,right.totalSum+left.rightSum), // 区间哟偶边界结束的最大连续子列和
            maxSum:Math.max(left.maxSum,right.maxSum,left.rightSum+right.leftSum)
        }
    }
    return recursion(0,nums.length-1).maxSum
}