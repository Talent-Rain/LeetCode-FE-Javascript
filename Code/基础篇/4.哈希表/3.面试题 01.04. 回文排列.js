// 面试题 01.04. 回文排列
// https://leetcode-cn.com/problems/palindrome-permutation-lcci/

/**
 * @分析
 * 1. 这里只是判定 s 是不是回文串的排列之一，所以只要给定的字符能够组成回文串，那么就行；
 * 2. 那么怎样的字符组成才能成回文串呢，首先如果回文串是奇数，那么有且仅有一个字符的数量是奇数；如果回文串是偶数，那么所有字符都必须是偶数，才能保证组合起来的字符串是回文串；
 * 3. 使用 needOdd 缓存 s 到底允许使用多少个 odd, oddCount 表示了 s 中有多少个出现次数为奇数的字符， 一旦 oddCount > needOdd, 就不能构成回文字符串了，直接返回false，否则返回 true；
 * 4. 时间复杂度 ${O(n)}$ , 其中 n 是 s 的长度，空间复杂度是 ${O(n)}$ 
 */
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
  