<!--
 * @Author: your name
 * @Date: 2021-08-15 09:14:48
 * @LastEditTime: 2021-08-15 10:38:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板1/README.md
-->

## 模板 1

- 目标值是一个固定的 target，在二分过程中需要不断的判断，如果成功就返回对应的值，否则直接返回失败的值
- 返回值如果是向下取，返回 right，如果向上取，则返回 left，还有可能返回一个特定给的失败值；

```javascript
var search = function (fn, target) {
  let left = 最小值,
    right = 最大值;
  while (left <= right) {
    // 取 mid 值
    const mid = ((right - left) >> 1) + left;
    //这里的 fn 可能是函数，也可能只是数组取值，反正就是可以取得一个值去跟 target 比较
    const temp = fn(mid);
    if (temp === target) return mid;
    if (temp < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return 没有精确匹配后的值;
};
```

### [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

```javascript
var search = function (nums, target) {
  const len = nums.length;
  if (!len) return -1;
  let left = 0,
    right = len - 1;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};
```

### [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

```javascript
// 69. x 的平方根
var mySqrt = function (x) {
  let left = 0,
    right = x;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const sqrt = mid * mid;
    if (sqrt === x) return mid;
    if (sqrt < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  // 向下取整
  return right;
};
```

## [374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/submissions/)

分析

1. 这里内置一个函数 guess(n), 返回值是 -1 0 1, -1 是 targt 值更小

```javascript
var guessNumber = function (n) {
  let left = 1,
    right = n;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;

    if (guess(mid) === 0) return mid;
    if (guess(mid) > 0) {
      // 这个时候 mid < pick
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
};

// 自己模拟一下这个 guess 函数吧 -- 假定第二个参数就是目标猜的数字，我们可以用它来初始化，默认是5
function guess(num, pick = 5) {
  if (num === pick) return 0;
  if (pick < num) return -1;
  if (pick > num) return 1;
}
```

## [441. 排列硬币](https://leetcode-cn.com/problems/arranging-coins/solution/xiang-you-bi-jin-de-er-fen-fa-by-jzsq_ly-y9bu/)

分析

1. 这里求的是一个左侧极值的二分法，是向右逼近的二分
2. 累计值算法是小学数学题 sum = (first+end)\*count/2
3. 每次取中间层数，求出到这个层数需要的币数 sum，然后和目标值 n 比较
4. 如果刚好符合，直接返回（这里可以收缩到左侧判定条件中）；如果 count 比较少，则 left 要提到 mid+1,否则 right 要提到 mid-1
5. 由于最后要返回的是最逼近 n 的层数，所以判断一下当 left === right 情况，如果小于 n，则 left = mid+1，这个时候 right 符合要求，所以跳出循环后，返回的是 right
6. 时间复杂度${O(logN)}$

```javascript
var arrangeCoins = function (n) {
  let left = 0,
    right = n;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    // mid 层的时候满的硬币数
    const sum = ((1 + mid) * mid) / 2;
    if (sum === n) return mid;
    if (sum < n) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
};
```

## [33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/er-fen-fa-by-jzsq_lyx-ac9e/)

分析

1. 已知：原始数组 nums 是生序排序的，且数组中的值不一样的
2. 入参的 nums 是在某个下标 k 的作用下发生了重置，使得 nums 现在是先升序数组 [k,len-1]然后断裂后，再一个升序数组[0,k-1]
3. 这是一个局部排好序的数组，所以可以用二分处理,返回的是 target 值的下标或者 -1
4. 所以每次都用排好序的一半来作为判断依据，如果在排好序这边，则删除另外，反之亦然
5. 时间复杂度 ${O(logn)}$

```javascript
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    if (nums[mid] === target) return mid;
    if (nums[mid] >= nums[left]) {
      // [left,mid] 是有序的
      if (nums[left] <= target && target < nums[mid]) {
        // target 在[left , mid) 中
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // [mid,right] 是有序的
      if (nums[mid] < target && target <= nums[right]) {
        // target 在（mid , right] 中
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
```
