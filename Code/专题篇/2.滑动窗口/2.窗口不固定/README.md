<!--
 * @Author: your name
 * @Date: 2021-09-03 09:46:17
 * @LastEditTime: 2021-09-04 11:29:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/README.md
-->


### [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/mapbu-gu-ding-da-xiao-de-hua-chuang-by-j-9sgy/)

```javascript
// 3. 无重复字符的最长子串

分析
1. 这里求的是最长的子串，证明有很多长度不一的子串，那么就是有很多大小不一的窗口，所以属于窗口不固定的滑窗题
2. 初始化 l r ，初始化一个 map 用来存放窗口里的字符的
3. map 是用来做条件判断的，判断窗口扩展过程中是否和已有的窗口字符重复了，如果重复了，那么就要收缩窗口 s[r]=== s[l] 然后 l++, 
4. 然后不管是否整理窗口， r 指针都会继续扩展下去，所以处理完了，需要重新加上 s[r]， 并继续走下去
5. 时间复杂度 ${O(n)}$ 因为 r 指针遍历一次，走的过程中遇到重复值 ，l 指针移动，最多 l 也就遍历一次，也就是最多直走了 2n
6. 空间复杂度 $(O(k))$ k 是最大的窗口size
var lengthOfLongestSubstring = function(s) {
    const map = new Map() // 这个用来存放
    let l = r = 0 
    let max = 0
    while(r<s.length) {
        if(map.has(s[r])){
            // 说明窗口里的值已经出现重复了，所以需要整理窗口
            max = Math.max(max,map.size) // 存一下大小
            // 开始收缩窗口，找出 s[r] 同值的那个位置
            while(s[l] !== s[r]){
                map.delete(s[l])
                l++
            }
            // 找到了 -- 再移除一下
            map.delete(s[l])
            l++
        }
        // 将当前 s[r] 字符存起来
        map.set(s[r],1)
        r++
    }
    // 这个时候 r 走到底了，
    return Math.max(max,map.size)
}

console.log(lengthOfLongestSubstring("aab"))
```

分析
1. 根据第一次分析，发现 map 还有移除操作，觉得不太合适，而且存储的时候也只是存了字符，没有将对应的下标用起来，所以想了下面的改良版
2. 每一次扩大窗口的时候，判断一下 map 是否存在这个 key，同时判断一下对应的 value 值是否大于等于 l 指针 -- 这是为了判断是否存在重复字符在当前窗口里，因为现在已经不删除 map 里的值了，所以要用 value 和 l 的大小进行比较
3. 如果是窗口里的重复值，那么先存一下当前窗口的最大值，然后将 l 指针跳到重复值的下一个位置，然后更新 s[r] 的位置，继续遍历
4. 如果不是重复值，就正常存储 s[r] 的位置
5. 注意，这里不能用 map.size 来判断窗口大小，因为现在 map 存的是所有遍历的字符的集合，所以要用 r-l;因为每次 r 都指向窗口的下一个值，所以直接 r-l, 而不需要 +1
6. 时间复杂度${O(n)}$, 这一次是值跑一次，l 基本靠跳
7. 空间复杂度 $(O(k))$ k 是字符窗中不同字符的集合值
```javascript
var lengthOfLongestSubstring = function(s) {
    const map = new Map() // 这个用来存放窗口出现过的值
    let l = r = 0 
    let max = 0
    while(r<s.length) {
        if(map.has(s[r]) && map.get(s[r])>=l){
            // 已经遍历过了这个值且在当前的这个窗口里
            max = Math.max(max,r-l) // 先存一下大小
           l = map.get(s[r]) +1 // 跳到重复出现字符前面去了
        }
        // 将当前 s[r] 字符存起来,并将字符的下标也存起来 -- or 更新一下罪行 s[r] 的位置
        map.set(s[r],r)
        r++
    }
    // 这个时候 r 走到底了，
    return Math.max(max,r-l)
}
```


### [76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/solution/bu-ding-chuang-kou-de-hua-chuang-by-jzsq-sz7k/)
分析
1. 这里求的是符合要求的最小的子串，所以窗口肯定不是固定大小的
2. 这里判定条件关乎于 t 中的字符及数量，也需要 s 的字符和数量做对比，所以需要用到两个 map 进行存储
3. 先把 t 存储到 tMap 中去，然后开始移动 r 指针扩大的窗口；
4. 当窗口中的某个字符 s[r] 的数量大于等于 tMap 中 s[r] 的数量时，则这个窗口符合 t 字符串的变量数 valid 加一，一直到 valid 的长度刚好和 tMap 长度一样的时候，就是找到了符合要求的子串了
5. 找到子串后，需要压缩窗口的大小，所以 l 要启动了
6. 只要 s[l] 在 sMap 中的值不低于 tMap 中的值，那么就拼命的压缩；
7. 只有当长度比已经保存起来的符合要求的子串小的时候，或者初始化的时候，就替换 ret
8. 然后 l 指针继续走一步，对应窗口就会失效，然还继续寻找下一个符合要求的窗口，重复上面的操作
9. 时间复杂度 ${O(N)}$, 空间复杂度 ${O(N)}$
```javascript

function minWindow(s, t) {
  const sMap = new Map();
  const tMap = new Map();

  // 先将 t 存起来
  for (let tt of t) {
    tMap.set(tt, tMap.get(tt) ? tMap.get(tt) + 1 : 1);
  }
  let ret = "";
  let l = (r = 0); // 不固定的滑窗的初始化
  let valid = 0; //表示窗口中匹配 t 字符的数量 -- 匹配的字符是指：字符 ss 在窗口里的数量超过了 ss 在 t 字符串中这个字符数量
  while (r < s.length) {
    const ss = s[r];
    sMap.set(ss, sMap.get(ss) ? sMap.get(ss) + 1 : 1); //存起来
    if (sMap.get(ss) === tMap.get(ss)) {
      // 证明 ss 已经匹配了
      valid++;
    }

    if (valid === tMap.size) {
      //   窗口里的字符串已经完全匹配了，那么就需要收缩一下了
      while (sMap.get(s[l]) !== tMap.get(s[l])) {
        // 因为现在的初始条件是: 对于某个字符 s[l], sMap.get(s[l])>=tMap.get(s[l])
        // 所以可以干掉一些，知道 === 的时候
        sMap.set(s[l], sMap.get(s[l]) - 1);
        l++;
      }
      if (r - l + 1 < ret.length || !ret.length) {
        // 如果长度更小了，或者初始化的 ret, 那就替换一下吧
        ret = s.slice(l, r + 1);
      }
      //  继续走吧，总得砍掉一个 valid 的，
      sMap.set(s[l], sMap.get(s[l]) - 1);
      valid--; // 少了一个 s[l] 了
      l++;
    }
    r++;
  }
  return ret;
}

```