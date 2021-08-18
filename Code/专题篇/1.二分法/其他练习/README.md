<!--
 * @Author: your name
 * @Date: 2021-08-17 09:45:05
 * @LastEditTime: 2021-08-18 09:25:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/README.md
-->

### [50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

分析

1.  直接将 n 进行拆分，然后递归求值 -- 然后超时了，因为很多值都是重复的，
2.  然后就是快速迭代我们 2 - 4 -16
3.  值得注意的是，这里 n 的取值是 [-2^31,2^31-1] 本来没啥事，但是吧，你将 n 转成正数再执行, 那么 n >> 1 就有事了，一旦 n 是 -2^31,那么第一次递归的时候 recursion 的 n 就是负数了
4.  所以要用 >>> 或者用数学的方法
5.  时间复杂度 ${O(logn)}$

```javascript
var myPow = function (x, n) {
  const recursion = (n) => {
    if (n === 0) return 1;
    // const y = recursion(n >> 1);
    const y = recursion(Math.floor(n / 2));
    return n % 2 ? y * y * x : y * y;
  };
  return n < 0 ? 1 / recursion(-n) : recursion(n);
};

console.log(myPow(2.1, 3));
console.log(myPow(2, -2));
```

### [367. 有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/submissions/)

```javascript
/**
 * @分析
 * 1. 概念：若 x*x = y ， 则 y 是完全平方数
 */
var isPerfectSquare = function (num) {
  let left = 0,
    right = num;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const temp = mid * mid;
    if (temp === num) return true;
    if (temp > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
};

```

### [744. 寻找比目标字母大的最小字母](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/solution/ti-huan-jian-dan-er-fen-by-jzsq_lyx-gxdq/)

分析:
1. 注意： 这道题应该改成，给定一个排好序的字符数组，找出处 target 所在位置的下一个字母，且该数组首尾衔接 -- 即如果给定的 target 在数组最后，则下一个就是首字母；
2. 字母先转成  UniCode 编码，然后用 编码大小来进行比较，注意这里只有小写字母，所以 left right 值也是有了
3. 这是个奇葩的设定，['a','c'],'z' , 如果按照真正 charCode 比较，数组中没有比 'z' 大的，这里这能说是顺序遍历数组后，在 target 之后的第一个元素
4. 时间复杂度: ${O(logN)}$
```javascript
 var nextGreatestLetter = function(letters, target) {
    const targetIndex = target.charCodeAt()
    let left = 0,right = numbers.length-1

    while(left <= right){
        const mid = ((right-left) >> 1) + left

        if(letters[mid].charCodeAt()>targetIndex){
            // 只要是符合的，都返回往左走，知道走不了
            right = mid-1
        }else{
            left= mid+1
        }
    }
    if(left>=numbers.length) return letters[0]
    return letters[left]

};
