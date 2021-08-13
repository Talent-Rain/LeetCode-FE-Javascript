/*
 * @Author: your name
 * @Date: 2021-08-13 19:41:07
 * @LastEditTime: 2021-08-13 20:19:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/14.817. 链表组件.js
 */

// 817. 链表组件
// https://leetcode-cn.com/problems/linked-list-components/

/**
 * @分析
 * 1. 这里说明了 head 中的值都是唯一的，且 nums 中的值都是 haed 值中的子集，所以可以另开一个 [0,N-1] 的数组，将 nums 的值作为下标放进去
 * 2. 这样就可以直接用数组下标判断head 中的值是否包含在 nums 中，且复杂度为 ${O(1)}$
 * 3. 最后返回值是有多少个组件，也就是一旦断开链表，组件数量就加一
 */
var numComponents = function (head, nums) {
  const arr = [];
  for (let num of nums) {
    arr[num] = 1;
  }
  let len = nums.length;
  let ret = 0;
  let count = 0; //每一个组件的长度 -- 必须大于 1 才能组成一个组件
  while (head && len) {
    if (arr[head.val]) {
      // nums 的值在减少，一旦为 0 了，就结束遍历了
      count++; // 万一需要求最大组件，就可以用这个 count 了
      len--;
    }
    if (count && !arr[head.val]) {
      // 处于匹配状态，但是这一次却没有匹配值
      ret++;
      count = 0; // 恢复到 0, 继续下一次的匹配
    }
    head = head.next;
  }
  return count ? ret + 1 : ret; //弹出遍历时如果还存在有匹配的组件没计算，则再加1
};
