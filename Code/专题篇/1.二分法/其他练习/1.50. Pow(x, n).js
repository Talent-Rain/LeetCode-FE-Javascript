/*
 * @Author: your name
 * @Date: 2021-08-17 09:06:50
 * @LastEditTime: 2021-08-17 09:57:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/1.50. Pow(x, n).js
 */

// 50. Pow(x, n)

/**
 * @分析
 * 1. 直接将 n 进行拆分，然后递归求值 -- 然后超时了，因为很多值都是重复的，
 * 2. 然后就是快速迭代我们 2 - 4 -16 
 * 3. 值得注意的是，这里 n 的取值是 [-2^31,2^31-1] 本来没啥事，但是吧，你将 n 转成正数再执行, 那么 n >> 1 就有事了，一旦 n 是 -2^31,那么第一次递归的时候 recursion 的 n 就是负数了
 * 4. 所以要用 >>> 或者用数学的方法
 * 5. 时间复杂度 ${O(logn)}$
 */
var myPow = function (x, n) {
  const recursion = (n) => {
    if (n === 0) return 1;
    // const y = recursion(n >> 1);
    const y = recursion(Math.floor(n/2));
    return n % 2 ? y * y * x : y * y;
  };
  return n < 0 ? 1 / recursion(-n) : recursion(n);
};

console.log(myPow(2.1, 3));
console.log(myPow(2, -2));
