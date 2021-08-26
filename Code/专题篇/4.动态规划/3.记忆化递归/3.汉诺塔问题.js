/*
 * @Author: your name
 * @Date: 2021-08-25 09:46:38
 * @LastEditTime: 2021-08-26 08:17:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/3.记忆化递归/3.汉诺塔问题.js
 */

// [面试题 08.06. 汉诺塔问题](https://leetcode-cn.com/problems/hanota-lcci/)

/**
 * @分析
 * 1. 这个一个典型的递归问题
 */
var hanota = function(A, B, C) {
    const len = A.length;
    const recursion = (n,first,second,end) => {
        if(n === 1) {
            const a = first.pop()
            end.push(a)
            return
        }
        // 将 n-1 个值从 first -> end -> second, 然后将最后的值从 first 移动到 end
        recursion(n-1,first,end,second)
        end.push(first.pop())
        // 现在 end 有一个值， second 有 n-1 个值 ， first 为空
        // 再将 n-1 个值从 second -> first -> end
        recursion(n-1,second,first,end)
    }
    recursion(len,A,B,C)
};