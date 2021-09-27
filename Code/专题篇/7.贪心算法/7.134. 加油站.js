// 134. 加油站
// https://leetcode-cn.com/problems/gas-station/

/**
 * @分析
 * 1. 我们考虑到每次加完油，就要跑路，有一些油站油充分，那么跑完一段之后会有的剩，而有些油站油少，还得补贴一点，至于具体情况如何，我们需要计算一下，所以用 leaves 来表示跑 [i,i-1] 的净油量
 * 2. 使用贪心的思维，起始车是没油的，所以必须是 leaves[i]>=0 的时候，才有可能是起始位置，然后开始往后面走，每次判断一下是否足够下一段路的行走，如果不行，果断放弃上一次的起始点，找下一个起始点
 * 3. 如果在第一次遍历过程中，没找到一个点 ret 可以走完 [ret,len-1] 的路程，那么代表所有起点都失效了，直接返回 -1
 * 4. 如果存在，那么对于循环的车道，还得再走一遍 [0,ret-1]， 如果也成功了，就返回 ret
 * 5. 在整个过程中，如果累计油量保持为非负，那么就不要更改起始位置 ret, 因为你改变了位置，情况不会更好，只会更坏，这也是贪心的本质，每一次都做最好的选择，那么在中间的时候要不放弃，要不就不要改了
 * 6. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
 */
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
