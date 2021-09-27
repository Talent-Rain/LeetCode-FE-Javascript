<!--
 * @Author: your name
 * @Date: 2021-09-22 09:19:21
 * @LastEditTime: 2021-09-27 09:47:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/7.贪心算法/README.md
-->
### [455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/solution/tan-xin-by-jzsq_lyx-y1d6/)
分析 -- 贪心
1. 用最大的饼干满足胃口最大的小孩，这样就能局部最优求出全局最优，可以满足最多的小孩
2. 由于 g,s 都需要取最大，所以需要排序
3. 最后用两个端套的遍历找出最优解
4. 时间复杂度 ${O(n+m)}$
```javascript
var findContentChildren = function (g, s) {
    g.sort((a,b) => a-b)
    s.sort((a,b) => a-b)
    let ret = 0
    let sl = s.length-1; 
    let gl = g.length-1
    while(gl>=0){
        // 人没了，饼干可以还存在
        if(s[sl]>=g[gl] && sl>=0){
            // 最大的饼干能否满足最大胃口的孩子
            ret++
            sl--
        }
        gl--
    }
    return ret
}
```

### [376. 摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/solution/bai-dong-xu-lie-tan-xin-by-jzsq_lyx-9olo/)
分析 -- 贪心
1. 连续数字之间差值是正负交替的，叫做摆动序列；
2. 边缘情况，如果只有1个值，或者两个不相等的值，也是摆动序列
3. 如果出现 0， 则直接不是摆动序列了
4. 如果局部符合要求，按照条件局部删除不符合要求的值，就是贪心的做法
5. 时间复杂度 ${O(n)}$
```javascript
var wiggleMaxLength = function(nums) {
    if(nums.length<2) return nums.length
    let ret = 1 // 从 1 开始是因为要求的是整个摆动序列的长度，所以先初始化1，然后遇到极值递增即可
    let preDiff = 0 // 初始化第一个差值；设置为0，则无论真正第一个差值是多少，得到的都是 0
    let curDiff = 0
    for(let i = 1;i<nums.length;i++){
        curDiff = nums[i]- nums[i-1]
        // 差值必须是正负数，如果是 0 则跳过
        if(curDiff === 0) continue
        if(preDiff * curDiff <= 0){
            ret++
            preDiff = curDiff
        }
    }
    return ret
};
```


### [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)
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

### [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/solution/ju-bu-yue-guo-0-de-jie-dian-zheng-ti-ke-b0tep/)
分析 -- 回溯 -- 超时了
1. 直接将所有可能性写出来，将对应不合适的移除
2. 时间复杂度 ${n*m}$ 其中 n 是nums 的长度，m 是每一个值的大小
```javascript

 var canJump = function (nums) {
    let ret = false;
    const dfs = (start) => {
      // 只要有一个成功，就直接不做其他处理了
      if (start >= nums.length || ret) return;
      if (start+nums[start] >= nums.length-1) {
        ret = true;
        return;
      }
      for (let i = 1; i <= nums[start]; i++) {
        dfs(start + i); // 在当前这一个节点，可以跳的步数
      }
    };
    dfs(0)
    return ret;
  };
```

分析
1. 这里只要不遇到值为 0 就可以继续往后走，也就是局部贪心就是要跳过值为 0 的步骤
2. 当然如果 0 是在数组最后一位也是 ok 的
3. 我们可以判断一下是否存在一个值 nums[valIndex] > 0Index - valIndex, 这样只要到达 valIndex 就可以越过 0 这个点了
4. 所以我们需要遍历所有节点，找到值为 0 的节点，然后再进行跳跃判断；
5. 由于我们是要走到最后一个下标，所以最后一个下标是不用判断的，所以 i 最多走到 nums.length-1 的位置
6. 时间复杂度最小是 ${n}$，
```javascript 
 var canJump = function (nums) {
    for(let i=0;i<nums.length-1;i++){
        if(nums[i] === 0){
            // 开始寻找可以跳过当前 i 值的节点
            let valIndex = i-1
            while(nums[valIndex]<= i -valIndex && valIndex>=0){
                valIndex--
            }
            if(valIndex<0) return false
        }
    }
    return true
 }
```



### [1005. K 次取反后最大化的数组和](https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/solution/liang-ci-tan-xin-by-jzsq_lyx-c4xv/)
分析
1. 我们要转换，肯定是要将负数转成正数，这样能达到最大，那么情况有两种， k 充足将所有负数转换成正数，k 不足
2. 第一次贪心，如果 k 不充足的时候，要先将最大的非负数，这种情况就需要排序了，所以一开始先排个序吧 -- 优先给最大的负数进行转换
3. 第二次贪心，如果将所有非负数转成正数后，k 还有，那么这个时候只需要处理最小的那个值就好了；
4. 我们在第一次贪心的时候是排好序去处理非负数的，所以当处理完非负数之后，index 所在的位置要不就是数组之外，要不就是原始数组第一个非负数，这个时候 index-1 就是转换后的最小非负数，他们之间的对比可以找出当前数组的最小值
5. 需要注意两种特殊情况，如果入参 nums 全是非负数，则 index 不会移动，那么 nums[index-1] 就取不到，同理，如果 nums 全是负数，则 index 在数组外了，所以要把两种情况考虑进去
6. 最后只需要对 min 进行反复转换，如果 k 是偶数，那么就直接不转了，如果是奇数，那么就减去 min*2
7. 时间复杂度 ${O(nlogn)}$
```javascript
 var largestSumAfterKNegations = function(nums, k) {
     nums.sort((a,b)=>a-b)
     let index = 0
     while(k && nums[index] < 0){
        // 如果 k 还存在且当前值还是负数的时候，就转换
        nums[index] = - nums[index]
        k--
        index++
     }
    // 转换后 index 所在的位置就是最开始最小值非负数了，但是它有可能比转换后的最小正数小，所以要对比一下
    // 但是如果 index 是第一个值，也就是一开始全都是非负数的时候，这个时候就没有 index-1 了；
    // 同理，如果全是负数，那么 index 就不存在了

    let min = index=== 0 ? nums[index] : index=== nums.length?nums[index-1] :Math.min( nums[index], nums[index-1])
    // 先将所有负数都转成正数 -- 如果 k 还存在，那么就处理 nums[index] 就好了
    let sum  = nums.reduce((pre,cur)=>pre+cur,0)
    if(k % 2) sum -= min*2
    return sum
};
```


### [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
分析 -- 贪心
1. 多次交易，只有计算出每日的收益，然后将每日收益为正的收集起来就是最大收益
2. 由于本题是多次交易，不需要手续费和间隔时间，
3. 所以如果有连续正收益的时候，相当于连续持有，如果间隔收益，那就是在负收益第一天先卖出后，在负收益的后一天买进，一样可以得到断开的正收益，所以只要将所有正收益手机起来就好
4. 这样局部收益就可以扩展成全局收益，然后就可以得到最终最大的收益了
```javascript
var maxProfit = function(prices) {
    let ret = 0
    for(let i = 1;i<prices.length;i++){
        const temp = prices[i]-prices[i-1]
        if(temp>0){
            ret+=temp
        }
    }

    return ret
}
```


### [134. 加油站](https://leetcode-cn.com/problems/gas-station/solution/tan-xin-qiu-ju-bu-zui-jia-you-liang-by-j-nbmd/)
分析
1. 我们考虑到每次加完油，就要跑路，有一些油站油充分，那么跑完一段之后会有的剩，而有些油站油少，还得补贴一点，至于具体情况如何，我们需要计算一下，所以用 leaves 来表示跑 [i,i-1] 的净油量
2. 使用贪心的思维，起始车是没油的，所以必须是 leaves[i]>=0 的时候，才有可能是起始位置，然后开始往后面走，每次判断一下是否足够下一段路的行走，如果不行，果断放弃上一次的起始点，找下一个起始点
3. 如果在第一次遍历过程中，没找到一个点 ret 可以走完 [ret,len-1] 的路程，那么代表所有起点都失效了，直接返回 -1
4. 如果存在，那么对于循环的车道，还得再走一遍 [0,ret-1]， 如果也成功了，就返回 ret
5. 在整个过程中，如果累计油量保持为非负，那么就不要更改起始位置 ret, 因为你改变了位置，情况不会更好，只会更坏，这也是贪心的本质，每一次都做最好的选择，那么在中间的时候要不放弃，要不就不要改了
6. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
```javascript
var canCompleteCircuit = function (gas, cost) {
  const leaves = gas.map((g, i) => g - cost[i]); // 每一个站台加油后跑路之后，剩余值的数组，正数就是有剩余，负数就是不足，需要在某些地方补充；
  let ret = -1;
  let sum = 0; // 缓存当前油量
  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i] >= 0) {
      if (ret === -1) {
        ret = i;
      }
      sum += leaves[i];
      continue;
    }
    if (sum + leaves[i] < 0) {
      // 之前那个起点已经失败了
      ret = -1; //恢复到 -1
      sum = 0;
    } else {
      sum += leaves[i]; // 继续走着
    }
  }
  if (ret === -1) return -1; 
  // 如果走完这一段，sum 还存在，证明在 [ret,leaves.length-1] 是合格的，那么继续走一下 [0,ret]
  for (let i = 0; i < ret; i++) {
    if (leaves[i] >= 0) {
      sum += leaves[i];
      continue;
    }
    if (sum + leaves[i] < 0) {
      // 在这个循环中一旦出现不合适的，就不再走下去了，因为已经走过一次了
      return -1;
    } else {
      sum += leaves[i]; // 继续走着
    }
  }
  return ret
};

```


分析
1. 基于上面那种贪心，其实有更好的判定方式，就是只要 gasSum >= costSum , 那么必然存在一个起点，能够让车跑完一圈，因为那些差值很大的区间，都是最后积攒大量的剩余油才会去跑的；
2. 上面的第二次 [0,ret] 可以不用跑，只要判断出有一个值可以走完 [ret,len-1], 同时 gasSum >= costSum，那么这个 ret 的点就是起点了
```javascript
var canCompleteCircuit = function (gas, cost) {
  const leaves = gas.map((g, i) => g - cost[i]); // 每一个站台加油后跑路之后，剩余值的数组，正数就是有剩余，负数就是不足，需要在某些地方补充；
  let ret = -1;
  let sum = 0; // 缓存当前油量
  let gasSum = 0
  let costSum = 0
  for (let i = 0; i < leaves.length; i++) {
    costSum+=cost[i]
    gasSum+=gas[i]
    if (leaves[i] >= 0) {
      if (ret === -1) {
        ret = i;
      }
      sum += leaves[i];
      continue;
    }
    if (sum + leaves[i] < 0) {
      // 之前那个起点已经失败了
      ret = -1; //恢复到 -1
      sum = 0;
    } else {
      sum += leaves[i]; // 继续走着
    }
  }
  if (gasSum<costSum) return -1; 
  return ret
};

```

### [135. 分发糖果](https://leetcode-cn.com/problems/candy/solution/tan-xin-ti-mu-you-wen-ti-by-jzsq_lyx-5yax/)
 分析 -- 题目描述有问题
 1. 第二个条件应该是，只要你比临近位置的评分大，那么你就必然比临近的人分得的糖果多
 2. 先初始所有candies 的值为 1
 3. 然后分两部分处理，先和左侧分数值比较，只要比左侧大，那么 candies[i] ++ 
 4. 然后再从右往左遍历，只要比左侧的分数高，那么就进行比较，取最大值 Math.max(candies[i],cadies[i+1]+1)
 5. 最后得到的数组 candies 就能保证，分数更高小孩，肯定比临近分数更低的小孩的 candies 更多
 6. 时间复杂度 ${O(n)}$
 7. 这里最少的发糖就用到了贪心的思想，尽可能少的给糖，先左边局部最少给糖，然后右边局部最少给糖，然后就可以影响最终给糖的数量
```javascript
var candy = function (ratings) {
  const len = ratings.length;
  const candies = new Array(len).fill(1); // 发糖果的数组
  for (let i = 1; i < len; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  for (let i = len - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i + 1] + 1,candies[i]); // 从右边数的时候，就要判断哪边更大了
    }
  }
  return candies.reduce((pre, cur) => pre + cur, 0);
};

```