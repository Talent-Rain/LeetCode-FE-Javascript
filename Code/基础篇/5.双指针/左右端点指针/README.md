
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


### [875. 爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/solution/er-fen-shuang-zhi-zhen-by-jzsq_lyx-l0qa/)

分析 -- 二分
1. l = 1 , r = piles[max],他们分别代表了最大和最小的速度； 这样找出中间值，然后判断是否能在 h 小时内吃完，能吃完则向左逼近，不能吃完则向右逼近，直到最小的速度出现
2. 每一次二分取 mid 之后，都要遍历一次 piles， 所以时间复杂度是 ${nlogn}$
```javascript
var minEatingSpeed = function (piles, h) {
  let l = 1,
    r = piles.reduce((prev, cur) => (prev >= cur ? prev : cur), 1);
  while (l <= r) {
    const mid = ((r - l) >> 1) + l;
    if (getHours(mid) > h) {
      // 需要的时间超出了 h, 证明速度不够
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  // 速度为 v 的时候，需要多久吃完
  function getHours(v) {
    let ret = 0;
    for (let i = 0; i < piles.length; i++) {
      ret += Math.ceil(piles[i] / v);
    }
    return ret;
  }
  return l;
};

```


### [881. 救生艇](https://leetcode-cn.com/problems/boats-to-save-people/solution/shuang-zhi-zhen-by-jzsq_lyx-0jl8/)
分析
1. 由于这里最多只能载人 2， 负重最多是 limit，所以选择载人的时候，尽量先选择最重的和最轻的进行匹配，尽量一船二人坐，可以减少数量，所以先给 people 排序
2. l,r 指针指向最轻和最重的人
3. 然后每次求出2人组合的最轻总量和 sum， 让它和 limit 进行比较，进而控制 l, r 的移动
4. 时间复杂度 ${O(nlogn)}$ 主要是排序问题

```javascript
var numRescueBoats = function (people, limit) {
  let l = 0,
    r = people.length - 1;
  people.sort((a, b) => a - b);
  let count = 0; // 需要的船的数量
  while (l <= r) {
    const sum = people[l] + people[r];
    if (sum > limit) {
      r--;
    } else {
      l++;
      r--;
    }
    count++;
  }
  return count;
};

```