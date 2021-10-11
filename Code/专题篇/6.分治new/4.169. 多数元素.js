/*
 * @Author: your name
 * @Date: 2021-10-11 07:01:15
 * @LastEditTime: 2021-10-11 07:49:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/6.分治new/4.169. 多数元素.js
 */
// 169. 多数元素
// https://leetcode-cn.com/problems/majority-element/

/**
 * @分析 -- 摩尔投票法
 * 1. 如果有一个值 target 得到票数是 nums 的一半以上，那么对于任意一个最开始的取值，我们都可以假设为 target，然后维护一个票数 count
 * 2. 如果 count 已经为 0 了，那么就替换 target 值，直到最后留在 target 上的值，就是所求的值
 * 3. 这里考虑最极端的情况，就是一开始就取到了真实的 target 值，它不断和其他值进行抵消，由于 target 的数量是大于一半的，所以最后还是能保留在 target 上
 * 4. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(1)}$
 */
var majorityElement = function(nums) {
    let target;
    let count = 0
    for(let num of nums){
        if(count === 0 && target !== num) {
            // 如果 count 为 0， 证明上一个 target 已经无效了
            target = num 
        }
        if(target === num){
            count++
        }else{
            count--
        }
    }
    return target
};

/**
 * @分析 -- 分治
 * 1. 先分：将 nums 拆分到单个值的数组之后，然后开始治理
 * 2. 再治：合并的时候，先找出两个合并的众数值和数量，然后再考虑合并之后哪一个才是真正的众数；
 * 3. 再治2：选择众数是通过比较两个合并数组得到的，合并之后众数值是两个数组都要获取的，所以每一次治的时候都要再次获取对应 target 的数量
 * 4. 治理解析: 为什么直接比对两个数组的众数就能得到合并后数组的众数，那么这两个值就当前数组最有可能的众数了，只要比对这两个值就能得到当前合并数组的真正众数了
 * 5. 二分递归的时间复杂度是 logn, 每一次治理合并的时候的复杂度也是 logn，所以时间复杂度是 ${O(n)}$,空间复杂度 ${O(1)}$
 */
 var majorityElement = function(nums) {
    const recursion = (l,r) => {
        if(l === r) return nums[l]
        const mid = ((r-l)>>1)+l 
        const lMax = recursion(l,mid)
        const rMax = recursion(mid+1,r)
        if(lMax === rMax) return lMax // 如果相等，则就是众数了
        let lMaxtCount = 0
        let rMaxtCount = 0
        for(let i=l;i<=r;i++){
            if(nums[i] === lMax) lMaxtCount++
            if(nums[i] === rMax) rMaxtCount++
        }

        return lMaxtCount>rMaxtCount ? lMax:rMax
    }
    return recursion(0,nums.length-1)
}