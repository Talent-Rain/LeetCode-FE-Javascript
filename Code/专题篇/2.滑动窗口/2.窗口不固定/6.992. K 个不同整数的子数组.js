/*
 * @Author: your name
 * @Date: 2021-09-07 08:20:11
 * @LastEditTime: 2021-09-07 08:41:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/6.992. K 个不同整数的子数组.js
 */

// 992. K 个不同整数的子数组

/**
 * @分析
 * 1. 只要种类 map.size === k 的窗口，都是符合要求的，所以窗口大小不固定
 * 2. 遍历 r 指针，并在每次判断时固定 r 指针，设计 l1 指针，使得 [l1,r] 中的种类小于等于 k， 设计 l2,使得 [l2,r] 中的变量小于 k
 * 3. 则每一个固定的 r，中，[l1,l2) 之间的值和后续的 [l2,r] 可以构成变量为 k 的子数组，所以每一次固定 r ，最终得到符合要求的数量是 l2-l1
 * 4. 整体思路和 [930. 和相同的二元子数组](https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/shuang-hua-chuang-shuang-zhi-zhen-qian-z-s4yi/) 一样
 * 5. 只是一个的判断条件是子数组的和，一个是子数组中的种类
 * 6. 这种只求组合数量的题目，都需要关注判定值合规的时候，窗口左右延伸都是可以得到合适的值的
 * 7. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
 */
var subarraysWithKDistinct = function (nums, k) {
  let ret = 0;
  const map1 = new Map(); // 用来存储窗口中值和出现的次数
  const map2 = new Map(); // 用来存储窗口中值和出现的次数
  let l1 = (l2 = 0);
  let r = 0
  while (r < nums.length) {
    const rr = nums[r];
    map1.set(rr, map1.get(rr) ? map1.get(rr) + 1 : 1);
    map2.set(rr, map2.get(rr) ? map2.get(rr) + 1 : 1);
    while (map1.size > k) {
      // 窗口的变量已经超过了 k，所以需要 l 指针收缩
      const ll = nums[l1];
      l1++;
      if (map1.get(ll) === 1) {
        map1.delete(ll);
      } else {
        map1.set(ll, map1.get(ll) - 1);
      }
    }

    while (map2.size >= k) {
        // 窗口的变量已经超过了 k，所以需要 l 指针收缩
        const ll = nums[l2];
        l2++;
        if (map2.get(ll) === 1) {
          map2.delete(ll);
        } else {
          map2.set(ll, map2.get(ll) - 1);
        }
      }
      ret += l2-l1
    r++;
  }
  return ret;
};
