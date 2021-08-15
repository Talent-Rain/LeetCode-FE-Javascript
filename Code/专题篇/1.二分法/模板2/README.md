<!--
 * @Author: your name
 * @Date: 2021-08-15 11:07:09
 * @LastEditTime: 2021-08-15 11:36:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板2/README.md
-->

## 模板 2 -- 需要用到邻居值判断

相比于模板 1，模板 2 中不是仅有一个符合条件值，而是一系列值，我们需要找到符合要求的那个 `极值`，比方说是`符合条件的最大值/第一个值` 等；

```javascript
var search = function (fn) {
  let left = 最小值,
    right = 最大值;
  while (left <= right) {
    // 取 mid 值
    const mid = ((right - left) >> 1) + left;
    //这里的 fn 可能是函数，也可能只是数组取值，反正就是可以取得一个值去跟 target 比较
    const bool = fn(mid);
    if (bool) {
      // 成功了，要向还没成功的地方寻找
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return 特定的值;
};
```

### [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/submissions/)

分析

1. 这里要找出的是第一个错误版本，而整理版本排列是 `正常 -> 错误`，所以这里是根据错误向左逼近
2. 如果是错误版本， right 指针不断往左，如果是正常版本，left 指针不断往右，当左右指针相交时，如果是错误版本，right 继续往左，到达正常区，这个时候 left 就是第一个错误版本了
3. 时间复杂度 ${O(logn)}$

```javascript
var solution = function (isBadVersion) {
  return function (n) {
    let left = 1,
      right = n;
    while (left <= right) {
      const mid = ((right - left) >> 1) + left;
      if (isBadVersion(mid)) {
        // 如果是错误版本
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };
};
```

### [162. 寻找峰值](https://leetcode-cn.com/problems/find-peak-element/solution/mo-ban-2-xu-yao-shi-yong-dao-lin-ju-zhi-j0k8x/)

分析

1.  已知多峰的时候只需返回一个即可，那么就是直接做二分判断即可；
2.  两侧边缘值也可以是峰值,因为题目给了两侧是 -Infinity；
3.  犹豫已经存在整体区域外的最低点，所以只要找到一个局部下降区域，那么局部上升区域中肯定存在峰值；

```javascript
var findPeakElement = function (nums) {
  nums[-1] = nums[nums.length] = -Infinity; // 设置边界值，这样保证在边缘的时候也只需要两个值就能判极值
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    // 找出一个有峰值的区间
    if (nums[mid] > nums[mid + 1]) {
      // [mid,right] 局部下降，而[-1,mid] 是局部上升的，比较有一个最低值
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
```
