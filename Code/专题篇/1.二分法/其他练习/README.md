<!--
 * @Author: your name
 * @Date: 2021-08-17 09:45:05
 * @LastEditTime: 2021-08-22 08:44:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/README.md
-->

### [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

分析

1.  直接将 n 进行拆分，然后递归求值 -- 然后超时了，因为很多值都是重复的，
2.  然后就是快速迭代我们 2 - 4 -16
3.  值得注意的是，这里 n 的取值是 [-2^31,2^31-1] 本来没啥事，但是吧，你将 n 转成正数再执行, 那么 n >> 1 就有事了，一旦 n 是 -2^31,那么第一次递归的时候 recursion 的 n 就是负数了
4.  所以要用 >>> 或者用数学的方法
5.  时间复杂度 ${O(logn)}$

```javascript
var myPow = function (x, n) {
  const recursion = (n) => {
    if (n === 0) return 1;
    // const y = recursion(n >> 1);
    const y = recursion(Math.floor(n / 2));
    return n % 2 ? y * y * x : y * y;
  };
  return n < 0 ? 1 / recursion(-n) : recursion(n);
};

console.log(myPow(2.1, 3));
console.log(myPow(2, -2));
```

### [367. 有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/submissions/)

```javascript
/**
 * @分析
 * 1. 概念：若 x*x = y ， 则 y 是完全平方数
 */
var isPerfectSquare = function (num) {
  let left = 0,
    right = num;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const temp = mid * mid;
    if (temp === num) return true;
    if (temp > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
};

```

### [744. 寻找比目标字母大的最小字母](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/solution/ti-huan-jian-dan-er-fen-by-jzsq_lyx-gxdq/)

分析:
1. 注意： 这道题应该改成，给定一个排好序的字符数组，找出处 target 所在位置的下一个字母，且该数组首尾衔接 -- 即如果给定的 target 在数组最后，则下一个就是首字母；
2. 字母先转成  UniCode 编码，然后用 编码大小来进行比较，注意这里只有小写字母，所以 left right 值也是有了
3. 这是个奇葩的设定，['a','c'],'z' , 如果按照真正 charCode 比较，数组中没有比 'z' 大的，这里这能说是顺序遍历数组后，在 target 之后的第一个元素
4. 时间复杂度: ${O(logN)}$
```javascript
 var nextGreatestLetter = function(letters, target) {
    const targetIndex = target.charCodeAt()
    let left = 0,right = numbers.length-1

    while(left <= right){
        const mid = ((right-left) >> 1) + left

        if(letters[mid].charCodeAt()>targetIndex){
            // 只要是符合的，都返回往左走，知道走不了
            right = mid-1
        }else{
            left= mid+1
        }
    }
    if(left>=numbers.length) return letters[0]
    return letters[left]

};
```


### [349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/submissions/)

分析：
1. 先为 nums1 和 nums2 排序，然后遍历其中一个数组，另外一个数组做二分查找，最后得到结果
2. 这里直接取nums1 做遍历，实际可以找个长度少的遍历，长度大的做二分，这样查找过程的时间复杂度即为 ${O(nlogm)}$, 其中 n<=m
3. 但是由于做了排序，实际的时间复杂度是 ${mlogm}$ m 是大的那个长度
```javascript
var intersection = function (nums1, nums2) {
  const l1 = nums1.length,
    l2 = nums2.length;
  if (!l1 || !l2) return [];
  // 先排序
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  const ret = [];
  for (let i = 0;i<l1;i++) {
      if(i>0 && nums1[i-1] === nums1[i]) continue // 重复值跳过
      const n = nums1[i];
    let left = 0,
      right = l2-1;
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
      if (nums2[mid] === n) {
        ret.push(n);
        break;
      }
      if (nums2[mid] > n) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return ret
};
```


### [350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/submissions/)

- 直接用 map 将其中一个数组的值映射保存起来
- 然后遍历另外的数组，每一次匹配成功，则map 的值减一，ret 数组 push 上这个值
- 直到 map 中的这个值为 0，则这个值在两个数组中的最大公约数达到，不再进行 push 咯
- 时间复杂度 ${O(n+m)}$ , 空间复杂度 ${O(n)}$ 其中 n 可以是小的那个数组的不同值长度
```javascript
var intersect = function (nums1, nums2) {
  const map = new Map(); //将长数组的值存储一份
  for (let item of nums2) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  let ret = [];
  for(let item of nums1){
      if(!!map.get(item)){
          map.set(item,map.get(item)-1)
          ret.push(item)
      }
  }

  return ret;
};
```

### [167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)
分析
1. numbers 是升序数组，找出 n1+n2 = target , 返回 n1,n2 对应的下标值 [i1,i2] -- 注意下标值从 1 开始
2. 每个输入只有唯一的输出值
3. 时间复杂度 ${nlogn}$
```javascript
var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length-1; i++) {
    const temp = target - numbers[i];
    let l = i + 1,
      r = numbers.length - 1;
    while (l <= r) {
      const mid = ((r - l) >> 1) + l;
      if (numbers[mid] === temp) return [i + 1, mid + 1];
      if (numbers[mid] < temp) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
};
```

### [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-by-jzsq_lyx-5lbc/)

分析
1. 给定长度为 n+1 的 nums，里面的值都是 1-n, 本题中只有一个值是重复的，找出这个值
2. 注意这里只是表明重复的只有一个值，但是这个值重复多少次并没有说明，所以不能用简单的异或二进制处理
3. 但是我们可以选定以 mid 值，然后判断小于等于 mid 值 count，如果 count 超出了 mid ，证明在 [1,mid] 中至少有一个值重复了，这个时候可以砍掉右侧部分
4. 当 left 和 right 相等之后，即找到了唯一重复的值，因为这个时候左右两侧的值都不服要求，就只有这个了
5. 时间复杂度 ${O(nlohn)}$, 空间复杂度 ${1}$
```javascript
var findDuplicate = function (nums) {
  let left = 1,
    right = nums.length - 1; // 值是 1 - n
    while (left < right) {
    const mid = ((right - left) >> 1) + left;
    const count = nums.reduce((prev, cur) => (cur <= mid ? prev + 1 : prev), 0); // 小于等于 count 的值
    if (count > mid) {
      // 如果 [1,mid] 这个数组满值的情况才只有 mid 个，现在 count 如果比这个还大，证明重复的值在这里面
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
```

### [4.寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-s-114/)

分析
1. 已知两个有序数据，求中位数 （和求第 k 小没啥区别）
2. 根据两个数组的大小，将题转成求第 k 小的题目
3. 这题使用二分没能直接过，判定条件边界很多，最后放弃直接用二分处理掉了


```javascript
var findMedianSortedArrays = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let sum = n + m; // 如果是偶数，取两个值 prev,cur ,取中间值
  let k = (sum + 1) / 2; // 可以是非整数
  let cur;
  while (k >= 1) {
    if (!nums1.length) {
      cur = nums2.shift();
    } else if (!nums2.length) {
      cur = nums1.shift();
    } else {
      if (nums1[0] <= nums2[0]) {
        cur = nums1.shift();
      } else {
        cur = nums2.shift();
      }
    }
    k--;
  }
  let next;
  if (k !== 0) {
    // 这里用 ?? 而不是用 || , 是因为判断 nums[0] 是否为 undefined，而如果是 0 的时候，取 0 而非切换到  Infinity;
    next = Math.min(nums1[0] ?? Infinity, nums2[0] ?? Infinity);
    return (cur + next) / 2;
  }
  return cur;
};
```

### [410. 分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/solution/er-fen-by-jzsq_lyx-l81g/)

分析
1. 切分数组 nums，使得切割后数组和最大的那个值最小 -- 子数组是连续的；
2. 也就是尽可能按照总和均匀的将值分配到每一个数组中，且每个数组中最少有一个值,所以最小值应该就是 max(nums[i]), 最大值是 sum(nums)
3. 设计一个函数 check(max), 判断是否能切割出 m 个连续子数组，且值小于等于 max；如果可以，证明这个是一个较大值，可以继续向左侧逼近，找到一个更小的值；如果不可以，证明这个值 max 偏小了，需要求的值在右侧.
4. 这里最需要注意的是，切割的子组件是连续的；同时每一个数组至少有一个值；
5. 只要捋清楚 check 这个函数，基本就能每次都切掉一半，直接拿到最后值了；
```javascript
 var splitArray = function (nums, m) {
    //    先找到 left 和 right
    let left = 0,
      right = 0;
    for (let num of nums) {
      left = Math.max(num, left);
      right += num;
    }
      //  切割最大值不超过 max 的数组，如果切出来的数组数量少于 m，则证明可以切得更新，发挥 true
    // 如果切除来的数组数量超出了 m, 证明只且 m 组的时候，最小值要超出 max 了，返回 false
    function check(max) {
      let ret = 0,
        sum = 0;
      let i = 0;
      while (i < nums.length) {
        sum += nums[i];
        if (sum >max) {
        // 一旦超出 max，则分组结束，sum 重新设置为 nums[i]
          ret++;
          sum = nums[i];
        }
        i++
      }
    //   如果最后还有剩，单独成团
      ret = sum ? ret + 1 : ret;
      return ret<=m
    }
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
      if (check(mid)) {
        //   如果能找到，向左逼近 -- right 最后得到的是一个不成功的值，因为只要成功它就要发生改变
        right = mid - 1;
      } else {
        //  left 最终出去的时候，肯定代表一个成功的值
        left = mid + 1;
      }
    }
  
    return left;
  };

```