// 56. 合并区间
// https://leetcode-cn.com/problems/merge-intervals/

/**
 * @分析
 * 1. 这里是合并所有重叠的区间，不是两两重叠的区间，所以还是得排个序，这样只需哟啊判断一遍即可，不然直接写个 ret，原来不连接的区间，可能加了一个新的 item 就连接起来了，更麻烦
 * 2. left 节点排序是比较合适的,因为这里需要在某个节点隔断之后，往后的节点不会再影响到 ret 数组里的区间
 * 3. 如果用 right 节点排序，就会出现 [k,r],[k-1,r+1] 的情况，那么已经放入到单独区域的区间还要拿出来用
 * 4. 最后遍历一遍结束，时间复杂度 ${O(n)}$
 */
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
