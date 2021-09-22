// 51. N 皇后
// https://leetcode-cn.com/problems/n-queens/
// 参考: https://leetcode-cn.com/problems/n-queens/solution/dai-ma-sui-xiang-lu-51-n-queenshui-su-fa-2k32/

/**
 * @分析 -- 直接求符合要求的 chessboard
 * 1. 行就是树递归的深度，列就是每一层的宽度，使用回溯的办法进行树的 dfs 遍历
 * 2. 整个过程需要 3 大部分，回溯的方式遍历树，找出符合要求的节点 chessboard[row][col], 将符合要求的二维数组转换成符合要求的字符串数组
 * 3. 时间复杂度 ${O(n*logn)}$
 */
var solveNQueens = function (n) {
  const ret = [];
  // 1. N 皇后实际走的过程 -- 回溯树
  const dfs = (row, chessboard) => {
    if (row === n) {
      // 已经到了叶子结点下 null 了 --
      //   但是 chessboard 是一个二维数组，不能随便就push 进去的，需要深拷贝一下
      ret.push(getStrChessboad(chessboard));
      return;
    }
    // 每一行都是从 0 - n-1 , 然后不符合要求的就回溯回去
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, chessboard)) {
        // 如果 chessboard[row][col] 符合要求，则算一条路
        chessboard[row][col] = "Q";
        dfs(row + 1, chessboard);
        chessboard[row][col] = "."; // 回溯回来
      }
    }
  };

  // 判断当前节点是否符合 N 皇后的要求 -- 需要注意，这里 [0,n-1] 是从左往右算
  function isValid(row, col, chessboard) {
    // 同一列
    for (let i = 0; i < row; i++) {
      if (chessboard[i][col] === "Q") {
        return false;
      }
    }
    // 从左往右 45` 倾斜
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (chessboard[i][j] === "Q") {
        return false;
      }
    }
    // 从右往左 135` 倾斜
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (chessboard[i][j] === "Q") {
        return false;
      }
    }
    // 如果不是同一列或者左右斜线，则满足要求
    return true;
  }

  //  将二维数组的 N 皇后转成一维数组字符串形式
  function getStrChessboad(chessboard) {
    const ret = [];
    chessboard.forEach((row) => {
      let str = "";
      row.forEach((item) => {
        str += item;
      });
      ret.push(str);
    });
    return ret;
  }

  const chessboard = new Array(n).fill([]).map(() => new Array(n).fill("."));
  dfs(0, chessboard);
  return ret;
};
