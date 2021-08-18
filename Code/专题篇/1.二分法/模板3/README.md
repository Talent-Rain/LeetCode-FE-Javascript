<!--
 * @Author: your name
 * @Date: 2021-08-16 09:23:14
 * @LastEditTime: 2021-08-16 09:56:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/模板3/README.md
-->


## [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/er-fen-fa-by-jzsq_lyx-sx7p/)

分析
1. 正常查找 target 值，直到找到左侧第一个，
2. 如果没有找到，则直接返回 [-1,-1]
3. 如果找到了左侧的 target 值，这个时候以左侧 left 为起点，再进行一次二分，求右侧第一个 target 值，最后返回即可
4. 时间复杂度 ${O(logn)}$
```javascript

var searchRange = function(nums, target) {
    if(!nums) return [-1,-1]
    let left = 0,right = nums.length-1
    let ret = []
    // 找左节点
    while(left<=right){
        const mid = ((right-left)>>1) + left
        if(nums[mid]<target){
            left = mid+1
        }else{
            right = mid-1
        }
    }
    if(nums[left]!== target) return [-1,-1]
    // 找右节点
    let l = left,r = nums.length-1
    while(l<=r){
        const mid = ((r-l)>>1) + l
        if(nums[mid]>target){
            r = mid-1
        }else{
            l = mid+1
        }
    }
    return [left,r]
};
```

## [找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/solution/er-fen-zhong-jian-kuo-san-by-jzsq_lyx-zokm/)

分析
1. 先找出 arr 中值最靠近 x 左侧的下标值 -- 如果有等于 x 的就取 x 没有就取最靠近的前一个
2. 然后开始向两边扩散找接近 x 的前 k 个值
3. 时间复杂度 ${O(log(n))}$

```javascript
var findClosestElements = function (arr, k, x) {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = ((r - l) >> 1) + l;
    if (arr[mid] > x) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  //   这个时候 r 是左侧最靠近 x 的值下标，l 是右侧最靠近 x 的值
  let lIndex = r,
    rIndex = l; // 防止混淆
  let ret = [];
  while (k--) {
    let isLeft = true;
    if (lIndex >= 0 && rIndex < arr.length) {
      isLeft = x - arr[lIndex] <= arr[rIndex] - x;
    } else if (rIndex < arr.length) {
      isLeft = false;
    }
    if (isLeft) {
      ret.unshift(arr[lIndex]);
      lIndex--;
    } else {
      ret.push(arr[rIndex]);
      rIndex++;
    }
  }
  return ret;
};
```