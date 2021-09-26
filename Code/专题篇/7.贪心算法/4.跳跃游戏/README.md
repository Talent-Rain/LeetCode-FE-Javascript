


### [45. 跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/solution/hui-su-chao-shi-dphen-man-tan-xin-hen-sh-mi9x/)

```javascript
/**
 * @分析 -- 已知能到达位置，求最少跳跃次数
 * 1. 看到最少，想到用 dp 做；其中 dp[i] 就是到达 i 这个位置最少需要跳跃的次数, 但是控制当前状态的变量在上一个值，感觉 dp 不太合适
 * 2. 感觉用贪心+回溯会更好一点，每一次尽量远的跳，如果不行再跳回来
 * 3. 然后正常超时了
 */
var jump = function(nums) {
    if(nums.length < 2) return 0
    let ret = Infinity

    const dfs = (index,sum) => {
        if(index>=nums.length-1) {
            // 贪心走出来的，肯定是
            ret = Math.min(sum,ret)
            return 
        }
        if(sum>=ret || nums[index] === 0) return // 只要出了第一个，后面的全部不玩了
      
        for(let i = nums[index];i>0;i--){
            dfs(index+i,sum+1)
        }
    }
    dfs(0,0)
    return ret
};

/**
 * @分析
 * 1. 考虑到跳跃范围必须覆盖一定范围，求最小的目的，还是从后倒推前面会更舒服一点，所以考虑 dp；
 * 2. dp[i] 表示跳跃到 i 这个位置最小的次数
 * 3. 状态转移方程: dp[i] = Math.min(dp[i-valid]+1) 这里的 valid 是值符合 nums[j]+j >= i 的 dp[j], 这样在 j 这个位置才能一次跳到 i
 * 4. base case: dp[0] = 0 原地蹦跶
 * 5. 时间复杂度 ${O(n^2)}$
 */
var jump = function(nums) {
    const dp = new Array(nums.length)
    dp[0] = 0 // 原地蹦跶
    for(let i=1;i<nums.length;i++){
        dp[i] = Infinity
        for(let j = i-1;j>=0;j--){
            if(nums[j]+j>=i){
                // 这样才能从 j 跳到 i
                dp[i] = Math.min(dp[i],dp[j]+1)
            }
        }
    }
    return dp[nums.length-1]
}

/**
 * @分析 -- 贪心
 * 1. 每一次跳动都可以缓存最大跳跃范围，这是一个范围而不是一个值，所以下一跳的时候，需要从这个范围内找到最最大跳跃的范围
 * 2. 所以只要迭代每一个值，就可以找到跑到这个值的时候，最大跳跃的覆盖范围 nextIndex 的位置, 同样的，我们将上一轮的最大距离设置为 curIndex
 * 3. 每当迭代到 curIndex, 表明上一次跳跃的覆盖范围都已经遍历完，并且记录好了这个范围内的最大值 nextIndex 了，这个时候更改 curIndex = nextIndex
 * 4. 其实整个过程就是在 [curIndex,nextIndex] 中找最大范围，然后不断迭代；
 * 5. 只需要遍历一次就能找到结果了，所以时间复杂度 ${O(n)}$
 */
 var jump = function(nums) {
    let curIndex = nextIndex = 0
    let ret = 0
    for(let i =0;i<nums.length;i++){
        if(curIndex >=nums.length-1) return ret // 如果最大覆盖范围已经找到了地方，那么就直接跳出遍历了
        nextIndex = Math.max(nextIndex,nums[i]+i) // 最远覆盖范围
        if(curIndex === i) {
            // 如果 i 到达上一次最远覆盖位置，那么 nextIndex 就是上一轮 [cur,next] 的最大距离，现在需要更新一下
            curIndex = nextIndex
            // 所谓覆盖，就是 jump 一次
            ret++
        }
    }
}    
```

### [1306. 跳跃游戏 III](https://leetcode-cn.com/problems/jump-game-iii/solution/bfs-or-dfs-by-jzsq_lyx-ei10/)
> 注意，这里并没有用到贪心，但是这是一个主题的题目，所以也放在一起来学习了；比较分块学习也是按组类学习，而我们真正遇到问题的时候，是不会给你打 tag 说是用啥方法做的，所以相类似的题放一起做，即便由于题目改变了，没有用到相应的技术，也值得放在一起学习一哈；
分析 -- BFS
1. 起点改变，跳跃也从单边转左右两边，目的地也从尽头到跳跃到 0 的位置 -- 注意，以前是可以跳任意位置，现在只能左右跳两个位置，而不是范围跳跃
2. 基于 BFS 将数组转成类似二叉树的 bfs 搜索, 每一个节点都可以走左右两个节点 l,r, 如果符合条件，就加入到队列中继续走
3. 使用的 useSet 缓存走过的节点，进行剪枝
```javascript
var canReach = function (arr, start) {
  const queue = [];
  queue.push(start);
  const useSet = new Set();

  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      const l = node - arr[node];
      const r = node + arr[node];
      if (l >= 0 && !useSet.has(l)) {
        if (arr[l] === 0) return true;
        queue.push(l);
        useSet.add(l);
      }
      if (r < arr.length && !useSet.has(r)) {
        if (arr[r] === 0) return true;
        queue.push(r);
        useSet.add(r);
      }
    }
  }
  return false;
};
```
分析 -- dfs
1. 由于没一个点最多只能左右跳一次，所以和二叉树非常相似，可以用 bfs ，当然也可以用到 dfs
2. 但是判断条件不能简单的用 node 是否在 [0,arr.length-1], 因为在左右跳的过程中会有重复的点，如果不讲重复点剪掉，不但重复计算，而且会导致死循环
3. 所以用 set 缓存已经走的 node，一旦再进入就移除，这样就能完整遍历可以跳到的位置，并最终跳出 dfs 遍历，得到最终结果
4. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
```javascript
var canReach = function (arr, start) {
  let ret = false;
  const useSet = new Set(); // 剪枝用的
  const dfs = (node) => {
    if (useSet.has(node) || ret === true) return;
    if (arr[node] === 0) {
      ret = true;
      return;
    }
    useSet.add(node);
    if (node - arr[node] >= 0) {
      dfs(node - arr[node]);
    }
    if (node - arr[node] < arr.length) {
      dfs(node + arr[node]);
    }
  };
  dfs(start);
  return ret;
};

```