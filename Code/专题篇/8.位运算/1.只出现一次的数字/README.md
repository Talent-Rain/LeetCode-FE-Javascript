### [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/submissions/)
> 只出现一次的数字 -- 所有题目都是线性时间复杂度，空间复杂度都是常数级复杂度

分析
分析 -- 1个单值，其余是两个
1. 已知 a ^ a = 0, 0 ^ a = a ,
2. 所以将 nums 中所有值进行异或处理，出现两次的都会被消除，而最后的结果就是唯一一次出现的那个值
3. 时间复杂度 ${O(N)}$，空间复杂度${O(1)}$

```javascript
var singleNumber = function(nums) {
    return nums.reduce((prev,cur) => prev ^ cur,0) // 0 和任何值异或都等于任何值，所以以 0 为初始值
};
```

### [137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)
分析 -- 1个单值 x ，其余是 3 个 y1,y2...
1. 将 nums 数组与 [0,31] 的位进行 & 比较，找出在这个位上存在的值的数量 count；
2. 如果 count 整除 3， 证明这个位上只存在 yi；如果不整除，证明单值 x 在这个位上，那么结果要加上这个位
3. 注意，由于 num 的取值范围是 [-pow(2,31),pow(2,31)-1], 所以第 31 位 是可以取到的，所以遍历的时候要遍历到第 31位,取到正负值；
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
    // 在 i 这个位上，有 count 这么多个值
    if (count % 3) ret |= temp;
  }
  return ret;
};

```

### [260. 只出现一次的数字 III](https://leetcode-cn.com/problems/single-number-iii/solution/yi-huo-fen-zhi-wei-yun-suan-by-jzsq_lyx-bgoc/)
> 只出现一次的数字 -- 所有题目都是线性时间复杂度，空间复杂度都是常数级复杂度
### 分析
1. 如果题目看错是只有一个值出现一次，其余都出现两次，那么直接异或就可以得出结果；
2. 现在是有两个值只出现一次，所以异或和得到的就是这两个值的异或和，所以需要将原数组拆解成两份
    - 两份里分别存在一个只出现一次的值x1 和 x2
    - 相同的两个值要分在同一组
3. 为了实现 2 中的条件，我们需要找出一个值 temp，让数组中的值和 temp 进行一定的比较分成两组，这时候考虑使用二进制中的`位值`
4. 先用异或将所有 nums 中的值进行运算，得到 x1 ^ x2 的值 res，
5. 对于 res,我们知道他们是由两个值 x1,x2 异或得到，也就是说，对于res，在某一个位上有值，那么另外一个肯定不在这个位上，不然就相互抵消了
6. 所以找出第一个存在的位 bite 和对应的值 temp，然后这个时候就变成了，找出唯一一个单值，它存在于位  bite 上
7. 时间复杂度 ${O(N)}$,空间复杂度${O(1)}$
```javascript
// 260. 只出现一次的数字 III

var singleNumber = function(nums) {
    // 求出的 res 是 x1 ^ x2 的异或值
    const res = nums.reduce((prev,cur) => prev^ cur,0)
    let bite= 0
    // 求出 res 在二进制中的第一个 1 的位置，
    while((1<<bite) & res === 0 ){
        bite++
    }
    // 这个二进制位对应的值，用它可以求出所有存在这个为的值
    // x1,x2 有且仅有一个会与 temp 的 & 运算不为 0
    const temp = 1<<bite
    let left = 0,right = 0
    nums.forEach(num => {
        if(num & temp){
            left ^= num // 保证 left 是存在 bite 位的值，其他出现两次的值会被异或掉
        }else{
            right ^= num
        }
    })
    return [left,right]
};

```