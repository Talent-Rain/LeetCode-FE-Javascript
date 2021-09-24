/**
 * @分析 -- 已知能到达位置，求最少跳跃次数
 * 1. 看到最少，想到用 dp 做；其中 dp[i] 就是到达 i 这个位置最少需要跳跃的次数, 但是控制当前状态的变量在上一个值，感觉 dp 不太合适
 * 2. 感觉用贪心+回溯会更好一点，每一次尽量远的跳，如果不行再跳回来
 * 3. 然后正常超时了
 */
var jump = function(nums) {
    if(nums.length < 2) return 0
    let ret = Infinity

    const dfs = (index,sum) => {
        if(index>=nums.length-1) {
            // 贪心走出来的，肯定是
            ret = Math.min(sum,ret)
            return 
        }
        if(sum>=ret || nums[index] === 0) return // 只要出了第一个，后面的全部不玩了
      
        for(let i = nums[index];i>0;i--){
            dfs(index+i,sum+1)
        }
    }
    dfs(0,0)
    return ret
};

/**
 * @分析
 * 1. 考虑到跳跃范围必须覆盖一定范围，求最小的目的，还是从后倒推前面会更舒服一点，所以考虑 dp；
 * 2. dp[i] 表示跳跃到 i 这个位置最小的次数
 * 3. 状态转移方程: dp[i] = Math.min(dp[i-valid]+1) 这里的 valid 是值符合 nums[j]+j >= i 的 dp[j], 这样在 j 这个位置才能一次跳到 i
 * 4. base case: dp[0] = 0 原地蹦跶
 * 5. 时间复杂度 ${O(n^2)}$
 */
var jump = function(nums) {
    const dp = new Array(nums.length)
    dp[0] = 0 // 原地蹦跶
    for(let i=1;i<nums.length;i++){
        dp[i] = Infinity
        for(let j = i-1;j>=0;j--){
            if(nums[j]+j>=i){
                // 这样才能从 j 跳到 i
                dp[i] = Math.min(dp[i],dp[j]+1)
            }
        }
    }
    return dp[nums.length-1]
}

/**
 * @分析 -- 贪心
 * 1. 每一次跳动都可以缓存最大跳跃范围，这是一个范围而不是一个值，所以下一跳的时候，需要从这个范围内找到最最大跳跃的范围
 * 2. 所以只要迭代每一个值，就可以找到跑到这个值的时候，最大跳跃的覆盖范围 nextIndex 的位置, 同样的，我们将上一轮的最大距离设置为 curIndex
 * 3. 每当迭代到 curIndex, 表明上一次跳跃的覆盖范围都已经遍历完，并且记录好了这个范围内的最大值 nextIndex 了，这个时候更改 curIndex = nextIndex
 * 4. 其实整个过程就是在 [curIndex,nextIndex] 中找最大范围，然后不断迭代；
 * 5. 只需要遍历一次就能找到结果了，所以时间复杂度 ${O(n)}$
 */
 var jump = function(nums) {
    let curIndex = nextIndex = 0
    let ret = 0
    for(let i =0;i<nums.length;i++){
        if(curIndex >=nums.length-1) return ret // 如果最大覆盖范围已经找到了地方，那么就直接跳出遍历了
        nextIndex = Math.max(nextIndex,nums[i]+i) // 最远覆盖范围
        if(curIndex === i) {
            // 如果 i 到达上一次最远覆盖位置，那么 nextIndex 就是上一轮 [cur,next] 的最大距离，现在需要更新一下
            curIndex = nextIndex
            // 所谓覆盖，就是 jump 一次
            ret++
        }
    }
}    