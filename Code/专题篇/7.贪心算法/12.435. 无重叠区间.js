// 435. 无重叠区间
// https://leetcode-cn.com/problems/non-overlapping-intervals/

/**
 * @分析
 * 1. 和 [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/solution/pai-hao-xu-cai-neng-geng-hao-de-tan-xin-x74ey/) 类似，只是那边尽可能集合在一起，这里是要分开
 * 2. 所以这里以区间的右侧值做排序，这样 的好处就是，一旦某个值的 left 大于当前的 right 值，那么就出现完全隔离的区间了；
 * 3. 最后的答案就是长度减去可以完全隔离的区间
 */
var eraseOverlapIntervals = function(intervals) {
    const length = intervals.length
    intervals.sort((a,b) => a[1]-b[1]) // 按右侧大小排列好
    let  right = -Infinity
    let ret = 0 // 集合数量
    for(let i = 0;i<length;i++){
        const ii = intervals[i]
        if(ii[0]>=right) {
            ret++ 
            right = ii[1]
        }
    }
    return length-ret
}