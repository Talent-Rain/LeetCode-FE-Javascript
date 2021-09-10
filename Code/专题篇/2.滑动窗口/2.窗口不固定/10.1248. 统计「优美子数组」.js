// 1248. 统计「优美子数组」

/**
 * @分析
 * 1. 用 odd 表示窗口里存在的奇数, 只要超过了，就必须收缩窗口 -- 不定滑窗
 * 2. 这里和 [930. 和相同的二元子数组](https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/shuang-hua-chuang-shuang-zhi-zhen-qian-z-s4yi/) 类似，需要构建双滑窗
 * 3. 时间复杂度为 ${O(n)}$
 */
var numberOfSubarrays = function(nums, k) {
    let ret = 0
    let odd1 = 0
    let odd2 = 0
    let l1 = l2 = r = 0
    while(r<nums.length){
        const rr = nums[r]
        if(rr%2){
            odd1++
            odd2++
        }
        while(odd1>k){
            // 收缩 l1
            const ll =nums[l1]
            l1++
            if(ll%2) odd1--
        }
        while(odd2 >= k){
            // 收缩 l1
            const ll =nums[l2]
            l2++
            if(ll%2) odd2--
        }
        // 这个时候 [l1,l2) 都属于可以合格的数组
        ret+=l2-l1
        r++
    }
    return ret
};