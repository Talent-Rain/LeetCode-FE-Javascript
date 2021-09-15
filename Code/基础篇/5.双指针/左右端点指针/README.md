<!--
 * @Author: your name
 * @Date: 2021-09-13 09:04:19
 * @LastEditTime: 2021-09-14 10:15:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/左右端点指针/README.md
-->


### [16. 最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)
分析
1. 暴力解法，直接固定左右两个节点i,j，然后设置第三个指针 k 在两个指针之间遍历求和，找出最接近 target 的值
2. i 遍历一次nums，j 和 k 每固定一次加起来遍历一次 nums，所以时间复杂度为 ${O(n^2)}$
```javascript
var threeSumClosest = function(nums, target) {
    const len = nums.length 
    let ret;
    let temp = Infinity // sum 与 target 的相差值
    for(let i =0;i<len-2;i++){
        for(let j = len-1;j>1;j--){
            for(let k = i+1;k<j;k++){
                const sum=nums[i]+nums[j]+nums[k]
                const bet = Math.abs(sum-target) 
                if(bet<temp){
                    // 这一组的和比之前的更接近 target 
                    ret = sum;
                    temp = bet
                }
            }
        }
    }
    return ret
}; 

console.log(threeSumClosest([-1,2,1,-4],1))
```

### [713. 乘积小于K的子数组](https://leetcode-cn.com/problems/subarray-product-less-than-k/solution/yi-dong-chuang-kou-by-jzsq_lyx-viee/)
分析
1. 求的是符合要求的，连续的子数组的最大个数，盲猜可以用不定大小的滑窗处理
2. 移动 r 指针扩展窗口，然后当乘积超出 k 的时候，开始收缩 l 指针，最后得到一个符合要求的窗口 [l,r]
3. 在这个窗口 [l,r] 中，任意的一种组合都符合要求，由于组合属于一种特性的判断，所以不需要用双窗口来求符合要求的数量，直接 r-l+1 即可
4. 需要注意的时候，收缩 l 指针的时候，判定条件 l<=r 的原因是，当前 nums[r] 可能就比 k 大，这个情况应该收缩窗口为 0，并走到下一步
5. 时间复杂度 ${O(n)}$
```javascript

 var numSubarrayProductLessThanK = function (nums, k) {
    let l = (r = 0);
    let product = 1; // 默认最小为 1
    let ret = 0; // 最大长度
    while (r < nums.length) {
      const rr = nums[r];
      product *= rr;
      while (product >= k && l <= r) {
        // 超出了 k
        ll = nums[l];
        product = product / ll;
        l++;
      }
      // 这个时候 [l,r] 之间的值的乘积是小于 k 的
      ret += r - l + 1;
      r++;
    }
  
    return ret;
  };
```


### [977. 有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/solution/shuang-zhi-zhen-bao-li-jie-fa-by-jzsq_ly-puzb/)

分析
1. 分发左右指针l,r, 然后用一个额外的数组来存储平方后的数组即可
2. 由于这是一个排好序的增序列，会存在负数，但是值的平方最大值就在数组的两侧，所以每次比较两侧的值，就能获取到相应的最大值，然后 unshift 到数组中即可
3. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
```javascript
var sortedSquares = function(nums) {
    
    let l = 0,r = nums.length- 1

    let ret = []

    while(l<=r){
        if(nums[r]>Math.abs(nums[l])){
            ret.unshift(Math.pow(nums[r],2))
            r--
        }else{
            ret.unshift(Math.pow(nums[l],2))
            l++
        }
    }
    return ret
};

```