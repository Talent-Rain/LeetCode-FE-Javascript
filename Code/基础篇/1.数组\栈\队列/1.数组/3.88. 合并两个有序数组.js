// 88. 合并两个有序数组
// https://leetcode-cn.com/problems/merge-sorted-array/

/**
 * @分析
 * 1. 这里给定的 m,n 是 nums1，nums2 实际有值的长度，而合并后的数组都存在 nums1 上， 所以 nums1.length === m+n 的，这个是题目设置
 * 2. 这里显然是想让 nums2 的值并到 nums1 中，然后也不需要返回，程序会识别 nums1 为最终输出结果;
 * 3. 由于是以 nums1 的长度为基础，所以就不能用一些原地增添的值，在不使用 js 的 api 前提下处理本题；
 * 4. 设置指针 index1 指向 nums1 真实存在的值 -- 下标为 [0,m-1] 的值；然后每次都和排序好的 nums2[0] 进行比较；
 * 5. 如果 nums2[0] < nums1[index1], 则交换两者的值，然后用冒泡的方式整理 nums2 ， 使得它仍然是有序数组
 * 6. 当 index1 >= m 的时候，只需要按需将后面的长度的值替换为 nums2 上的值即可
 * 7.  遍历一遍长度为 m+n, 每次交换都需要整理一圈，最优为1，最差为 n, 所以时间复杂度:最优是 ${O(n+m)}$, 最差为 ${O(n*m+n)}$
 */
 var merge = function(nums1, m, nums2, n) {
    
    let index1 = 0 // 设置 nums1 指针指向
    while(index1<m) {
        // 当 nums2 的值更小的时候，我们需要在 nums2 中找出 nums1[index1] 应该处于 nums2[index2] 的位置
        if(nums2[0]<nums1[index1]){
            [nums1[index1],nums2[0]] = [nums2[0],nums1[index1]]; 
            // 交接之后，整理一下nums2
            let index2 = 1
            while(nums2[index2]<nums2[index2-1] && index2<n) {
                // 冒泡到需要的位置上去
                [nums2[index2],nums2[index2-1]] = [nums2[index2-1],nums2[index2]];
                index2++
            }
        }
        index1++
    }
    // 这个时候只需要将 nums2 的值拷贝到 nums1 后面即可
    while(index1 < m+n) {
        nums1[index1] = nums2[index1-m]
        index1++
    }
};