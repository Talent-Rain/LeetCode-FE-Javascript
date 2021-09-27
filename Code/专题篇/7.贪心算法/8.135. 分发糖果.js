// 135. 分发糖果
// https://leetcode-cn.com/problems/candy/

/**
 * @分析 -- 题目描述有问题
 * 1. 第二个条件应该是，只要你比临近位置的评分大，那么你就必然比临近的人分得的糖果多
 * 2. 先初始所有candies 的值为 1
 * 3. 然后分两部分处理，先和左侧分数值比较，只要比左侧大，那么 candies[i] ++ 
 * 4. 然后再从右往左遍历，只要比左侧的分数高，那么就进行比较，取最大值 Math.max(candies[i],cadies[i+1]+1)
 * 5. 最后得到的数组 candies 就能保证，分数更高小孩，肯定比临近分数更低的小孩的 candies 更多
 * 6. 时间复杂度 ${O(n)}$
 */
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
