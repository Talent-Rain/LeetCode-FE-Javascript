/*
 * @Author: your name
 * @Date: 2021-08-11 22:41:43
 * @LastEditTime: 2021-08-12 22:35:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Program/面试热题/debounced.js
 */

function debounced(fn, timer = 14 * 24 * 3600) {
  let timeout; // 设置计时器，初始是 undefined
  const lockFn = () => {
    console.log("我的天啊，又要重新计算居家时间了");
    // 每次调用 lockFn, 就刷新计时时间，重新隔离
    timeout = setTimeout(() => {
      fn();
    }, timer);
  };
  return lockFn;
}

// 测试一下

const lockFn = debounced(() => {
  console.log("解封了，可以去浪了！");
  console.log("解封了，可以去浪了！");
  console.log("解封了，可以去浪了！");
}, 1000);

interval = setInterval(() => {
  const isBad = Math.random() * 10 > 9;
  console.log(`看看今天的疫情情况:${isBad ? "有新增" : `无新增`}`);
  if (isBad) {
    // 有 10% 的机会检验处理
    lockFn(interval);
  }
}, 500);
