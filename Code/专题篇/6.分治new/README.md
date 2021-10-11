<!--
 * @Author: your name
 * @Date: 2021-10-08 09:04:41
 * @LastEditTime: 2021-10-11 09:12:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/6.分治new/README.md
-->

## 正文 -- 参考 lucifer 的分治专题笔记

### 概念
分治即`分而治之`，所以要分成两部分
- 分：将一个规模为 N 的问题分解为若干个规模较小的子问题
- 治：根据子问题的解求原问题

### 关键点
- 一定是先分再治
- 治一定是利用分的结果进行的，也就是说治依赖于分

### 适用场景
1. 如果问题可以被分解为若干个规模较小的相同问题
2. 这些被分解的问题的结果可以进行合并
3. 这些被分解的问题是相互独立的，不包含重叠的子问题
> 分支和 dp 有很深联系，且与二分法也有关联，本质上，二分就是一直只有分没有治的分治，因为二分的结果只需要找到那个较小的相同问题的解，不需要再合并起来；

### 技巧

1. 思考子问题的求解边界，使用函数来定义问题
2. 思考如何将子问题的解进行合并 -- 假设子问题已经计算好了，如何合并起来
3. 思考编码思路 -- 一般使用递归

### 分治和二分，dp的异同
- 二分只对问题进行分，分完直接舍弃；而分治不仅需要对问题进行分解，还需要对多个问题进行治理
- 分治和 dp 都涉及到问题的问题，并且都需要保证子问题的不重不漏。
    - dp 是通过递推和选择进行转译，从特殊推广到一半
    - 分治也可能涉及到选择；
    - dp 解决的问题往往伴随重叠子问题，而分治则不是

### 小结
- 如果一个问题被文杰为若干个不重叠的独立子问题，并且子问题可以推到出原问题，我们就可以用分治来解决；



## 题目

### [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/solution/53-zui-da-zi-xu-he-fen-zhi-fa-by-jzsq_ly-hmra/)
分析 -- 分治法
1. 先分 -- 运用递归的方法将数组区间的左右节点 l,r 不断二分出去，直到 l === r 为止，这个时候需要考虑怎么治理了
2. 再治 -- 这里最终要求的是最大的连续子序列，我们先考虑两个值合并，最大的情况是三种, Math.max(L,R,L+R), 
    - 但是当再多一点值的时候，我们就需要改变一下 Math.max(LMAX,RMAX,L_Rmax+R_Lmax) 这里的 LMAX, RMAX 是指合并两个区间的最大值，L_Rmax 是指在 L 区间包含 right 终点为最大区间；
3. 所以治的过程中，每个区间需要有4个变量，分别是 totalSum 区间总和，leftSum 包含 left 节点的最大连续子列和, rightSum 包含 right 节点的最大连续子列和, maxSum 区间的最大值
4. 初始化的时候，也就是单个节点的时候，4个变量都是唯一值 nums[l]
5. 开始合并治理，
    - totalSum 直接将两个节点的 totalSum 合并即可；
    - leftSum 总是和 left 区间相关 -- Math.max(left.maxSum,left.totalSum+right.leftSum), 要不直接区左区间的最大值，要不全取左区间 + 右区间的 leftSum
    - 同理 rightSum 也总是和 right 区间相关 -- Math.max(right.maxSum,right.totalSum+left.rightSum)
    - maxSum 分三种情况 -- Math.max(left.maxSum,right.maxSum,left.rightSum+right.leftSum)
6. 所以先递后归，时间复杂度为 ${O(n)}$
```javascript

var maxSubArray = function (nums) {
    const recursion = (l,r) => {
        if(l === r) {
            return {
                totalSum: nums[l],
                leftSum: nums[l],
                rightSum: nums[l],
                maxSum: nums[l]
            }
        }
        const mid = ((r-l)>>2)+l
        const left = recursion(l,mid)
        const right = recursion(mid+1,r)
        return {
            totalSum:left.totalSum+right.totalSum, // 区间内值的总和
            leftSum:Math.max(left.leftSum,left.totalSum+right.leftSum), // 左边界开始的最大连续子列和
            rightSum: Math.max(right.rightSum,right.totalSum+left.rightSum), // 区间哟偶边界结束的最大连续子列和
            maxSum:Math.max(left.maxSum,right.maxSum,left.rightSum+right.leftSum)
        }
    }
    return recursion(0,nums.length-1).maxSum
}
```

分析 -- 贪心
1. 求的是最大和的`连续子数组`
2. 用 sum 缓存前面和大于 0 的子数组之和，一旦小于 0 ，就不再累加，重新置 0, 保持每一次迭代前 sum 的值都是 >=0
3. 这样对于每一个局部子数组，它的累加值都是大于等于 0 的，这样每次累加一个新值，就进行最大值比较，保证整体是一个最大子数组之和
4. 时间复杂度 ${O(n)}$
```javascript
var maxSubArray = function (nums) {
  let max = -Infinity;
   let sum = 0
   for(let i = 0 ;i<nums.length;i++){
       sum+=nums[i]
       max = Math.max(sum,max)
       if(sum<=0){
           sum=0
       }
   }
   return max
};

```


### [96. 不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/solution/fen-zhi-dp-by-jzsq_lyx-mc8i/)
分析 -- 分治
1. 题目都是给定 n 个节点，求最多能有多少种 BST，也就是求在 [1,n] 这些节点能构成多少中 BST， 可以细分到按顺序的 [k,k+n] 的小区间，能构成多少个 BST
2. 先分: 由于 BST 左树小于右树，所以可以不断将节点区间拆分左右两份，交给子树自己处理
3. 再治: 拆分到只有一个节点的时候，自然只有一种了；当左右树分别都有l,r 种不同的解法，合并之后就是 l*r 种了
4. 当然这种办法会做很多重复的工作，毕竟我们在执行回调的时候，入参的指数一个节点树 x, 所以我们可以用空间换时间的概念，缓存一些值
5. 这样处理之后，时间复杂度为 ${O(nlog(n))}$, 空间复杂度为 ${O(n)}$
```javascript
var numTrees = function (n) {
  const map = new Map();
  const recursion = (n) => {
    if (n <= 1) return 1; //没有节点也算一种分配
    let temp = 0;
    for (let i = 1; i <= n; i++) {
      let l, r;
      if (map.has(i - 1)) {
        l = map.get(i - 1);
      } else {
        l = recursion(i - 1);
        map.set(i - 1, l);
      }
      if (map.has(n - i)) {
        r = map.get(n - i);
      } else {
        r = recursion(n - i);
        map.set(n - i, r);
      }
      temp += l * r;
    }
    return temp;
  };
  return recursion(n);
};
```
分析 -- dp + 分治
1. 根据分治解法可知，每一次都只是按照节点数来治理相应的子树，所以可以用 dp 来缓存
2. dp[i] 表示有 i 个节点时，不同子树的最大数量
3. base case dp[0] =1, 这个其实就是分治中分到最后的初次治理
4. 状态转移方程: dp[i] = 累加的 dp[k-1]*dp[i-k] 这里就是分治中治理合并的过程，在 dp 中是状态转移方程；
5. 时间复杂度为 ${O(nlog(n))}$, 空间复杂度为 ${O(n)}$
```javascript
var numTrees = function (n) {
    const dp = new Array(n+1)
    dp[0] = 1
    for(let i =1;i<=n;i++){
        dp[i] = 0
        for(let j = 1;j<=i;j++){
            dp[i] +=dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
}
```


### [169. 多数元素](https://leetcode-cn.com/problems/majority-element/solution/169-duo-shu-yuan-su-fen-zhi-mo-er-tou-pi-ip51/)
分析 -- 分治
1. 先分：将 nums 拆分到单个值的数组之后，然后开始治理
2. 再治：合并的时候，先找出两个合并的众数值和数量，然后再考虑合并之后哪一个才是真正的众数；
3. 再治2：选择众数是通过比较两个合并数组得到的，合并之后众数值是两个数组都要获取的，所以每一次治的时候都要再次获取对应 target 的数量
4. 治理解析: 为什么直接比对两个数组的众数就能得到合并后数组的众数，那么这两个值就当前数组最有可能的众数了，只要比对这两个值就能得到当前合并数组的真正众数了
5. 二分递归的时间复杂度是 logn, 每一次治理合并的时候的复杂度也是 logn，所以时间复杂度是 ${O(n)}$,空间复杂度 ${O(1)}$
```javascript
 var majorityElement = function(nums) {
    const recursion = (l,r) => {
        if(l === r) return nums[l]
        const mid = ((r-l)>>1)+l 
        const lMax = recursion(l,mid)
        const rMax = recursion(mid+1,r)
        if(lMax === rMax) return lMax // 如果相等，则就是众数了
        let lMaxtCount = 0
        let rMaxtCount = 0
        for(let i=l;i<=r;i++){
            if(nums[i] === lMax) lMaxtCount++
            if(nums[i] === rMax) rMaxtCount++
        }

        return lMaxtCount>rMaxtCount ? lMax:rMax
    }
    return recursion(0,nums.length-1)
}
```
分析 -- 摩尔投票法
1. 如果有一个值 target 得到票数是 nums 的一半以上，那么对于任意一个最开始的取值，我们都可以假设为 target，然后维护一个票数 count
2. 如果 count 已经为 0 了，那么就替换 target 值，直到最后留在 target 上的值，就是所求的值
3. 这里考虑最极端的情况，就是一开始就取到了真实的 target 值，它不断和其他值进行抵消，由于 target 的数量是大于一半的，所以最后还是能保留在 target 上
4. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(1)}$
```javascript
var majorityElement = function(nums) {
    let target;
    let count = 0
    for(let num of nums){
        if(count === 0 && target !== num) {
            // 如果 count 为 0， 证明上一个 target 已经无效了
            target = num 
        }
        if(target === num){
            count++
        }else{
            count--
        }
    }
    return target
};

```