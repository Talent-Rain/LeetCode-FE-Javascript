// 455. 分发饼干
// https://leetcode-cn.com/problems/assign-cookies/

/**
 * @分析 -- 贪心
 * 1. 用最大的饼干满足胃口最大的小孩，这样就能局部最优求出全局最优，可以满足最多的小孩
 * 2. 由于 g,s 都需要取最大，所以需要排序
 * 3. 最后用两个端套的遍历找出最优解
 * 4. 时间复杂度 ${O(n+m)}$
 */
var findContentChildren = function (g, s) {
    g.sort((a,b) => a-b)
    s.sort((a,b) => a-b)
    let ret = 0
    let sl = s.length-1; 
    let gl = g.length-1
    while(gl>=0){
        // 人没了，饼干可以还存在
        if(s[sl]>=g[gl] && sl>=0){
            // 最大的饼干能否满足最大胃口的孩子
            ret++
            sl--
        }
        gl--
    }
    return ret
}