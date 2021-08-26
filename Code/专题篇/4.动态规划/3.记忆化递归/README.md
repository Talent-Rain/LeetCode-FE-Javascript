<!--
 * @Author: your name
 * @Date: 2021-08-26 07:51:13
 * @LastEditTime: 2021-08-26 08:34:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/4.动态规划/3.记忆化递归/README.md
-->

### [118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/submissions/)

分析
1. 杨辉三角中，两条边都是 1 
2. 三角里的值 num[row][col] = num[row-1][col-1]+num[row-1][col]
3. 只需要设置好边界，可以直接用 dp 缓存自顶向下遍历过的 num[row][col]
```javascript
var generate = function(numRows) {
    const dp = new Array(numRows)
    for (let i = 0; i < numRows; i++) {
        dp[i] = new Array() ;
        for(let j = 0;j<=i;j++){
            // 杨辉三角的两边都是 1
            if(j ===  0  || j === i) {
                dp[i][j] = 1
                continue
            }
            dp[i][j] = dp[i-1][j-1]+dp[i-1][j]
        }      
    }
    return dp
};

console.log(generate(1))
console.log(generate(2))
console.log(generate(5))
```

###  [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/solution/ji-yi-hua-di-gui-yu-dp-by-jzsq_lyx-v2eh/)
分析 -- 记忆化递归 -- 自顶向下缓存对应的值
1. 用 map 存储递归过程中存储不同楼梯长度 key, 对应的走法 value
2. 每一次递归都先查 map 是否已经有答案，没有的时候再递归往下继续走
3. base case，[0->1,1->1], 使用 map 缓存值，可以减少重复的中间操作，降低时间复杂度
4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var climbStairs = function(n) {
    const map = new Map()
    map.set(1,1)
    map.set(0,1)
    const recursion= (n) => {
        if(map.has(n)) return map.get(n)
        const sum =  recursion(n-1)+recursion(n-2)
        map.set(n,sum)
        return sum
    }
    return recursion(n)
};
```
@分析 -- dp
1. 使用 dp[i] 表示楼梯为 i 时，有多少种走法
2. 状态转移方程: dp[i] = dp[i-1]+dp[i-2] 
3. base case: dp[0] + dp[1] = 1  -- 啥也不走也是一种走法
4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
```javascript
var climbStairs = function(n) {
    const dp = []
    dp[1] = 1
    dp[0] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
}
```


### [面试题 08.06. 汉诺塔问题](https://leetcode-cn.com/problems/hanota-lcci/solution/di-gui-qiu-zhi-by-jzsq_lyx-gtpk/)
分析
1. 这个一个典型的递归问题,每一次都要将 n 个值从 first启动，经过 second，最后到达 end
2. 拆解一下，如果 n === 1，直接从 first -> end 即可
3. 如果有 n > 1, 那么需要先将 n-1 个值从 first -> end -> second  存储起来，将剩下的一个直接从 first -> end
4. 经过步骤3，当前first 是空的,second 有 n-1 个值， end 有 1个最大值，现在这种情况等价于将  n-1 个值从 second -> first -> end ， 这样最后就能在 end 中找到一个完整的 n 个值的数组了
5. 时间复杂度${O(n^2)}$
```javascript
var hanota = function(A, B, C) {
    const len = A.length;
    const recursion = (n,first,second,end) => {
        if(n === 1) {
            const a = first.pop()
            end.push(a)
            return
        }
        // 将 n-1 个值从 first -> end -> second, 然后将最后的值从 first 移动到 end
        recursion(n-1,first,end,second)
        end.push(first.pop())
        // 现在 end 有一个值， second 有 n-1 个值 ， first 为空
        // 再将 n-1 个值从 second -> first -> end
        recursion(n-1,second,first,end)
    }
    recursion(len,A,B,C)
};
```