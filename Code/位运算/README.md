<!--
 * @Author: your name
 * @Date: 2021-07-11 09:10:08
 * @LastEditTime: 2021-07-11 09:49:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/位运算/README.md
-->

## [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/submissions/)
> 只出现一次的数字 -- 所有题目都是线性时间复杂度，空间复杂度都是常数级复杂度

### 分析
1. 相同值异或得到的是 0，0和任何值异或得到的是任何值本身
2. 所以要求出唯一一个不是出现两次的值，只需要将所有值进行异或即可
3. 时间复杂度 ${O(N)}$，空间复杂度${O(1)}$

```javascript
/**
 * @分析 -- 只出现一次的有一个，其余都出现两次
 */
var singleNumber = function(nums) {
  return nums.reduce((prev,cur)=>prev^cur,0)
};
```

## [137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)
> 只出现一次的数字 -- 所有题目都是线性时间复杂度，空间复杂度都是常数级复杂度
### 分析
1. 其他值出现 3 次，所以不能用异或来处理，必须考虑怎么将 3 这个值取出来，这个时候想到二进制的位
2. 对于相同给的值而已，他们的二进制对应的位的值肯定也是相同的，所以在某一个位上，值只可能有以下4种情况 0,1,3,4，值为 1 和 4 的情况表示出现 1 次的数字在这个位上有值，那么 ret | bit 即可
3. 所以选择用 1 << i 取单一位值，和数组进行 & 运算，得到出现在 i 这个位上的值的个数，求出最后的值
4. 时间复杂度 ${O(31*N)}$，空间复杂度${O(1)}$
```javascript
/**
 * @分析 --- 一个值出现 1 次，其余值出现 3次 --
 * 1. 将所有值相加，转成二进制，然后相同的值在同一个位上肯定也是一样的，然后对每一个位进行除 3 取余，得到的值就是唯一一个出现 1 次的值了
 */
var singleNumber = function (nums) {
  let ret = 0;
  for (let i = 0; i < 32; i++) {
    const temp = 1 << i;
    let count = 0;
    nums.forEach((num) => {
      if (num & temp) count++;
    });
    if (count % 3) ret |= temp;
  }
  return ret;
};

```

## [260. 只出现一次的数字 III](https://leetcode-cn.com/problems/single-number-iii/solution/yi-huo-fen-zhi-wei-yun-suan-by-jzsq_lyx-bgoc/)
> 只出现一次的数字 -- 所有题目都是线性时间复杂度，空间复杂度都是常数级复杂度
### 分析
1. 如果题目看错是只有一个值出现一次，其余都出现两次，那么直接异或就可以得出结果；
2. 现在是有两个值只出现一次，所以异或和得到的就是这两个值的异或和，所以需要将原数组拆解成两份
    - 两份里分别存在一个只出现一次的值
    - 相同的一组两个值要分在同一组
3. 为了实现 2 中的条件，我们需要找出一个值 temp，让数组中的值和 temp 进行一定的比较分成两组，这时候考虑使用二进制中的`位值`
4. 我们都知道，当两个值进行异或操作的时候，实际就是两个数同一个位的异或 -- 人话就是相同的时候（0-0，1-1）返回值为0，不相同的时候（0-1）返回1；那么只要任意取一个`异或和`中二进制某一个位的值为 1 对应的值作为 temp，就可以达成条件 2
    - 异或和的位是 1 ，代表两个值中只有一个值和这个temp进行 & 运算时，得到的值大于 0，所以可以将两个出现一次的值分成 left 和 right
    - 其他任意相同的值，和唯一的一个值进行 & 运算，得到的非 0 性都是一样的，所以相同的值还是会出现在一个组中，具体到下面方法就是，存在 temp 中那个 bite 位是1的值在 left 进行异或操作，bite 位是 0 的在 right 进行异或操作
5. 最后左右分别得到一个出现一次的值，返回
6. 时间复杂度 ${O(N)}$,空间复杂度${O(1)}$
```javascript
// 260. 只出现一次的数字 III

var singleNumber = function (nums) {
  const ret = nums.reduce((prev, cur) => prev ^ cur, 0); // 两个不相等值的异或和
  // 选取第一个值为1的位，作为分治点
  let bite = 0;
  while (((1 << bite) & ret) === 0) {
    bite++;
  }
  const temp = 1 << bite;
  //   将 nums 根据这个位的值分成两半
  let left, right;
  for (let num of nums) {
    if (num & temp) {
      left ^= num;
    } else {
      right ^= num;
    }
  }
  return [left, right];
};

```