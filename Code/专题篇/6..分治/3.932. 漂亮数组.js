/*
 * @Author: your name
 * @Date: 2021-07-10 09:57:05
 * @LastEditTime: 2021-07-10 11:08:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/分治/1.不同的二叉树/3.932. 漂亮数组.js
 */

// 932. 漂亮数组

/**
 * @分析 -- 分治
 * 1. 题目分解到最小的3个一组时，其实就是希望 L+R !== M*2 , 那么只要某一次取值，左侧为奇数，右侧为偶数，则 M 无论取什么数都符合要求
 * 2. 但是对于一层而言，将值按照奇偶分治没问题，但是如果取的都是奇数或者都是偶数呢？拿稳就有一个问题，就是在某一层取同奇同偶时，也要保证符合`漂亮`
 * 3. 现在有一个新的等式，就是当 L+R !== M^2 的时候，( kL+i) +(kR+i) !==(kM+i)^2
 * 4. 由小学数学可知，[1,2N] 个数的奇数可以由 i属于[1,N]，2*i-1 得到，偶数就是 2*i 得到
 * 5. 从第3，4部可以回到第 2 个问题，对于顶层单边的值，只要它下一层也按照奇偶分治，然后取值在下一层也是`一奇一偶`,那么根据 3,4 的等式,就可以得到`漂亮`的结果
 * 6. 一直分治到 n === 1 的时候，这个时候就只有一种 [1]，属于边界
 * 7. 我们是从顶层 N 往下分，分到 1结束，然后再从 1 进行合并，最后得到长度为 N 的数组，这个过程中，小的漂亮数组会被重复使用，所以可以用 map 保存下来，key 就是漂亮数组的长度 L， value 就是漂亮数组
 * 8. 从低到高的时候，每次取出小的漂亮数组，然后遍历 2i-1 取得左侧全奇数组， 遍历取得 2i 全偶数组，然后合并成最新的的漂亮数组
 * 9. 空间复杂度 ${O(N)}$, 时间复杂度 ${NlogN}$
 */
var beautifulArray = function (n) {
  const map = new Map();
  map.set(1, [1]); // 基础值
  const recursion = (n) => {
    //   如果已经保存过了，直接取漂亮数组
    if (map.has(n)) return map.get(n);
    // n 的奇偶不定，所以奇数向上取整，即 n===5 时，奇数有 5+1 >> 1 个，偶数只有 5>>1 个
    const left = recursion((n + 1) >> 1).map((item) => item * 2 - 1);
    const right = recursion(n >> 1).map((item) => item * 2);
    const ret = [...left, ...right]; // 合并起来
    map.set(n, ret); // 做个保存
    return ret;
  };
  return recursion(n);
};
