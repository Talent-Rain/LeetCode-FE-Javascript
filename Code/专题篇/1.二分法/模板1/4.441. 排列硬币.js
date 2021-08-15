
// 441. 排列硬币

/**
 * @分析
 * 1. 这里求的是一个左侧极值的二分法，是向右逼近的二分
 * 2. 累计值算法是小学数学题 sum = (first+end)*count/2
 * 3. 每次取中间层数，求出到这个层数需要的币数 sum，然后和目标值 n 比较
 * 4. 如果刚好符合，直接返回（这里可以收缩到左侧判定条件中）；如果 count 比较少，则 left 要提到 mid+1,否则 right 要提到 mid-1
 * 5. 由于最后要返回的是最逼近 n 的层数，所以判断一下当 left === right 情况，如果小于 n，则 left = mid+1，这个时候 right 符合要求，所以跳出循环后，返回的是 right
 * 6. 时间复杂度${O(logN)}$
 */
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
    return right
  };
  
  