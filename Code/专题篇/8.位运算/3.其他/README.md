<!--
 * @Author: your name
 * @Date: 2021-09-02 08:25:24
 * @LastEditTime: 2021-09-02 09:52:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/8.位运算/3.其他/README.md
-->
### [645. 错误的集合](https://leetcode-cn.com/problems/set-mismatch/solution/wei-yun-suan-by-jzsq_lyx-7uu0/)
分析
1. 一般这些有单值，和出现两次的值，第一时间考虑的就是异或，可以将大部分值给筛选掉
2. 用 [1,len] 和 nums 的中值进行异或，得到的就是丢失值 a 和 重复值 b 的异或值
3. 需要注意，位运算符号 & | ^ 优先级低于比较匀速符，所以做比较的时候，要注意加上括号
4. 这个题和 [260. 只出现一次的数字 III](https://leetcode-cn.com/problems/single-number-iii/solution/yi-huo-fen-zhi-wei-yun-suan-by-jzsq_lyx-bgoc/) 十分类似，这里只要将下标[1,2...len] 和 nums 合并，就成了有两个值分别取 1次和3次，其他都取 2次；
5. 需要注意的是，哪一个是缺的值，也就是取 1 次的值，哪个是取 3次，也就是重复的值，所以在得到 left 和 right 后，还需要再遍历一次
6. 由于希望用 O(1 )

```javascript
 var findErrorNums = function (nums) {
  const res = nums.reduce((prev, cur, index) => prev ^ cur ^ (index + 1), 0);

  let temp = 1
  // 找出第一个值为 1 的位
  while((temp & res) === 0){
    temp= temp << 1
  }
  // 所有存在这个位的的 num 和 index 的数量
  let left = 0,right = 0
  for(let i = 0;i<nums.length;i++){
    if(nums[i] & temp) {
      left ^=nums[i]
    }
    if((i+1) & temp) {
      left ^=(i+1)
    }
    if((nums[i] & temp) === 0) {
      right ^=nums[i]
    }
    if(((i+1) & temp) === 0) {
      right ^=(i+1)
    }
  }

  for(let num of nums){
    if(left === num){
      return [left,right]
    }
  }
  return [right,left]

};

```