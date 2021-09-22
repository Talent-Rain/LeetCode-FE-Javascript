/*
 * @Author: your name
 * @Date: 2021-09-22 09:19:08
 * @LastEditTime: 2021-09-22 09:43:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/7.贪心算法/2.376. 摆动序列.js
 */
// 376. 摆动序列
// https://leetcode-cn.com/problems/wiggle-subsequence/

/**
 * @分析
 * 1. 连续数字之间差值是正负交替的，叫做摆动序列；
 * 2. 边缘情况，如果只有1个值，或者两个不相等的值，也是摆动序列
 * 3. 如果出现 0， 则直接不是摆动序列了
 * 4. 实践复杂度 ${O(n)}$
 */
var wiggleMaxLength = function(nums) {
    if(nums.length<2) return nums.length
    let ret = 1 // 从 1 开始是因为要求的是整个摆动序列的长度，所以先初始化1，然后遇到极值递增即可
    let preDiff = 0 // 初始化第一个差值；设置为0，则无论真正第一个差值是多少，得到的都是 0
    let curDiff = 0
    for(let i = 1;i<nums.length;i++){
        curDiff = nums[i]- nums[i-1]
        // 差值必须是正负数，如果是 0 则跳过
        if(curDiff === 0) continue
        if(preDiff * curDiff <= 0){
            ret++
            preDiff = curDiff
        }
    }
    return ret
};