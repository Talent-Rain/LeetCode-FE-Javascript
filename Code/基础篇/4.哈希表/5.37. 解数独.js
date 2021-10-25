// 37. 解数独
// https://leetcode-cn.com/problems/sudoku-solver/

/**
 * @分析
 * 1. 最开始先根据 [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/solution/yong-shu-zu-dai-ti-map-pan-duan-shu-du-b-yz1a/) 将已经出现的值用三个数组缓存起来
 * 2. 然后我们再用回溯的思想去把空格的字符进行尝试
 * 3. 每次尝试(board[i][j] === ".")的时候需要迭代[1-9],对于每一个 x 不在对应的 rows,columns,blocks 三个数组中，我们就可以当它是可用的；
 * 4. 在递归回溯过程中，一旦触发失败情况，就回溯到上一层，上一层发现尝试的值失败了，就可以换下一个值继续干，同时对应的 rows,columns,blocks和 boards 值要改回回溯前的模样
 * 5. 边界1：行列都为9，一旦列下标等于9，则需要换行处理，一旦两者都超了，证明此次回溯是成功的；
 * 6. 边界2: 如果是 board[i][j] ！== "." 直接跳过，本题已经写进去的值都是合法的，也就是对于 36题直接就是 true
 * 7. 边界3: 对于某一个节点 board[i][j], 如果尝试完 1-9 都不合法，那么就是上层配置出问题了，直接返回 false，换了重新来
 * 8. 时间复杂度 -- 由于是固定大小的 board， 所以是常数级别的复杂度
 */
var solveSudoku = function (board) {
  const columns = Array.from({ length: 9 }).map(() =>
    Array.from({ length: 9 }).fill(false)
  );
  const rows = Array.from({ length: 9 }).map(() =>
    Array.from({ length: 9 }).fill(false)
  );
  const blocks = Array.from({ length: 3 }).map(() =>
    Array.from({ length: 3 }).map(() => Array.from({ length: 9 }).fill(false))
  );

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const x = board[i][j];
      if (x === ".") continue;
      const blockI = Math.floor(i / 3);
      const blockJ = Math.floor(j / 3);
      rows[i][x - 1] = true; // 第 i 行值为 x 的被占用了
      columns[j][x - 1] = true; // 第 j 列值为 x 的被占用了
      blocks[blockI][blockJ][x - 1] = true; // 第 blockI 行，第 blockJ 列 的值为 x 的被占领了
    }
  }
  // 回溯 -- 对于一个下标为 i,j 的值的判断
  const dfs = (i, j) => {
    if (j === 9) {
      // 这个时候要换行了
      i++;
      j = 0;
      if (i === 9) break; // 跑完整个二维数组了,直接
    }
    if (board[i][j] !== ".") return dfs(i, j + 1); //往下走一步就好

    // 现在开始找值去配置 board[i][j] , 这个时候  board[i][j] = '.'
    for (let x = 1; x < 10; x++) {
      const blockI = Math.floor(i / 3);
      const blockJ = Math.floor(j / 3);
      // 如果值 x 已经存在于 columns,rows,blocks 任意一个对应的值上，则走下一下
      if (rows[i][x - 1] || columns[j][x - 1] || blocks[blockI][blockJ][x - 1])
        continue;
      // 如果都没存在，就可以试一下啊
      board[i][j] = x + "";
      rows[i][x - 1] = true; // 第 i 行值为 x 的被占用了
      columns[j][x - 1] = true; // 第 j 列值为 x 的被占用了
      blocks[blockI][blockJ][x - 1] = true; // 第 blockI 行，第 blockJ 列 的值为 x 的被占领了
      if (dfs(i, j + 1)) return true; // 在这一个节点一直走下去，都 OK ，那么这一步回溯上去，也是 ok 的
      // 如果 x 值会导致之后的值不 ok， 那么改掉重新来就好
      board[i][j] = ".";
      rows[i][x - 1] = false;
      columns[j][x - 1] = false;
      blocks[blockI][blockJ][x - 1] = false;
    }
    // 如果所有值都试完，还是没有结束，证明在当前这一个节点，无法取值，那么直接报错，让上一层做处理
    return false;
  };
  dfs(0, 0);
  return board;
};
