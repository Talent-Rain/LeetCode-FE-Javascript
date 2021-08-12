/*
 * @Author: your name
 * @Date: 2021-08-11 22:41:43
 * @LastEditTime: 2021-08-12 08:00:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Program/面试热题/debounced.js
 */

function debounced(fn, timer) {
  let timeout; // 设置计时器，初始是 undefined
  const lockFn = () => {
    //三思而后行，说话前思考 timer，如果忍不住要说话，打断了思考，就重新思考 timer
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, timer);
  };
  return lockFn;
}

// 测试一下

const lockFn = debounced(() => {
  console.log("啊，那个");
}, 1000);

for (let i = 0; i < 10; i++) {
  console.log(1);
  lockFn();
}
