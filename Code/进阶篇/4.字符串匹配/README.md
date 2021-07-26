## [28. 实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/solution/bao-li-rkkmp-cai-ji-de-cvzhi-lu-by-jzsq_-ydwx/)


### 概念
- 文本串 P, 用来匹配的长串
- 模块串 S, 作为模块到文本串上匹配的短串，如果为空，直接返回 0，如果超出 P，则不符合匹配原则
### 分析1 -- 暴力字符匹配
1. 直接对字符进行一一匹配，遇到匹配不成功的时候，文本串 P 回溯这一次匹配的初始位置的下一位， 模块串回溯到 0 ，进行下一轮的匹配
2. 这种回溯相当于将每一次匹配到逻辑完全放弃，所以最后得到复杂度肯定交大
3. 时间复杂度 ${O(N*M)}$ -- 其中 N 是文本串的长度，M 是模块串的长度;空间复杂度为 ${O(1)}$

```javascript
var strStr = function (haystack, needle) {
  const n = haystack.length; // 文本串长度
  const m = needle.length; // 模块串长度
  if (!m) return 0;
  let i = 0;
  let j = 0; // 模板串下标
  while (i < n) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    } else {
      // 回溯这一次匹配的初始位置的下一位
      i = i - j + 1;
      j = 0;
    }
    if (j === m) {
      // 匹配完了
      return i - m;
    }
  }
  return -1;
};
```


### 分析2 -- 暴力字符串匹配
1. 这种是把字符串的匹配能力交给计算机本身 -- 'asd' == 'asd' 这样一次运算我鸡贼的当成是 $O(1)$ 了.
2. 从文本串中截取固定长度 M 的子串，这里再次鸡贼屏蔽了 String.prototype.slice 方法的复杂度，所以也当是 $O(1)$ 
3. 时间复杂度 ${O{N}}$, 空间复杂度为 ${O(N)}$ -- 因为创建了 N 次的字符串, 其中 N 是目标串长度， M 是模式串的长度；

```javascript
// 28. 实现 strStr()

  const len = haystack.length;
  const windLen = needle.length;
  // 直接截取一段长度相似子串进行比对相似
  let left = 0;
  while (left <= len - windLen) {
    if (haystack.slice(left, left + windLen) === needle) return left;
    left++;
  }
  return -1;
};
```

### 分析3 -- 滑窗+二进制
1. 对于转换成二进制数字的方式，每一次比对的只是移除窗口和移进窗口的字符，所以复杂度是 ${O(N)}$
2. 值得注意的是，以hash数字作为字符的映射值时，位置和模块字符的长度有关且作为指数，在 windLen 很大的时候，会超出 SAFE_NUMBER， 导致结果出错。
```javascript
/**
 * @分析 -- RK 算法 -- 滑窗匹配 + 二进制
 * 1. 每次改动的指数滑出划进的值，但是如果是一个字符串的字符增删，会带来一定复杂度，如果是数组的话还好
 * 2. 所以这里直接转成二进制进行匹配，其实原理还是滑窗
 * 3. 但是会有问题，就是在长度作为指数，在 windLen 很大的时候，会超出 SAFE_NUMBER， 导致结果出错
 */
var strStr = function (haystack, needle) {
  const len = haystack.length;
  const windLen = needle.length;
  if (!windLen) return 0;
  let target = 0;
  let subHash = 0;
  function getHash(s) {
    return s.charCodeAt() - 'a'.charCodeAt(); // 都是小写字母
  }
  for (let i = 0; i <= len - windLen; i++) {
    if (i === 0) {
      //  初始化窗口值
      for (let j = 0; j < windLen; j++) {
        target += getHash(needle[j]) * 26 ** (windLen - j - 1);
        subHash += getHash(haystack[j]) * 26 ** (windLen - j - 1); // 每一个字符都占据一个位
      }
    } else {
      const preNum = getHash(haystack[i - 1]); // 移出去的值
      const nextNum = getHash(haystack[i + windLen - 1]); // 移进来的值
      subHash = (subHash - preNum * 26 ** (windLen - 1)) * 26 + nextNum;
    }
    if (subHash === target) return i;
  }
  return -1;
};

// 测试
console.log(strStr("hello", "llo"));
console.log(strStr("mississippi", "issip"));

```

### 分析4 -- KMP
1. 在分析1 中，每次匹配失败了，都将文本串 P 回溯到上一次匹配的位置，同时模块串 S 也是回到了 0 ，这样做会使得上一次匹配的结果完全抛弃，而 KMP 就是为了复用上一次匹配的结果，在不回溯 P 的前提下，通过移动 S，复用上一次的结果
2. KMP 最重要是维护了一个最大前缀后缀值的数组 dp，通过这个数组我们可以在模块串匹配失效时，在匹配的前缀中，找到可以复用的子串 -- 因为如果直接移动整个模块串 S, 就会使得本次匹配的一些可能性丢弃掉，所以怎么移动和移动多少 S 的位置是 KMP 的核心 -- [推荐 KMP 文章](https://blog.csdn.net/v_JULY_v/article/details/7041827)
3. 得到了数组 dp 之后，就好办了，两个指针指向两个字符串，匹配就一起走；
  - 如果匹配失败且 j 的值为0的时候，我们就可以去 dp 中找一下可复用的前缀，注意这里取 dp[j-1] 是为了取当前值之前的最大前缀后缀值，因为当前值都匹配失败了，那么下一个移动到这里的，肯定不能是当前值了
  - 如果匹配失败且 j 的值岗好就是 0, 那么就是移动整个模板串 S,同时在 P 中上一次匹配的串完全无法复用了，i++
4. 时间复杂度 ${O(N)}$ -- 最好的情况就是每一次都跳过，那么遍历一次 P 就结束了，最差也能砍一半的复杂度，一半 N 的值都要比 M 大很多，所以这里就写 N 好了；空间复杂度 ${O(M)}$
```javascript

// KMP
var strStr = function (haystack, needle) {
  const n = haystack.length; // 文本串长度
  const m = needle.length; // 模块串长度
  if (!m) return 0;
  /**
   * 1. dp[i] 表示字符串S[0,i]中，最大前后缀的值，如 asdxasd 字符串中，dp[7] = 3
   * 2. 这里用了两个指针 i, j 来创建 dp，其中 i 表示尾结点下标，j 表示当前最大前后缀的值，同时在数组中表示 j 之前的前缀和是匹配的
   * 3. 所以没一次移动 i ,就让 i 和 j 进行比对，如果相等，匹配值 j++; 如果不匹配，则需要递归的取 j 值
   */
  const dp = new Array(needle.length).fill(0); // 设置最大前缀后缀
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      // 如果不匹配，则取上一部分匹配的值作为配置项值，再进行匹配，直达 j === 0 为止
      j = dp[j - 1];
    }
    if (needle[i] === needle[j]) {
      // 如果设置
      j++;
    }
    dp[i] = j;
  }
  let i = 0,
    j = 0;
  while (i < n) {
    // 正常匹配
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    } else if (j > 0 && haystack[i] !== needle[j]) {
      // 如果匹配失败，则找到 j 前面的最大前缀后缀值，将 j 移动到这个位置，复用最大前缀
      j = dp[j - 1];
    } else {
      // 如果 j 为 0，那么继续走好了
      i++;
    }
    // 匹配成功
    if (j === m) {
      return i - j;
    }
  }
  return -1;
};

// 测试
console.log(strStr("hello", "llo"));
console.log(strStr("mississippi", "issip"));
```


## [面试题 17.17. 多次搜索](https://leetcode-cn.com/problems/multi-search-lcci/solution/bao-li-zi-fu-chuan-by-jzsq_lyx-doif/)
### 分析
1. 这里直接用字符串的 indexOf 来匹配小的字符
2. 每次匹配完， index 就走到匹配到值的后面
3. 其实每次都可以开长度一养的窗口进行匹配，得到值之后注入也可
4. 时间复杂度 ${0(N * M)}$ 其中 N 是 big 的长度， M是 小字符串的总和
```javascript

// 面试题 17.17. 多次搜索

/**
 * @分析 -- 暴力 api
 */
 var multiSearch = function(big, smalls) {
    return smalls.map(s => {
        if(!s) return ret
        const ret = []
        let index = 0
        while(index<big.length){
             const res = big.indexOf(s,index)
             if(res === -1) return ret
             ret.push(res)
             index = res+1
        }
        return ret
    })
};

// 暴力 -- 自己匹配
var multiSearch = function (big, smalls) {
  const len = big.length;
  return smalls.map((s) => {
    if (!s) return [];
    const sLen = s.length;
    const ret = [];
    // 这里就相当于是循环查找位置
    for (let i = 0; i <= len - sLen; i++) {
      let index = 0
      while(index<sLen && big[i + index] === s[index]){
        index++
      }
      if(index === sLen ) ret.push(i);
    }
    return ret;
  });
};

```