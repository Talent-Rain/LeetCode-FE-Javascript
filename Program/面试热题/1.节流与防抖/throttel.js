/*
 * @Author: your name
 * @Date: 2021-08-11 23:14:31
 * @LastEditTime: 2021-08-12 22:47:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Program/面试热题/throttel.js
 */

// 节流 -- 一定时间内只一次
function throttle(fn, timer) {
  let timeout;
  const lockedFn = () => {
    console.log('医生忙着检测，节省体力，并没有理会');
    if (!timeout) {
      timeout = setTimeout(() => {
        fn(); // 执行完了
        timeout = null;
      }, timer);
    }
  };
  return lockedFn;
}
// 测试一下
const lockFn = throttle(() => {
  console.log("医生：这一批好了，下一个");
  console.log(`-----`);
}, 1000);

interval = setInterval(() => {
  console.log(`没过一阵子，就会有人询问：医生，好了么，到我们了吗？`);
  lockFn(interval);
}, 500);
