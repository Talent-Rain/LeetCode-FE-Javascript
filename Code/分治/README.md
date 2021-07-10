<!--
 * @Author: your name
 * @Date: 2021-07-08 10:10:59
 * @LastEditTime: 2021-07-10 11:08:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/分治/1.不同的二叉树/1.index.md
-->

# 分治专题

## [不同的二叉树](https://leetcode-cn.com/problems/unique-binary-search-trees/solution/fen-zhi-dp-by-jzsq_lyx-ibre/)
### 分析 -- 分治
1. 给定一个 n ，就是得到了一个 [1,n] 的单增数组，对于 BST 而言，给定同样的一个合规长度的数组，那么组成这个 BST 的形式是有限的
2. 当给定 0 个节点，即某一课子树不存在，但是返回值为 1，当节点只有一个的时候，也只有一种情况，所以返回值也是 1
3. 当给定的节点超过 1 的时候，我们就要选定根节点，然后把小于根节点的值给左子树，大于根节点的值给右子树，对于子树而言，一样执行上述操作，最后返回当前节点下组成的形式
4. 将所有可选根节点的情况累加起来，就是当前节点最终可得的情况，然后递归回去，最终在树的根节点得到最终的值
5. 时间复杂度 ${O(NlogN)}$,空间复杂度${O(H)}$ -- 每一层递归都会创建一个新的 ret
```javascript
/*
 * @Author: your name
 * @Date: 2021-07-08 09:13:08
 * @LastEditTime: 2021-07-08 10:08:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/分治/1.96. 不同的二叉搜索树.js
 */

// 96. 不同的二叉搜索树

/**
 * @分析 -- 分治
 * 1. 给定一个 n ，就是得到了一个 [1,n] 的单增数组，对于 BST 而言，给定同样的一个合规长度的数组，那么组成这个 BST 的形式是有限的
 * 2. 当给定 0 个节点，即某一课子树不存在，但是返回值为 1，当节点只有一个的时候，也只有一种情况，所以返回值也是 1
 * 3. 当给定的节点超过 1 的时候，我们就要选定根节点，然后把小于根节点的值给左子树，大于根节点的值给右子树，对于子树而言，一样执行上述操作，最后返回当前节点下组成的形式
 * 4. 将所有可选根节点的情况累加起来，就是当前节点最终可得的情况，然后递归回去，最终在树的根节点得到最终的值
 * 5. 时间复杂度 ${O(NlogN)}$,空间复杂度${O(H)}$ -- 每一层递归都会创建一个新的 ret
 */
var numTrees = function (n) {
  const recursion = (n) => {
    if (n === 0) return 1;
    if (n === 1) return 1;
    let ret = 0;
    for (let i = 1; i <= n; i++) {
      ret += recursion(i - 1) * recursion(n - i);
    }
    return ret;
  };
  return recursion(n);
};
```

### 分析 -- 动态规划
1. 给定一个 n ，就是得到了一个 [1,n] 的单增数组，对于 BST 而言，给定同样的一个合规长度的数组，那么组成这个 BST 的形式是有限的
2. dp[n] 表示给定 n 个有序数组下，可以拆解好的 BST 的数量 , 这里的边界条件应该是，dp[0] = 1,因为我们已经给的值必然大于 1，所以 dp[0] 属于子树情况
3. 边界，最少都有1，所以默认值是 1
4. 状态转移方程，和上面分治思路是一样的，遍历所有值作为根节点，然后取累加值
5. 时间复杂度${O(NlogN)}$,空间复杂度${O(N)}$ -- N 是树节点的个数
```javascript
/**
 * @分析 -- 动态规划
 * 1. 给定一个 n ，就是得到了一个 [1,n] 的单增数组，对于 BST 而言，给定同样的一个合规长度的数组，那么组成这个 BST 的形式是有限的
 * 2. dp[n] 表示给定 n 个有序数组下，可以拆解好的 BST 的数量 , 这里的边界条件应该是，dp[0] = 1,因为我们已经给的值必然大于 1，所以 dp[0] 属于子树情况
 * 3. 边界，最少都有1，所以默认值是 1
 * 4. 状态转移方程，和上面分治思路是一样的，遍历所有值作为根节点，然后取累加值
 * 4. 时间复杂度${O(NlogN)}$,空间复杂度${O(N)}$ -- N 是树节点的个数
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(1);
  for (let i = 1; i <= n; i++) {
    //   temp 是每个节点对应的分法值的累加
    let temp = 0;
    for (let j = 1; j <= i; j++) {
      temp += dp[j - 1] * dp[i - j];
    }
    dp[i] = temp;
  }
  return dp[n];
};

```

## [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/fen-zhi-by-jzsq_lyx-upv8/)
### 分析
1. 多个排序链表很难处理，那么两个排序好的链表合并呢？
2. 将两个有序链表合成一个，然后放进 list 继续走，最后合成一个即可
3. 用分治，如果超出 2 个链表，就拆分了处理，mergeKLists(arr) 最后得到的也是一个排序好的链表，所以每次可以分开治，然后最后 merge 治；
4. 合并两个链表的时间复杂度 ${O(N)}$，分治处理 M 个链表的复杂度为 ${O(logM)}$ 所以 ${O(NlogM)}$ ， 其中 N 是链表的长度， M 是链表的数量

```javascript
/**
 * @分析
 * 1. 多个排序链表很难处理，那么两个排序好的链表合并呢？
 * 2. 将两个有序链表合成一个，然后放进 list 继续走，最后合成一个即可
 * 3. 用分治，如果超出 2 个链表，就拆分了处理，mergeKLists(arr) 最后得到的也是一个排序好的链表，所以每次可以分开治，然后最后 merge 治；
 * 4. 合并两个链表的时间复杂度 ${O(N)}$，分治处理 M 个链表的复杂度为 ${O(logM)}$ 所以 ${O(NlogM)}$ ， 其中 N 是链表的长度， M 是链表的数量
 */
 var mergeKLists = function(lists) {
     const len  =lists.length
     // return lists.reduce((prev,cur) => mergeTwoList(prev,cur)) // 直接 api 递推即可，但是复杂度更高
    // 用分治的方式可以将 N 的复杂度降低到 logN
    if(len<1) return null
    if(len === 1) return lists[0]
    if(len === 2) return mergeTwoList(lists[0],lists[1])
    const mid = len>>1
    return mergeTwoList(mergeKLists(lists.slice(0,mid)),mergeKLists(lists.slice(mid)))
    
};

// 合并两个有序链表
function mergeTwoList (list1,list2){
    const emptyNode = new ListNode()
    let cur =emptyNode
    while(list1 && list2){
        if(list1.val<list2.val){
            cur.next= list1
            list1 = list1.next
        }else{
            cur.next= list2
            list2 = list2.next
        }
        cur = cur.next 
        cur.next = null
    }
    if(list1) cur.next = list1
    if(list2) cur.next = list2
    return emptyNode.next
}
```

## [932. 漂亮数组](https://leetcode-cn.com/problems/beautiful-array/solution/fen-zhi-jian-chi-js-shua-ti-by-jzsq_lyx-pk1u/)
### 分析
 1. 题目分解到最小的3个一组时，其实就是希望 L+R !== M*2 , 那么只要某一次取值，左侧为奇数，右侧为偶数，则 M 无论取什么数都符合要求
 2. 但是对于一层而言，将值按照奇偶分治没问题，但是如果取的都是奇数或者都是偶数呢？拿稳就有一个问题，就是在某一层取同奇同偶时，也要保证符合`漂亮`
 3. 现在有一个新的等式，就是当 L+R !== M^2 的时候，( kL+i) +(kR+i) !==(kM+i)^2
 4. 由小学数学可知，[1,2N] 个数的奇数可以由 i属于[1,N]，2*i-1 得到，偶数就是 2*i 得到
 5. 从第3，4部可以回到第 2 个问题，对于顶层单边的值，只要它下一层也按照奇偶分治，然后取值在下一层也是`一奇一偶`,那么根据 3,4 的等式,就可以得到`漂亮`的结果
 6. 一直分治到 n === 1 的时候，这个时候就只有一种 [1]，属于边界
 7. 我们是从顶层 N 往下分，分到 1结束，然后再从 1 进行合并，最后得到长度为 N 的数组，这个过程中，小的漂亮数组会被重复使用，所以可以用 map 保存下来，key 就是漂亮数组的长度 L， value 就是漂亮数组
 8. 从低到高的时候，每次取出小的漂亮数组，然后遍历 2i-1 取得左侧全奇数组， 遍历取得 2i 全偶数组，然后合并成最新的的漂亮数组
 9. 空间复杂度 ${O(N)}$, 时间复杂度 ${NlogN}$
```javascript
// 932. 漂亮数组

/**
 * @分析 -- 分治
 * 1. 题目分解到最小的3个一组时，其实就是希望 L+R !== M*2 , 那么只要某一次取值，左侧为奇数，右侧为偶数，则 M 无论取什么数都符合要求
 * 2. 但是对于一层而言，将值按照奇偶分治没问题，但是如果取的都是奇数或者都是偶数呢？拿稳就有一个问题，就是在某一层取同奇同偶时，也要保证符合`漂亮`
 * 3. 现在有一个新的等式，就是当 L+R !== M^2 的时候，( kL+i) +(kR+i) !==(kM+i)^2
 * 4. 由小学数学可知，[1,2N] 个数的奇数可以由 i属于[1,N]，2*i-1 得到，偶数就是 2*i 得到
 * 5. 从第3，4部可以回到第 2 个问题，对于顶层单边的值，只要它下一层也按照奇偶分治，然后取值在下一层也是`一奇一偶`,那么根据 3,4 的等式,就可以得到`漂亮`的结果
 * 6. 一直分治到 n === 1 的时候，这个时候就只有一种 [1]，属于边界
 * 7. 我们是从顶层 N 往下分，分到 1结束，然后再从 1 进行合并，最后得到长度为 N 的数组，这个过程中，小的漂亮数组会被重复使用，所以可以用 map 保存下来，key 就是漂亮数组的长度 L， value 就是漂亮数组
 * 8. 从低到高的时候，每次取出小的漂亮数组，然后遍历 2i-1 取得左侧全奇数组， 遍历取得 2i 全偶数组，然后合并成最新的的漂亮数组
 * 9. 空间复杂度 ${O(N)}$, 时间复杂度 ${NlogN}$
 */
var beautifulArray = function (n) {
  const map = new Map();
  map.set(1, [1]); // 基础值
  const recursion = (n) => {
    //   如果已经保存过了，直接取漂亮数组
    if (map.has(n)) return map.get(n);
    // n 的奇偶不定，所以奇数向上取整，即 n===5 时，奇数有 5+1 >> 1 个，偶数只有 5>>1 个
    const left = recursion((n + 1) >> 1).map((item) => item * 2 - 1);
    const right = recursion(n >> 1).map((item) => item * 2);
    const ret = [...left, ...right]; // 合并起来
    map.set(n, ret); // 做个保存
    return ret;
  };
  return recursion(n);
};

```