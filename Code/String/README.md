<!--
 * @Author: your name
 * @Date: 2021-07-15 10:19:36
 * @LastEditTime: 2021-07-15 10:20:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/String/README.md
-->
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