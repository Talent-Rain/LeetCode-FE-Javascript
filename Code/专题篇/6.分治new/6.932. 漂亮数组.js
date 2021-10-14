// 932. 漂亮数组
// https://leetcode-cn.com/problems/beautiful-array/

/**
 * @分析 -- 分治
 * 1. 解答这道题最主要是有两个公式，`奇数+偶数 !== 奇数`,所以如果取值的时候左侧都是奇数，右侧都是偶数，那么肯定符合要求
 * 2. 第二个公式是: 如果 2i !== l+r, 那么 2(i*2+b) !== l*2+b+ r*2+b;  这个等式是当我们取的3个值同奇偶的时候(2(i*2+b),l*2+b, r*2+b)，我们需要考虑，在它的下一层，他们(i,l,r)是符合漂亮数组的；
 * 3. 所以这就需要自底向上，每一次都组合好漂亮数组，然后再网上去合并治理
 * 4. 先分: 由于给定的都是数组长度，所以自己按需填入对应的 [1,2...n] 值就好，一直分到只有一个值了，那么就是 1 了
 * 5. 再治: 合并的时候必须保证合并双方都已经是漂亮数组，这样合并之后才必然是漂亮数组，这里保证合并之后，左侧都是奇数，右侧都是偶数
 * 6. 由于漂亮数组的排列只和长度 n 有关，为了降低重复计算，使用 map 缓存数据
 * 7. 时间复杂度 ${O(n)}$
 */
var beautifulArray = function (n) {
  const map = new Map();
  map.set(1, [1]); // 初始化，也是截止条件
  const recursion = (n) => {
    if (map.has(n)) return map.get(n); // 递归的终止条件
    // 奇数放在左侧 -- 按照数组长度排列好漂亮数组后，然后再通过 2N-1 的方式转成当前层的奇数
    const left = recursion((n + 1) >> 1).map((item) => item * 2 - 1);
    const right = recursion(n >> 1).map((item) => item * 2);
    const ret = [...left, ...right];
    map.set(n, ret);
    return ret;
  };
  return recursion(n);
};
