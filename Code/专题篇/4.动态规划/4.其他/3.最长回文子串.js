/*
 * @Author: your name
 * @Date: 2021-08-28 08:05:03
 * @LastEditTime: 2021-08-29 21:45:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/4.其他/3.最长回文子串.js
 */

// 5. 最长回文子串

/**
 * @分析
 * 1. 状态定义 -- dp[i][j] 表示 在[i,j]的子串是一个回文子串
 * 2. 状态转移方程: dp[i][j] = s[i] === s[j] && dp[i+1][j-1] 
 * 3. base case: j-i<1 && s[i] === s[j] 时，dp[i][j] = true, 他们就是回文子串
 * 4. dp 是根据已知值去推断无后续性的值，所以要求 dp[i][j] 的时候，要不 dp[i+1][j-1] 已经知道，要不就是一个 base case
 * 5. 所以外层包裹的是一个终点值，然后 i 处于内层向前扩展
 */
 var longestPalindrome = function(s) {
    const dp =Array.from(s).map(() => new Array()) 
    let ret = ''
    for(let j = 0;j <s.length;j++){
        for(let i =j;i>=0;i--){
            if( j-i<2 && s[i] === s[j]){
                // base case : 单个字符
                dp[i][j] = true
            }else if(s[i] === s[j] && dp[i+1][j-1]){
                dp[i][j] = true
            }
            if(dp[i][j] && j-i+1>ret.length){
                ret = s.slice(i,j+1)
            }
        }   
    }
    return ret
};

