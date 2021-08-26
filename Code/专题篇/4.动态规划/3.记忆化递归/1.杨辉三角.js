/*
 * @Author: your name
 * @Date: 2021-08-25 09:46:52
 * @LastEditTime: 2021-08-26 08:31:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/3.记忆化递归/5.杨辉三角.js
 */

// 118. 杨辉三角

var generate = function(numRows) {
    const dp = new Array(numRows)
    for (let i = 0; i < numRows; i++) {
        dp[i] = new Array() ;
        for(let j = 0;j<=i;j++){
            // 杨辉三角的两边都是 1
            if(j ===  0  || j === i) {
                dp[i][j] = 1
                continue
            }
            dp[i][j] = dp[i-1][j-1]+dp[i-1][j]
        }      
    }
    return dp
};

console.log(generate(1))
console.log(generate(2))
console.log(generate(5))