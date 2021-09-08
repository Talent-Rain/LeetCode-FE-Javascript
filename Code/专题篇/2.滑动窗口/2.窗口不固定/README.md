<!--
 * @Author: your name
 * @Date: 2021-09-03 09:46:17
 * @LastEditTime: 2021-09-08 09:18:13
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

### [209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/submissions/)

分析
1. 这里求的是符合要求的连续数组的长度，所以这个长度是不确定，也就是窗口长度不确定；
2. 这里求的是一个窗口累加值 sum >= target, 一旦满足要求就要压缩窗口，得到最小符合要求的连续数组的长度
3. r指针负责右侧扩充窗口大小，l 指针负责收缩窗口，得到最优解
4. 时间复杂度 ${O(n)}$
```javascript
 var minSubArrayLen = function (target, nums) {
    let ret = Infinity;
    let l = (r = 0);
    let sum = 0;
    while (r < nums.length) {
      sum += nums[r];
      while (sum >= target) {
        // 符合要求，开始压缩窗口大小
        ret = Math.min(ret, r - l + 1); // 更新一下
        sum -= nums[l];
        l++;
      }
      r++
    }
    return ret === Infinity ? 0: ret
  };
  
```

### [904.水果成篮](https://leetcode-cn.com/problems/fruit-into-baskets/solution/hua-dong-chuang-kou-by-jzsq_lyx-dvdz/)

分析
1. 审题，数组中的值代表的类型，比方说 1型水果，2型水果；给定两个篮子，也就是最多选择两种类型的水果放进篮子里，然后保证能进去的树最多，即 r-l+1 的值最大，所以属于窗口不固定的滑动窗口题目
2. 用 map 作为篮子存储水果， map.size 最大应该为 2，
3. 一旦 map.size 值超出 2， 证明存储超过了 2 种类型的水果，所以需要收缩 l， 将一些其他类型的果子扔掉，直到 map 中的种类恢复到两种;
4. 时间复杂度 ${O(n)}$

```javascript
 var totalFruit = function(fruits) {
    const map = new Map() // 篮子，大小为2，用来存储当前窗口下的水果
    let ret = 0
    let l = r =0 
    while(r < fruits.length){
        ret = Math.max(ret,r-l); // 先保存一下上一次的大小
        const rr = fruits[r]
        map.set(rr,map.get(rr)?map.get(rr)+1:1)
        // 如果超了，则需要收缩一整类的树
        while(map.size > 2){
            // 长度超了，向左收缩
            const ll = fruits[l]
            if(map.get(ll) ===  1){
                map.delete(ll)
            }else{
                map.set(ll,map.get(ll)-1)
            }
            l++ 
        }
        r++
    }
    return Math.max(ret,r-l);
};
```

### [930. 和相同的二元子数组](https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/shuang-hua-chuang-shuang-zhi-zhen-qian-z-s4yi/)

分析 -- 双滑动窗口
1. 不固定大小的滑动窗口，存在两个左指针 l1,l2 ,其中 [l1,r] 的sum 总是小于等于 goal，而 [l2,r] 总数小于 goal 的
2. 每次固定 r 指针，我们知道 [l1,l2-1]的任意一个 [lx,r] 都符合要求
3. 这里用到了两个滑窗进行比较出值，原因是 nums[i] 只能是 0,1, 所以会出现连续的符合要求的值，
4. 所以每一次固定 r 指针的时候， [l1,r] 保持符合要求即值为 goal 的状态， [l2,r] 保持刚好小于 goal 的状态；
5. 则每一次向右滑动窗口后，都得到两个边缘值的窗口，这样就得到想要求的结果
6. 时间复杂度为 ${O(n^2)}$，空间复杂度 ${O(n)}$
 */
```javascript
 var numSubarraysWithSum = function (nums, goal) {
    let ret = 0
    let l1 = 0, l2 = 0 
    let sum1 = 0,sum2 = 0 // sum1 <= goal, sum2 < goal
    let r = 0
    while(r<nums.length){
        sum1+=nums[r]
        while(l1<=r && sum1>goal){
            sum1-=nums[l1]
            l1++
        }
        sum2+=nums[r]
        while(l2<=r && sum2>=goal){
            sum2-=nums[l2]
            l2++
        }
        ret+= l2-l1
        r++
    }
    return ret
}
```

 分析 -- 双指针
 1. 双指针进行匹配
 2. 然后每一次固定其中一边，进行求值，
 3. 没有复用任何的值，所以时间复杂度为 ${O(n^2)}$，空间复杂度 ${O(n)}$
```javascript
var numSubarraysWithSum = function (nums, goal) {
  let ret = 0;
  for (let i = 0; i < nums.length; i++) {
    // 固定i指针
    let sum = 0;
    let r = i;
    while (r <= nums.length) {
      sum += nums[r];
      if (sum === goal) ret++;
      r++;
    }
  }
  return ret;
};
```
分析 -- 前缀和
1. 用 map 记录 key 为前缀和， value 为有多少前缀和为 key 的子数组
2. 如果当前前缀和 prevSum - goal 得到的值 temp 已经存在在 map 中，证明有 value 个值 [l,cur] 使得 sum 为 goal
3. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
 var numSubarraysWithSum = function (nums, goal) {
    const map = new Map()
    let prevSum = 0
    let ret = 0
    for(let num of nums){
        prevSum+=num
        if(map.has(prevSum-goal)){
            ret+=map.get(prevSum-goal)
        }
        if(prevSum === goal){
            ret++
        }
        map.set(prevSum,map.get(prevSum)?map.get(prevSum)+1:1)
    }
    
    return ret
};
```

### [992. K 个不同整数的子数组](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/solution/shuang-hua-chuang-by-jzsq_lyx-yryh/)
分析
1. 只要种类 map.size === k 的窗口，都是符合要求的，所以窗口大小不固定
2. 遍历 r 指针，并在每次判断时固定 r 指针，设计 l1 指针，使得 [l1,r] 中的种类小于等于 k， 设计 l2,使得 [l2,r] 中的变量小于 k
3. 则每一个固定的 r，中，[l1,l2) 之间的值和后续的 [l2,r] 可以构成变量为 k 的子数组，所以每一次固定 r ，最终得到符合要求的数量是 l2-l1
4. 整体思路和 [930. 和相同的二元子数组](https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/shuang-hua-chuang-shuang-zhi-zhen-qian-z-s4yi/) 一样
5. 只是一个的判断条件是子数组的和，一个是子数组中的种类
6. 这种只求组合数量的题目，都需要关注判定值合规的时候，窗口左右延伸都是可以得到合适的值的
7. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
```javascript
var subarraysWithKDistinct = function (nums, k) {
  let ret = 0;
  const map1 = new Map(); // 用来存储窗口中值和出现的次数
  const map2 = new Map(); // 用来存储窗口中值和出现的次数
  let l1 = (l2 = 0);
  let r = 0
  while (r < nums.length) {
    const rr = nums[r];
    map1.set(rr, map1.get(rr) ? map1.get(rr) + 1 : 1);
    map2.set(rr, map2.get(rr) ? map2.get(rr) + 1 : 1);
    while (map1.size > k) {
      // 窗口的变量已经超过了 k，所以需要 l 指针收缩
      const ll = nums[l1];
      l1++;
      if (map1.get(ll) === 1) {
        map1.delete(ll);
      } else {
        map1.set(ll, map1.get(ll) - 1);
      }
    }

    while (map2.size >= k) {
        // 窗口的变量已经超过了 k，所以需要 l 指针收缩
        const ll = nums[l2];
        l2++;
        if (map2.get(ll) === 1) {
          map2.delete(ll);
        } else {
          map2.set(ll, map2.get(ll) - 1);
        }
      }
      ret += l2-l1
    r++;
  }
  return ret;
};

```

### [978. 最长湍流子数组](https://leetcode-cn.com/problems/longest-turbulent-subarray/solution/hua-chuang-by-jzsq_lyx-n4ru/)

分析
1. 审题可得，这里可以转换成对于某一个节点 i, 必须满足这个 i 是一个最高点或者最低点
2. 当 l === r 的时候，如果出现 arr[l] === arr[l + 1], 则先去重
3. 对于不同的 l 和 r ，需要对 r 两侧的值进行判断，如是极值，则扩展窗口，如果 r 不是极值, 那么对应的 [l,r+1] 肯定也不是了，所以将窗口收缩到 l = r 的程度，重新再进行窗口的创建
4. 需要注意，为什么 l 收缩到 r 而不是 r+1, 因为比对 r 是否是极值的时候，需要进行 r-1,r,r+1, 所以 r 和 r+1 的值可能会符合是后续的 [r,r+x] 的湍流数组，所以 l 收缩到 r 
5. 至于 r 和 r+1 对应的值可能会相等，会在循环的第一次判断中的去重进行处理
6. 本题最难是审题
7. 时间复杂度 ${O(n)}$

```javascript
var maxTurbulenceSize = function (arr) {
  const len = arr.length;
  let max = 1; // 最少是 1
  let l = 0,
    r = 0; // 来个初始值
  while (r < len - 1) {
    if (l === r) {
      // 上一次比对不符合要求
      if (arr[l] === arr[l + 1]) {
        //  去重
        l++;
      }
      r++;
    } else {
      // 有和下一个进行比对
      if (arr[r - 1] < arr[r] && arr[r] > arr[r + 1]) {
        r++;
      } else if (arr[r - 1] > arr[r] && arr[r] < arr[r + 1]) {
        r++;
      } else {
        // 不符合要求
        l = r;
      }
    }

    max = Math.max(max, r - l + 1);
  }
  return max;
};

```

### [1004. 最大连续1的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/solution/shuang-zhi-zhen-by-jzsq_lyx-obxu/)
分析
1. 这里其实用到的是双指针的方式
2. 左右指针形成了一个合乎要求的区域，用 arr 来缓存从 0-1 变更的值
3. 每当使用完变更次数 k 之后，再次遇到 0 的时候，我们只能先保存当前长度的区域，然后将 l 指针跳转到最小的变更下标，然后再次进行区域的扩充
4. 时间复杂度 ${O(n)}$,n 是 nums 的长度； 空间复杂度 ${O(k)}$
```javascript

var longestOnes = function (nums, k) {
  const changeArr = []; // 用 arr 来存储从 0-1 的下标的值
  let l = (r = 0);
  let ret = 0;
  while (r < nums.length) {
    const rr = nums[r];
    if (k === 0) {
      // 特殊情况，不做任何处理
      if (rr === 0) {
        ret = Math.max(ret, r - l); // 先保存当前的这个长度
        l = r + 1;
      }
    } else {
      if (rr === 0 && changeArr.length === k) {
        // 当前值是 0，且已经变更了 k 次，无法再变了
        ret = Math.max(ret, r - l); // 先保存当前的这个长度
        // 由于是连续的变动，所以 l 可以直接指向第一个变动值之前
        l = changeArr.shift() + 1;
      }
      if (rr === 0 && changeArr.length < k) {
        changeArr.push(r);
      }
    }
    r++;
  }
  return Math.max(ret, r - l);
};
console.log(longestOnes([0, 0, 1, 1, 1, 0, 0], 0));

```

### [1234. 替换子串得到平衡字符串](https://leetcode-cn.com/problems/replace-the-substring-for-balanced-string/solution/maphua-chuang-by-jzsq_lyx-mh2n/)

分析
1. 本题最难的点在于切分好窗口，窗口里的值是待变更的，窗口外的值是已经确定好的，对应的每一个字符的数量都小于等于 n/4
2. 为什么要这样来初始化窗口，窗口外的值的字符数量小于等于 n/4, 那么就可以变更窗口里的值，使得最终的值符合平衡字符串，因为窗口的值可以任意变，但是一旦外面某个字符的数量超出 n/4, 然后变更窗口的值，使得最终的数量变少了吧；
3. 先遍历一遍，保存所有字符对应的数量到 map 中，注意，这里要先初始化 QWER， 保证 map 中有这4个 key
4. 用 valid 表示滑窗外满足字符小于等于 n/4 的数量，边际条件，如果直接满足，返回 0
5. 然后 r 指针滑动扩展窗口，map 会减少对应字符的数量，当 rr 字符的值达到临界值的时候，valid 会发生变更
6. 当 valid === 4 的时候，表示滑窗外已经满足要求，只要改变滑窗长度的字符，就能实现平衡，这个时候固定 r 指针，移动 l 指针缩小窗口
7. 时间复杂度 ${O(n)}$,  空间复杂度 ${O(n)}$
```javascript
var balancedString = function (s) {
  const n = s.length;
  const max = n / 4; // 这里 n 就是 4 的倍数，入参会做好设定的
  const map = new Map();
  map.set("Q", 0);
  map.set("W", 0);
  map.set("E", 0);
  map.set("R", 0);
  for (let ss of s) {
    map.set(ss, map.get(ss) + 1 );
  }
  let valid = 0; // 有多少个变量满足小于等于 n/4
  [...map.values()].forEach((v) => {
    if (v <= max) valid++;
  });
  if (valid === 4) return 0; //特殊情况，直接结束
  let l = (r = 0);
  let ret = Infinity;
  while (r < n) {
    const rr = s[r];
    map.set(rr, map.get(rr) - 1);
    if (map.get(rr) === max) {
      // 如果减去之后刚好符合要求，则 valid 增加
      valid++;
    }
    while (valid === 4) {
      // 窗口符合要求，开始收缩窗口
      ret = Math.min(ret, r - l + 1); // 先缓存一个
      const ll = s[l];
      l++;
      map.set(ll, map.get(ll) + 1); //收缩滑窗，则滑出去的加入到 map 中去
      if (map.get(ll) > max) valid--;
    }
    // 一直使得 valid 的值少于 4为止
    r++;
  }
  return ret;
}
```