### [811. 子域名访问计数](https://leetcode-cn.com/problems/subdomain-visit-count/description/)
分析
1. 从题目可知，可以一个 url 可以拆分成多级域名，多个 url 可能共用同一个定级域名，所以可以用 map 缓存不同类型的域名；
2. 设计 map 缓存域名 -- key 是域名，value 是次数
3. 然后开始将数组中的字符串拆开，进而拆分成不同的域名，然后缓存到 map 中，遍历完之后，再把 map 缓存的域名取出来，转换成字符串返回出去
4. 时间复杂度 ${O(n * m)}$ n 是数组的长度，m 是每个字符串的平均长度 -- 我们在拆分字符串的时候，需要遍历字符串
5. 时间复杂度 ${O(n)}$ n 是数组的长度
```javascript

var subdomainVisits = function(cpdomains) {
    const map = new Map() // key 是域名，value 是次数
    for(let item of cpdomains) {
        let [count,cpdomain] = item.split(' ') // 空格将次数的域名分开
        count = +count // 转成数字
        // 将 cpdomains 按照 . 拆分开来
        const cpArr = cpdomain.split('.')
        while(cpArr.length>0){
            const cp = cpArr.join('.') // 并起来
            map.set(cp,map.has(cp)?map.get(cp)+count:count)
            cpArr.shift()
        }
    }
    // 根据 map 再合并起来
    const ret = []
    for(let [key,value] of map.entries()){
        ret.push([value,key].join(' ')) // 用空格将数量和对应的域名组合成字符串，然后加在数组中
    }

    return ret
};
```

### [500. 键盘行](https://leetcode-cn.com/problems/keyboard-row/solution/yong-map-huan-cun-zi-fu-by-jzsq_lyx-nxhc/)
分析
1. 由于只有 3 行，所以可以把每一行作为每行对应字符的状态，然后将所有字母存储在 map 中
2. 然后遍历给点的字符串数组，只有当给定的字符串对应的状态值都一样时，才能加入到返回的数组中去
3. 需要注意的是，我们存储的是小写字母，所以 words 中的字母需要都改成小写再进行匹配； 如果只有一个字符，那么肯定是可行的；
4. 时间复杂度 ${O(n*m)}$ 其中 n 是 words 的长度，m 是字符串的平均长度
```javascript

var findWords = function (words) {
  const arr = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const map = new Map();
  arr.forEach((item, index) => {
    for (let i = 0; i < item.length; i++) {
      map.set(item[i], index + 1);
    }
  });
  const ret = [];

  for (let word of words) {
    if(word.length === 1) {
        ret.push(word);
        continue
    }
    let status = undefined; // 这个就是 状态值
    for (let i = 0; i < word.length; i++) {
      const item = word[i].toLowerCase();
      if (!status) {
        status = map.get(item);
        continue;
      }
      if (map.get(item) !== status) break;
      if (i === word.length - 1) {
        ret.push(word);
      }
    }
  }
  return ret;
};

```

### [面试题 01.04. 回文排列](https://leetcode-cn.com/problems/palindrome-permutation-lcci/solution/mian-shi-ti-0104-hui-wen-pai-lie-by-jzsq-873q/)

分析
1. 这里只是判定 s 是不是回文串的排列之一，所以只要给定的字符能够组成回文串，那么就行；
2. 那么怎样的字符组成才能成回文串呢，首先如果回文串是奇数，那么有且仅有一个字符的数量是奇数；如果回文串是偶数，那么所有字符都必须是偶数，才能保证组合起来的字符串是回文串；
3. 使用 needOdd 缓存 s 到底允许使用多少个 odd, oddCount 表示了 s 中有多少个出现次数为奇数的字符， 一旦 oddCount > needOdd, 就不能构成回文字符串了，直接返回false，否则返回 true；
4. 时间复杂度 ${O(n)}$ , 其中 n 是 s 的长度，空间复杂度是 ${O(n)}$ 
```javascript
 var canPermutePalindrome = function (s) {
    const needOdd = s.length % 2 // 如果奇数，则 needOdd 为 1， 如果是偶数，则为 0
    const map = new Map();
    for (let i = 0; i < s.length; i++) {
      map.set(s[i], map.has(s[i]) ? map.get(s[i]) + 1 : 1);
    }
    let oddCount = 0;
    for(let val of map.values()){
        if(val%2){
            oddCount++
        }
        if(oddCount>needOdd) return false
    }
    return true
  };
  
```

### [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/solution/yong-shu-zu-dai-ti-map-pan-duan-shu-du-b-yz1a/)
分析
1. 分别创建 rows,columns 2个二维数组 和 subBoxes 这个三维数组，用来缓存 board 中行，列，小box 中，1-9 出现的次数
2. 如果 board[i][j] = x, 那么就是设置 rows[i][x-1] = n+1, cols[j][x-1] = n+1, subBoxes[i/3][j/3][x-1] = n+1
3. 遍历完 board 且三个数组中的值不超过 1，那么已经写有值的数独就是合格的，没有超出规矩，否则返回 false
4. 这样设置完之后，时间复杂度为 ${O(1)}$, 空间复杂度为 ${O(1)}$
```javascript
 var isValidSudoku = function(board) {
    const rows = Array.from({length:9}).map(() => Array.from({length:9}))
    const columns = Array.from({length:9}).map(() => Array.from({length:9}))
    const sunBoxes = Array.from({length:3}).map(() => Array.from({length:3}).map(() => Array.from({length:9})))
    for(let i = 0;i<board.length;i++){
        for(let j = 0;j<board.length;j++){
            if(board[i][j]!=='.'){
                const x = board[i][j]
                const subI = Math.floor(i/3)
                const subJ = Math.floor(j/3)
                // 存在数字
                if(rows[i][x-1] || columns[j][x-1] || sunBoxes[subI][subJ][x-1]) return false
                rows[i][x-1] = 1 
                columns[j][x-1] = 1
                sunBoxes[subI][subJ][x-1] = 1
            }
        } 
    }
    return true
};
```

### [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/solution/shu-zu-huan-cun-hui-su-bian-li-by-jzsq_l-lm3e/)
分析
1. 最开始先根据 [36. 有效的数独](https://leetcode-cn.com/problems/valid-sudoku/solution/yong-shu-zu-dai-ti-map-pan-duan-shu-du-b-yz1a/) 将已经出现的值用三个数组缓存起来
2. 然后我们再用回溯的思想去把空格的字符进行尝试
3. 每次尝试(board[i][j] === ".")的时候需要迭代[1-9],对于每一个 x 不在对应的 rows,columns,blocks 三个数组中，我们就可以当它是可用的；
4. 在递归回溯过程中，一旦触发失败情况，就回溯到上一层，上一层发现尝试的值失败了，就可以换下一个值继续干，同时对应的 rows,columns,blocks和 boards 值要改回回溯前的模样
5. 边界1：行列都为9，一旦列下标等于9，则需要换行处理，一旦两者都超了，证明此次回溯是成功的；
6. 边界2: 如果是 board[i][j] ！== "." 直接跳过，本题已经写进去的值都是合法的，也就是对于 36题直接就是 true
7. 边界3: 对于某一个节点 board[i][j], 如果尝试完 1-9 都不合法，那么就是上层配置出问题了，直接返回 false，换了重新来
8. 时间复杂度 -- 由于是固定大小的 board， 所以是常数级别的复杂度
```javascript
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

```