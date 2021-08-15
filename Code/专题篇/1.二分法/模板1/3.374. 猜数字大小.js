/*
 * @Author: your name
 * @Date: 2021-08-15 09:26:42
 * @LastEditTime: 2021-08-15 09:37:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板1/3.374. 猜数字大小.js
 */


// 374. 猜数字大小

/**
 * @分析
 * 1. 这里内置一个函数 guess(n), 返回值是 -1 0 1, -1 是 targt 值更小
 */
var guessNumber = function (n) {
    let left = 1, right = n
    while(left<=right){
        const mid = ((right-left)>>1) + left

        if(guess(mid) === 0) return mid
        if(guess(mid)>0){
            // 这个时候 mid < pick
            left =mid+1
        }else{
            right = mid-1
        }
    }
}

// 自己模拟一下这个 guess 函数吧 -- 假定第二个参数就是目标猜的数字，我们可以用它来初始化，默认是5
function guess(num, pick = 5){
    if(num === pick) return 0
    if(pick<num) return -1
    if(pick>num) return 1
}