/*
 * @Author: your name
 * @Date: 2021-09-28 09:19:12
 * @LastEditTime: 2021-09-29 09:48:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/7.贪心算法/11.452. 用最少数量的箭引爆气球(未完成).js
 */
// 452. 用最少数量的箭引爆气球

/**
 * @分析 -- 分析失败
 * 1. 首先要审题并理解题目，虽然说的是二维空间的气球，但是实际排列的时候在一个坐标 x 上可能会存在气球的重叠；所以当箭从 x 射进去，就可以一次打破 n>1 个气球
 * 2. 所以题目就转换成 -- 每次找到`重叠最多`的位置进行射击，当气球射完需要多少箭；-- 也就是找到交集的数量 
 * 3. 这里可以和并查集进行对比，并查集遇到交集后，会扩展集合为并集，而这里是收缩到交集，所以刚好是相反的概念
 * 4. 这里用到的贪心思想就是，一旦有交集，我们就把两个气球收缩为一个更小的气球，局部贪心的将有交集的气球压缩到一个更小的气球中，这样最后剩下的气球就是相互隔离的，达到全局的贪心 -- 尽可能少的射击
 * 5. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 * 6. 这种写法失败的原因在于，找出来的结果是一个区间值，而射箭只需要一个点值就ok了，这相当于在条件限制的过程中，多加了筛选机制，进而合并的可能性会降低，进而最终结果会更大
 */
 var findMinArrowShots = function(points) {
    const len =  points.length 
    let ret = [] // 缓存没有交集的数组
    for(let i =0;i<len;i++){
        const pp  = points[i]
        let isMerge = false
        for(let i = 0;i<ret.length;i++){
            const rr = ret[i]
            // 如果起始位置都超过了终止位置，那么就没有交集了
            if(pp[0]>rr[1] || pp[1]< rr [0]) continue
            // 否则就是有交集了，那么只要保存交集就好，因为射中交集的时候，一次性就完成所有的气球爆炸
            ret[i] =  pp[0]<=rr[0]?[rr[0],Math.min(pp[1],rr[1])]:[pp[0],Math.min(pp[1],rr[1])]
            isMerge = true // 如果合并了
            break
        }
        if(!isMerge){
            ret.push(pp)
        }
    }
    console.log(ret)
    return ret.length
};

/**
 * @分析
 * 1. 基于上面那种两边同时限制，会出现分组限制更多的情况，我们限制其中一边进行排序，尽可能使用其中一边作为限制条件，在这里我们根据 left 作为排序依据进行排序
 * 2. 排序之后，我们只需要判断新的气球的最左边是否离开了当前气球的最右边，就可以判断是否是同一组；
 * 3. 如果属于同一组，那么需要现在这一组最 right 的位置，这个位置也是射击的最右位置，保证往这个点射进去，这一组的气球全爆，所以需要找的是交集最小值
 * 4. 时间复杂度 ${O(nlogn)}$, 空间复杂度 ${O(1)}$
 */
var findMinArrowShots = function(points) {
    const len =  points.length 
    points.sort((a,b)=>a[0]-b[0])
    let cur = -Infinity;
    let ret = 0
    for(let i = 0 ;i<len;i++){
        const pp  = points[i]
        if(pp[0]>cur) {
            // 超出范围了
            ret++
            cur = pp[1] // 修改
        }else{
            cur = Math.min(cur,pp[1])
        }
    }
    return ret
}

var findMinArrowShots = function(points) {
    const len =  points.length 
    points.sort((a,b)=>a[1]-b[1]) // 右侧排序
    let right = -Infinity;
    let ret = 0
    for(let i = 0 ;i<len;i++){
        const pp  = points[i]
        if(pp[0]>right) {
            // 超出范围了
            ret++
            right = pp[1] // 修改
        }
    }
    return ret
}

findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])
findMinArrowShots([[1,2]])
findMinArrowShots([[3,9],[7,12],[3,8],[6,8],[9,10],[2,9],[0,9],[3,9],[0,6],[2,8]])