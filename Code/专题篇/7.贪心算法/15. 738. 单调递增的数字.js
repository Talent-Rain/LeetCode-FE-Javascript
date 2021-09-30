// 738. 单调递增的数字
// https://leetcode-cn.com/problems/monotone-increasing-digits/

/**
 * @分析
 * 1. 审题，这里是要找一个最大的数 num，num 的位需要单增,也就是 1234,这样的，同时 num <= n
 * 2. 这题数字转字符串转数组，将每个值转成单个数值来计算了，这样更方便点
 * 3. 这里最后要求的是递增的数组，所以我们可以根据 i-1 和 i 之间的值进行替换，当 arr[i-1]>arr[i] 的时候， arr[i-1] 减一，设置锚点 flag
 * 4. 从后往前遍历完之后，找到左侧第一个需要设置为9的点，然后把后面的值全设置为9，达到最大值
 */
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
console.log(monotoneIncreasingDigits(10))