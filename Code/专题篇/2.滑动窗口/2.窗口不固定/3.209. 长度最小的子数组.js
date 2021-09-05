
// 209. 长度最小的子数组

/**
 * @分析
 * 1. 这里求的是符合要求的连续数组的长度，所以这个长度是不确定，也就是窗口长度不确定；
 * 2. 这里求的是一个窗口累加值 sum >= target, 一旦满足要求就要压缩窗口，得到最小符合要求的连续数组的长度
 */
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
  