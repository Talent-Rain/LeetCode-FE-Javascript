<!--
 * @Author: your name
 * @Date: 2021-09-22 09:19:21
 * @LastEditTime: 2021-09-30 10:03:39
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

### [860. 柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/solution/tan-xin-bao-cun-geng-xi-li-du-de-wu-liao-1n1u/)
分析
1. 如果能思考到局部贪心，基本就是一道遍历题
2. 由于 5 元属于更小粒度的单位，在数量足够的时候可以组合成 10 元， 所以我们在给 20 元找零的时候，局部贪心的保存 5 元，这样能保证出力后续的时候更可能完成任务
3. 所以剩下的就是将情况排列出来了
4. 时间复杂度 ${O(n)}$
```javascript
var lemonadeChange = function(bills) {
    let fives = 0
    let tens = 0
 
     for(let i =0;i<bills.length;i++){
         const b = bills[i] 
         if(b === 5){
            fives++
         }
         if(b === 10 ) {
             if(fives>0){
                 fives--
                 tens++
             }else {
                 return false
             }
         }
         if(b === 20){
             // 现在用贪心，先尽可能的用 10 块去找零，因为 5 块是粒度更小的零钱，它通用性更强，所以尽可能贪心的保存 5 块
             if(tens>0 && fives>0){
                tens--
                fives--
             }else if (tens === 0 && fives>=3){
                 fives -=3
             }else{
                 return false
             }
         }
     }
     return true
 
 };
```


### [406. 根据身高重建队列](https://leetcode-cn.com/problems/queue-reconstruction-by-height/solution/zhao-dao-mei-ci-sheng-yu-de-zui-da-gao-d-egiy/)
分析
1. 先分类，将身高一样的先缓存在一起
2. 然后根据 key 从高到低开始贪心的排列，因为每一次我们都取`最高且前面人数最少`的 item， 这个时候队列的两个条件已经一起限制好，只需要按照 item[i] 插入到 ret 上就足够了 -- 后续的插入是不会影响到当前插入的，因为后续的值肯定会贴合现有排好的 ret；
3. 我们可以先取出身高更高的值，因为这个时候，排在它前面的，就只有它自己和已经排好的数组 -- 这就是局部贪心
4. 这个时候在相同身高的数组里，还要根据前面的人数进行一次排序，保证少的在前面 -- 这样当前 item 插入到最终 ret 的时候，它就可以根据 item[1] 直接插入到 ret 对应的位置了
5. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var reconstructQueue = function(people) {
    const map = new Map(); // 先将身高一眼给的缓存起来
    for(let i = 0;i<people.length;i++){
        const key = people[i][0]
        map.set(key,map.get(key)?[...map.get(key),people[i]]:[people[i]])
    }
    const arr = [...map.keys()].sort((a,b)=>b-a) // 从大到小
    const ret = []
    for(let i = 0;i<arr.length;i++){
        const tempArr = map.get(arr[i]) // 取出数组
        tempArr.sort((a,b)=>a[1]-b[1]) // 身高相同的数组，要根据在他们前面的人的数量进行排序，这样才能保证前面人少的在前面
        // 这个时候需要只需要按找数组的第二个值，插入到最终数组即可
        for(let temp of tempArr){
           ret.splice(temp[1],0,temp) // 在 temp[1] 的位置插入 temp
        }
    }
    return ret
};

const ret = reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]);
console.log(ret)
```


### [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/solution/pai-hao-xu-cai-neng-geng-hao-de-tan-xin-x74ey/)
分析 -- 失败
1. 首先要审题并理解题目，虽然说的是二维空间的气球，但是实际排列的时候在一个坐标 x 上可能会存在气球的重叠；所以当箭从 x 射进去，就可以一次打破 n>1 个气球
2. 所以题目就转换成 -- 每次找到`重叠最多`的位置进行射击，当气球射完需要多少箭；-- 也就是找到交集的数量 
3. 这里可以和并查集进行对比，并查集遇到交集后，会扩展集合为并集，而这里是收缩到交集，所以刚好是相反的概念
4. 这里用到的贪心思想就是，一旦有交集，我们就把两个气球收缩为一个更小的气球，局部贪心的将有交集的气球压缩到一个更小的气球中，这样最后剩下的气球就是相互隔离的，达到全局的贪心 -- 尽可能少的射击
5. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
6. 这种写法失败的原因在于，随机找出来一个区间值，这个区间值的收缩是随机的，所以就会出现一个很小的区间 A 将本来可以容纳更多气球的某一个区间 B 收缩的很小区间 C，使得最后的结果不够贪心，而最优的情况是将区间 A 放在另外的一个区间 A1 上，然后让 B 区间容纳更多的气球 B1,B2；
7. 所以需要将无序的气球按排好序，这样按顺序在局部范围内最贪心的重叠气球，就可以保证在局部范围内，尽可能小的缩小取值区间，容纳更多的气球 -- 具体看`分析2`
```javascript

 var findMinArrowShots = function(points) {
    const len =  points.length 
    let ret = [] // 缓存没有交集的数组
    for(let i =0;i<len;i++){
        const pp  = points[i]
        let isMerge = false
        for(let i = 0;i<ret.length;i++){
            const rr = ret[i]
            // 如果起始位置都超过了终止位置，那么就没有交集了
            if(pp[0]>rr[1] || pp[1]< rr [0]) continue
            // 否则就是有交集了，那么只要保存交集就好，因为射中交集的时候，一次性就完成所有的气球爆炸
            ret[i] =  pp[0]<=rr[0]?[rr[0],Math.min(pp[1],rr[1])]:[pp[0],Math.min(pp[1],rr[1])]
            isMerge = true // 如果合并了
            break
        }
        if(!isMerge){
            ret.push(pp)
        }
    }
    return ret.length
};
```

分析2
1. 基于上面那种两边同时限制，会出现分组限制更多的情况，我们限制其中一边进行排序，尽可能使用其中一边作为限制条件，在这里我们根据 left 作为排序依据进行排序
2. 排序之后，我们只需要判断新的气球的最左边是否离开了当前气球的最右边，就可以判断是否是同一组；
3. 如果属于同一组，那么需要现在这一组最 right 的位置，这个位置也是射击的最右位置，保证往这个点射进去，这一组的气球全爆，所以需要找的是交集最小值
4. 时间复杂度 ${O(nlogn)}$, 空间复杂度 ${O(1)}$
5. 这里用到的贪心思想就是尽可能局部最多重叠的气球，而上题也是因为没法保证会让最多重叠气球放在一起
```javascript
var findMinArrowShots = function(points) {
    const len =  points.length 
    points.sort((a,b)=>a[0]-b[0])
    let cur = -Infinity;
    let ret = 0
    for(let i = 0 ;i<len;i++){
        const pp  = points[i]
        if(pp[0]>cur) {
            // 超出范围了
            ret++
            cur = pp[1] // 修改
        }else{
            cur = Math.min(cur,pp[1])
        }
    }
    return ret
}

findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])
findMinArrowShots([[1,2]])
findMinArrowShots([[3,9],[7,12],[3,8],[6,8],[9,10],[2,9],[0,9],[3,9],[0,6],[2,8]])
```

分析3 -- 右侧节点排序
1. 使用左侧节点排序，在重合区域要保证 right 节点最小，这个才能保证下一个值可以落到集合的交汇处
2. 但是使用右侧排序的时候，本身 right 节点就比 left 节点要大，所以右侧排序后，其他的节点对于当前节点 [l1,r1] 而言，只要 l2 < r1, 那么必然是存在于区间内的，而且只要存在于区间内，那么 right 值都不需要变，因为第一个取值就是最小了，所以有下面的写法
3. 这种排序更直观一点，画图会更好看清楚
```javascript
var findMinArrowShots = function(points) {
    const len =  points.length 
    points.sort((a,b)=>a[1]-b[1]) // 右侧排序
    let right = -Infinity;
    let ret = 0
    for(let i = 0 ;i<len;i++){
        const pp  = points[i]
        if(pp[0]>right) {
            // 超出范围了
            ret++
            right = pp[1] // 修改
        }
    }
    return ret
}
```

### [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)
分析
1. 和 [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/solution/pai-hao-xu-cai-neng-geng-hao-de-tan-xin-x74ey/) 类似，只是那边尽可能集合在一起，这里是要分开
2. 所以这里以区间的右侧值做排序，这样 的好处就是，一旦某个值的 left 大于当前的 right 值，那么就出现完全隔离的区间了；
3. 最后的答案就是长度减去可以完全隔离的区间
```javascript
var eraseOverlapIntervals = function(intervals) {
    const length = intervals.length
    intervals.sort((a,b) => a[1]-b[1]) // 按右侧大小排列好
    let  right = -Infinity
    let ret = 0 // 集合数量
    for(let i = 0;i<length;i++){
        const ii = intervals[i]
        if(ii[0]>=right) {
            ret++ 
            right = ii[1]
        }
    }
    return length-ret
}
```

### [763. 划分字母区间](https://leetcode-cn.com/problems/partition-labels/solution/xing-si-shuang-zhi-zhen-chuang-kou-by-jz-zd85/)
分析
1. 题目限制条件1：相同的字符只能存在于同一个字符串片段；限制条件2：尽可能多的切分字符串片段
2. 所以我们先用 map 缓存每个字符最后出现的下标值，那么当我的字符串中存在这个字符，那么最少要走到它的尽头下标
3. 相当于开启了一个不定长窗口，然后在这个窗口遍历过程，判断窗口的最长值是否需要扩展，当窗口遍历完成后，记录窗口的长度，然后执行下一个窗口
4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
5. 这里没看出局部贪心导向全局贪心，可能是保证所有相同字符都要在一起算是局部贪心吧
```javascript
var partitionLabels = function(s) {
    const map = new Map() // 记录字符和最后一个字符对应的下标
    for(let i = 0;i<s.length;i++){
        const ss = s[i]
        map.set(ss,i)
    }
    console.log(map)
    let ret = []
    let start = 0
    // 现在尽可能短的获取片段
    while(start<s.length){
        let temp = start // 起始值
        let end = map.get(s[start]) //第一个字母的最后一个下标

        while(start<=end){
            if(map.get(s[start])>end){
                end = map.get(s[start]) // 将 end 变长
            }
            start++
        }
        // 抛出一轮了
        ret.push(start-temp)
    }
    return ret
};

console.log(partitionLabels('ababcbacadefegdehijhklij'))
```

### [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)
分析
1. 这里是合并所有重叠的区间，不是两两重叠的区间，所以还是得排个序，这样只需哟啊判断一遍即可，不然直接写个 ret，原来不连接的区间，可能加了一个新的 item 就连接起来了，更麻烦
2. left 节点排序是比较合适的,因为这里需要在某个节点隔断之后，往后的节点不会再影响到 ret 数组里的区间
3. 如果用 right 节点排序，就会出现 [k,r],[k-1,r+1] 的情况，那么已经放入到单独区域的区间还要拿出来用
4. 最后遍历一遍结束，时间复杂度 ${O(n)}$
```javascript
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let ret = [];
  let cur = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    const temp = intervals[i];
    if (temp[0] > cur[1]) {
      // 当取出的空间的起始值已经比当前值要大的时候，那么剩下的其他值，也会完全和当前的 cur 隔离开，所以将当前 cur 推入 ret 中
      ret.push(cur);
      cur = temp; // 替换 cur
    }
    if (cur[1] < temp[1]) {
      cur[1] = temp[1];
    }
  }
  return [...ret, cur];
};

console.log(
  merge(
    [[1,4],[2,3]]
  )
);

```

### [738. 单调递增的数字](https://leetcode-cn.com/problems/monotone-increasing-digits/solution/ju-bu-zui-da-dao-quan-ju-zui-da-by-jzsq_-gk7o/)

分析
1. 审题，这里是要找一个最大的数 num，num 的位需要单增,也就是 1234,这样的，同时 num <= n
2. 这题数字转字符串转数组，将每个值转成单个数值来计算了，这样更方便点
3. 这里最后要求的是递增的数组，所以我们可以根据 i-1 和 i 之间的值进行替换，当 arr[i-1]>arr[i] 的时候， arr[i-1] 减一，设置锚点 flag
4. 从后往前遍历完之后，找到左侧第一个需要设置为9的点，然后把后面的值全设置为9，达到最大值
```javascript
var monotoneIncreasingDigits = function (n) {
    if(n<10) return n //如果是个位数，直接返回 n
  const str = String(n)
  const len = str.length
  const arr = str.split('')
  let  flag = Infinity // 标记最后一个设置为 9 的下标，从这个下标之后的值，都得换成 9
  for(let i =len-1;i>=0;i--){
    if(arr[i-1]>arr[i]){
        // 如果前一位大于后一位，那么为了当增，需要将当前位减一，后一位换成 9
        flag = i
        arr[i-1] = arr[i-1] -1 
    }
  }

  for (let i = flag; i < len; i++) {
      arr[i] = 9
  }
  return Number(arr.join(''))
};
```