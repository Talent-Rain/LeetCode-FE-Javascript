### [51. N 皇后](https://leetcode-cn.com/problems/n-queens/)
> 参考: https://leetcode-cn.com/problems/n-queens/solution/dai-ma-sui-xiang-lu-51-n-queenshui-su-fa-2k32/

分析 -- 直接求符合要求的 chessboard
1. 行就是树递归的深度，列就是每一层的宽度，使用回溯的办法进行树的 dfs 遍历
2. 整个过程需要 3 大部分，回溯的方式遍历树，找出符合要求的节点 chessboard[row][col], 将符合要求的二维数组转换成符合要求的字符串数组
3. 时间复杂度 ${O(n*logn)}$

```javascript
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
```


### [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/solution/n-huang-hou-pu-tong-fa-er-jin-zhi-wei-by-akbl/)

分析
1. 问题和 [51. N 皇后](https://leetcode-cn.com/problems/n-queens/) 基本一样，只是求的值从完整的 N 皇后方案，变成了只要知道有几个就可以了
2. 所以第三部分转换可以直接删除，然后直接拷贝过来即可
```javascript
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

```

@分析
1. 回溯过程以及很简单了，但是判定条件 isValid 有没有更好的办法来处理呢
2. 我们在第一题的时候是为了要创建一个实例 N 皇后，所以需要用到数组，而现在不需要具体的 N 皇后，所以不用数组的形式也可以用其他的形式来展示 N 皇后
3. 用 3 个二进制的位 col, dlr, drl 分别表示 列上的值，从左启动 45` 的值， 从右启动的 135` 的值
4. 这里 col 是很容易理解的，因为在每一行的 i 值，当了需要判断的 row ，对应的 i 的值是不会发生变化的
5. 对于 dlr 来说，二进制对应的位是倾斜的,只有这样的值才符合 45` 倾斜；同理， drl 也是一样的
   Q . . . . .
   . Q . . . . .
     . Q . . . . .
       . Q . . . . .
         . Q . . . . .
6. 所以
```javascript
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

```