/*
 * @Author: your name
 * @Date: 2021-08-25 09:46:25
 * @LastEditTime: 2021-08-26 07:50:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/3.记忆化递归/2.走楼梯问题.js
 */

// [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)


/**
 * @分析 -- 记忆化递归 -- 自顶向下缓存对应的值
 * 1. 用 map 存储递归过程中存储不同楼梯长度 key, 对应的走法 value
 * 2. 每一次递归都先查 map 是否已经有答案，没有的时候再递归往下继续走
 * 3. base case，[0->1,1->1], 使用 map 缓存值，可以减少重复的中间操作，降低时间复杂度
 * 4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var climbStairs = function(n) {
    const map = new Map()
    map.set(1,1)
    map.set(0,1)
    const recursion= (n) => {
        if(map.has(n)) return map.get(n)
        const sum =  recursion(n-1)+recursion(n-2)
        map.set(n,sum)
        return sum
    }
    return recursion(n)
};

/**
 * @分析
 * 1. 使用 dp[i] 表示楼梯为 i 时，有多少种走法
 * 2. 状态转移方程: dp[i] = dp[i-1]+dp[i-2] 
 * 3. base case: dp[0] + dp[1] = 1  -- 啥也不走也是一种走法
 * 4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var climbStairs = function(n) {
    const dp = []
    dp[1] = 1
    dp[0] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
}