/*
 * @Author: your name
 * @Date: 2021-08-30 09:11:25
 * @LastEditTime: 2021-08-30 09:30:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/只出现一次的数字/3.260. 只出现一次的数字 III.js
 */

// 260. 只出现一次的数字 III

/**
 * @分析 -- 2个1次的值 x1,x2，其余都是两次的
 * 1. 先用异或将所有 nums 中的值进行运算，得到 x1 ^ x2 的值 res，
 * 2. 对于 res,我们知道他们是由两个值 x1,x2 异或得到，也就是说，对于res，在某一个位上有值，那么另外一个肯定不在这个位上，不然就相互抵消了
 * 3. 所以找出第一个存在的位 bite 和对应的值 temp，然后这个时候就变成了，找出唯一一个单值，它存在于位  bite 上
 */
var singleNumber = function(nums) {
    // 求出的 res 是 x1 ^ x2 的异或值
    const res = nums.reduce((prev,cur) => prev^ cur,0)
    let bite= 0
    // 求出 res 在二进制中的第一个 1 的位置，
    while((1<<bite) & res === 0 ){
        bite++
    }
    // 这个二进制位对应的值，用它可以求出所有存在这个为的值
    // x1,x2 有且仅有一个会与 temp 的 & 运算不为 0
    const temp = 1<<bite
    let left = 0,right = 0
    nums.forEach(num => {
        if(num & temp){
            left ^= num // 保证 left 是存在 bite 位的值，其他出现两次的值会被异或掉
        }else{
            right ^= num
        }
    })
    return [left,right]
};