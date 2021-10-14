// 215. 数组中的第K个最大元素
// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

/**
 * @分治 -- 快速搜索
 *
 */
 // 215. 数组中的第K个最大元素
// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

/**
 * @分治 -- 快速搜索
 * 1. 求第 k 大，也就是求排好序之后的第 len(nums)-k+1 个值，对应于下标就是 targetIndex =len(nums)-k
 * 2. 这里用到快排的方式，找出随机下标 mid ，然后进行快搜，将大于 nums[mid] 的放在右侧，小于 mid 的放在左侧， 最后返回nums[mid] 在整理后的下标 pivotIndex
 * 3. 如果得到的 pivotIndex 大于我们的 targetIndex，则再次快搜左侧[left,pivotIndex-1]数组
 * 4. 时间复杂度，最快是 ${O(n)}$ 一次找到，最慢是 ${O(n^2)}$
 */
 var findKthLargest = function (nums, k) {
    const select = (left, right) => {
      if (left === right) return nums[left];
      let mid = ((right - left) >> 1) + left;
    //   pivotIndex 表示 mid 在整理后数组所在 index
      const pivotIndex = dfs(left, right, mid);
      if (pivotIndex === nums.length-k) return nums[pivotIndex];
      if (pivotIndex > nums.length-k) {
        return select(left, pivotIndex - 1);
      } else {
        return select(pivotIndex + 1, right);
      }
    };
    const dfs = (left, right, pivot) => {
      let l = left,
        r = right;
      const target = nums[pivot];
      //先放在最左边，然后[l+1,r] 的位置进行处理，最后在 l,r 的交界处，再把 target 交换回来 
    //  这里是先将 target 放在了左边，所以要找到的是交界处小于 target 的那个点，也就是 r，然后让 r 和 原始的left 进行值交换即可
      [nums[l], nums[pivot]] = [nums[pivot], nums[l]]; 
      while (l <= r) {
        while (nums[l] <= target && l <= r) {
          l++;
        }
        while (nums[r] >= target && r >= l) {
          r--;
        }
        if (l > r) break;
        [nums[l], nums[r]] = [nums[r], nums[l]];
      }
      [nums[left], nums[r]] = [nums[r], nums[left]];
      return r;
    };
    return select(0, nums.length - 1);
  };
  