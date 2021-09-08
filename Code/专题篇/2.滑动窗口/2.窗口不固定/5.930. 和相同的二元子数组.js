/*
 * @Author: your name
 * @Date: 2021-09-06 20:42:03
 * @LastEditTime: 2021-09-06 21:57:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/2.滑动窗口/2.窗口不固定/5.930. 和相同的二元子数组.js
 */

// 930. 和相同的二元子数组

/**
 * @分析 -- 双滑动窗口
 * 1. 不固定大小的滑动窗口，存在两个左指针 l1,l2 ,其中 [l1,r] 的sum 总是小于等于 goal，而 [l2,r] 总数小于 goal 的
 * 2. 每次固定 r 指针，我们知道 [l1,l2-1]的任意一个 [lx,r] 都符合要求
 * 3. 这里用到了两个滑窗进行比较出值，原因是 nums[i] 只能是 0,1, 所以会出现连续的符合要求的值，
 * 4. 所以每一次固定 r 指针的时候， [l1,r] 保持符合要求即值为 goal 的状态， [l2,r] 保持刚好小于 goal 的状态；
 * 5. 则每一次向右滑动窗口后，都得到两个边缘值的窗口，这样就得到想要求的结果
 * 6. 时间复杂度为 ${O(n^2)}$，空间复杂度 ${O(n)}$
 */
 var numSubarraysWithSum = function (nums, goal) {
    let ret = 0
    let l1 = 0, l2 = 0 
    let sum1 = 0,sum2 = 0 // sum1 <= goal, sum2 < goal
    let r = 0
    while(r<nums.length){
        sum1+=nums[r]
        while(l1<=r && sum1>goal){
            sum1-=nums[l1]
            l1++
        }
        sum2+=nums[r]
        while(l2<=r && sum2>=goal){
            sum2-=nums[l2]
            l2++
        }
        ret+= l2-l1
        r++
    }
    return ret
}

/**
 * @分析
 * 1. 双指针进行匹配
 * 2. 然后每一次固定其中一边，进行求值，
 * 3. 没有复用任何的值，所以时间复杂度为 ${O(n^2)}$，空间复杂度 ${O(n)}$
 */
var numSubarraysWithSum = function (nums, goal) {
  let ret = 0;
  for (let i = 0; i < nums.length; i++) {
    // 固定i指针
    let sum = 0;
    let r = i;
    while (r <= nums.length) {
      sum += nums[r];
      if (sum === goal) ret++;
      r++;
    }
  }
  return ret;
};

/**
 * @分析 -- 前缀和
 * 1. 用 map 记录 key 为前缀和， value 为有多少前缀和为 key 的子数组
 * 2. 如果当前前缀和 prevSum - goal 得到的值 temp 已经存在在 map 中，证明有 value 个值 [l,cur] 使得 sum 为 goal
 * 3. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */

 var numSubarraysWithSum = function (nums, goal) {
    const map = new Map()
    let prevSum = 0
    let ret = 0
    for(let num of nums){
        prevSum+=num
        if(map.has(prevSum-goal)){
            ret+=map.get(prevSum-goal)
        }
        if(prevSum === goal){
            ret++
        }
        map.set(prevSum,map.get(prevSum)?map.get(prevSum)+1:1)
    }
    
    return ret
};

