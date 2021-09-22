/*
 * @Author: your name
 * @Date: 2021-09-20 14:26:35
 * @LastEditTime: 2021-09-20 15:06:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/6.回溯/N皇后/2.52. N皇后 II.js
 */

// 52. N皇后 II
// https://leetcode-cn.com/problems/n-queens-ii/

/**
 * @分析
 * 1. 问题和 [51. N 皇后](https://leetcode-cn.com/problems/n-queens/) 基本一样，只是求的值从完整的 N 皇后方案，变成了只要知道有几个就可以了
 * 2. 所以第三部分转换可以直接删除，然后直接拷贝过来即可
 */
var totalNQueens = function (n) {
  let ret = 0;

  const dfs = (row, chessboard) => {
    if (row === n) {
      ret++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col, chessboard)) {
        chessboard[row][col] = "Q";
        dfs(row + 1, chessboard);
        chessboard[row][col] = ".";
      }
    }

    function isValid(row, col, chessboard) {
      for (let i = 0; i < row; i++) {
        if (chessboard[i][col] === "Q") return false;
      }

      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (chessboard[i][j] === "Q") return false;
      }

      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (chessboard[i][j] === "Q") return false;
      }
      return true;
    }
  };
  const chessboard = new Array(n).fill([]).map(() => new Array(n).fill("."));
  dfs(0, chessboard);
  return ret;
};

/**
 * @分析
 * 1. 回溯过程以及很简单了，但是判定条件 isValid 有没有更好的办法来处理呢
 * 2. 我们在第一题的时候是为了要创建一个实例 N 皇后，所以需要用到数组，而现在不需要具体的 N 皇后，所以不用数组的形式也可以用其他的形式来展示 N 皇后
 * 3. 用 3 个二进制的位 col, dlr, drl 分别表示 列上的值，从左启动 45` 的值， 从右启动的 135` 的值
 * 4. 这里 col 是很容易理解的，因为在每一行的 i 值，当了需要判断的 row ，对应的 i 的值是不会发生变化的
 * 5. 对于 dlr 来说，二进制对应的位是倾斜的,只有这样的值才符合 45` 倾斜；同理， drl 也是一样的
 *    Q . . . . .
 *    . Q . . . . .
 *      . Q . . . . .
 *        . Q . . . . .
 *          . Q . . . . .
 * 6. 所以
 */
var totalNQueens = function (n) {
  let ret = 0;
  const dfs = (r, col, dlr, drl) => {
    if (r === n) {
      ret++;
      return;
    }
    for (let i = 0; i < n; i++) {
      // 当前坐标转成二进制位对应的值
      const _col = 1 << i;
      const _dlr = 1 << (r + i); // 这里表示在其他行 的 i 值，到了当前 r，对应的值就应该是  1 << (r+i)， 所以我们设置这么一个值去试其他的值，看看是否满足要求
      const _drl = 1 << (n - i + r);
      if ((col & _col) || (dlr & _dlr) || (drl & _drl)) continue; // 只要有一个为 true,
      dfs(r + 1, col | _col, dlr | _dlr, drl | _drl);
    }
  };
  dfs(0, 0, 0, 0);
  return ret;
};
