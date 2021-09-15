// 1371. 每个元音包含偶数次的最长子字符串

/**
 * @分析 -- 前缀和
 * 1. 用 map 存储前 i 个值元音字母为奇数的子串
 * 2. 当子串 [0,r] 的值和存储在map 中的 [0,l] 值一致的时候，证明 [l,r] 中所有元音字母都为偶数
 */
var findTheLongestSubstring = function (s) {
  let max = 0;
  const map = new Map(); // 存储[0,i]子串中，奇数元音字母组成的字符串
  map.set("00000", -1);
  const valids = ["a", "e", "i", "o", "u"]; //元音字母数组
  const validMap = new Map(); // 存储每个原因字母存储的数量
  valids.map((valid) => {
    validMap.set(valid, 0);
  });

  for (let i = 0; i < s.length; i++) {
    const ss = s[i];
    if (validMap.has(ss)) {
      validMap.set(ss, validMap.get(ss) + 1);
    }

    // 遍历当前所有元音字母的数量，将值为奇数的合并成子串存储起来
    const str = [...validMap.values()].reduce(
      (prev, cur) => prev + (cur % 2),
      ""
    );
    console.log(str);
    if (map.has(str)) {
      // 符合要求
      max = Math.max(max, i - map.get(str) + 1);
    } else {
      map.set(str, i);
    }
  }
  return max
};
