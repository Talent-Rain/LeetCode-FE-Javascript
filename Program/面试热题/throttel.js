/*
 * @Author: your name
 * @Date: 2021-08-11 23:14:31
 * @LastEditTime: 2021-08-12 08:02:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Program/面试热题/throttel.js
 */

// 节流 -- 一定时间内只一次
function throttle(fn, timer) {
  let timeout;
  const lockedFn = () => {
    console.log(1,!timeout)
    if (!timeout) {
      timeout = setTimeout(() => {
        fn(); // 执行完了
        timeout = null
        console.log(2,!timeout)

      }, timer);
    }
  };
  return lockedFn;
}
// 测试一下
const lockFn = throttle(() => {
  console.log("啊，那个");
}, 1000);
for (let i = 0; i < 20; i++) {
  console.log(i);
  setTimeout(() => {
  lockFn();
      
  }, 100);
}
