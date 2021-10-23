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