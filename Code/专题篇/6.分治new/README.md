<!--
 * @Author: your name
 * @Date: 2021-10-08 09:04:41
 * @LastEditTime: 2021-10-14 11:00:42
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


### [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
分析 -- 直接迭代合并链表
1. 合并 k 个链表不好合并，合并2个链表就比较简单了；
2. 这里每一次合并两个链表
3. 合并两个链表为 1 个，然后不断的迭代，最后得到一个
4. 最后超时了，时间复杂度是 ${NM}$ 其中 N 是链表数组的长度，M是链表的平均长度
```javascript

var mergeKLists = function (lists) {
  if (!lists.length) return new ListNode().next;
  return lists.reduce((prev, cur) => mergeTwoList(prev, cur));
};
  // 合并两个有序链表
  const mergeTwoList = (l1, l2) => {
    let temp1 = l1,
      temp2 = l2;
    let emptyNode = (current = new ListNode());
    while (temp1 && temp2) {
      if (temp1.val > temp2.val) {
        current.next = temp2;
        temp2 = temp2.next;
      } else {
        current.next = temp1;
        temp1 = temp1.next;
      }
      current = current.next;
    }
    while (temp1) {
      current.next = temp1;
      current = current.next;
      temp1 = temp1.next;
    }
    while (temp2) {
      current.next = temp2;
      current = current.next;
      temp2 = temp2.next;
    }
    return emptyNode.next;
  };
```

分析 -- 分治
1. 合并 k 个链表不好合并，合并2个链表就比较简单了；
2. 先分: 按照长度进行二分拆分,只要超过 2 个链表就继续往下拆分，直到为 1 个的时候，再治理
3. 再治: 当进行二分拆分后，再组合起来，迭代到最后得到两个有序的数组，然后得到了一个完整的链表
4. 使用分治而不是迭代合并，可以使得合并的次数从 n 次 降低到了 logn， 时间复杂度为 ${MlogN}$ 其中 M 为合并两个链表的长度，n 是链表数组的长度
```javascript
 var mergeKLists = function (lists) {
    const len = lists.length;
    if (!len) return null
    if (len === 1) return lists[0];
    if(len === 2) return mergeTwoList(lists[0],lists[1])
    const mid = len >> 1;
    return mergeTwoList(
      mergeKLists(lists.slice(0, mid)),
      mergeKLists(lists.slice(mid))
    );
  };
  
  
```

### [932. 漂亮数组](https://leetcode-cn.com/problems/beautiful-array/solution/fen-zhi-by-jzsq_lyx-qi3m/)
分析 -- 分治
1. 解答这道题最主要是有两个公式，`奇数+偶数 !== 奇数`,所以如果取值的时候左侧都是奇数，右侧都是偶数，那么肯定符合要求
2. 第二个公式是: 如果 2i !== l+r, 那么 2(i*2+b) !== l*2+b+ r*2+b;  这个等式是当我们取的3个值同奇偶的时候(2(i*2+b),l*2+b, r*2+b)，我们需要考虑，在它的下一层，他们(i,l,r)是符合漂亮数组的；
3. 所以这就需要自底向上，每一次都组合好漂亮数组，然后再网上去合并治理
4. 先分: 由于给定的都是数组长度，所以自己按需填入对应的 [1,2...n] 值就好，一直分到只有一个值了，那么就是 1 了
5. 再治: 合并的时候必须保证合并双方都已经是漂亮数组，这样合并之后才必然是漂亮数组，这里保证合并之后，左侧都是奇数，右侧都是偶数
6. 由于漂亮数组的排列只和长度 n 有关，为了降低重复计算，使用 map 缓存数据
7. 时间复杂度 ${O(n)}$

> 这里最需要考虑的就是当取到三个值是同奇偶的时候，如何保证漂亮；
> 我们知道对于同奇偶的值而言，它是由下一层的漂亮数组递归回来，然后通过 2k+b 的方式转换而来的，也就是说同奇偶的值是符合第二个公式的，进而可以确定他们也是漂亮的
> 这里其实还隐藏了一个等式，那就是对于 [1,2,...,2n] 而言，它是由[[1,2,...n].map(i=>i*2-1) , [1,2,...n].map(i=>i*2-1)] 组成的，这样也同时将奇数放在左边，偶数放在了右边，这是治的一部分;
```javascript
var beautifulArray = function (n) {
  const map = new Map();
  map.set(1, [1]); // 初始化，也是截止条件
  const recursion = (n) => {
    if (map.has(n)) return map.get(n); // 递归的终止条件
    // 奇数放在左侧 -- 按照数组长度排列好漂亮数组后，然后再通过 2N-1 的方式转成当前层的奇数
    const left = recursion((n + 1) >> 1).map((item) => item * 2 - 1);
    const right = recursion(n >> 1).map((item) => item * 2);
    const ret = [...left, ...right];
    map.set(n, ret);
    return ret;
  };
  return recursion(n);
};

```

### [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
分治 -- 快速搜索
1. 求第 k 大，也就是求排好序之后的第 len(nums)-k+1 个值，对应于下标就是 targetIndex =len(nums)-k
2. 这里用到快排的方式，找出随机下标 mid ，然后进行快搜，将大于 nums[mid] 的放在右侧，小于 mid 的放在左侧， 最后返回nums[mid] 在整理后的下标 pivotIndex
3. 如果得到的 pivotIndex 大于我们的 targetIndex，则再次快搜左侧[left,pivotIndex-1]数组
4. 时间复杂度，最快是 ${O(n)}$ 一次找到，最慢是 ${O(n^2)}$
```javascript
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
  
```