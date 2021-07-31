<!--
 * @Author: your name
 * @Date: 2021-07-31 09:23:01
 * @LastEditTime: 2021-07-31 11:29:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/README.md
-->

# 前端就该用JS写算法 -- 树


## 正文

做事得有章法，按照那个男人的说法，总体按照难度 3:5:2 来刷，刷个300题左右就能应付大部分的面试了，我不信，所以我来了。

这个专题总共刷个 30 题差不多了，严格按照上面的比例搞起,Just hit the road;















## [1. 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/solution/wan-quan-er-cha-shu-ji-lu-jie-dian-xia-b-hcsg/)

### 基于完全二叉树的特性
1. 求宽度，盲猜用层序遍历比较合适，但是啥时候加 null 是个体面活
2. 这里有一个降难度的点 -- 该层最左和最右的非空节点，两端点间的null节点也计入长度 -- 也就是在遍历存在节点的一层时，第一个节点肯定是存在，最后一个节点也是
3. 虽然左侧节点确定了，但是右侧节点大小不确定啊，中间存在有多少个 null，后面是否存在一个节点隔开了n个 null都不确定，这个时候可以考虑把树当成是完全二叉树，然后所有的节点再带一个 pos 属性
4. 我们以 1 作为根节点 root 的 pos，左节点就是 2n, 右节点是 2n+1
5. 注意，由于节点 pos 的值是呈现指数级别上升的，即 2^k, 其中 k 是树的深度，我们又知道当 2^53 之后，精度会丢失，
6. 所以坑爹的就是，输入可以是先右树走1个节点53次，然后第 54层开始来真实值，酱紫前面 53 层的宽度都是1，从 54 层开始需要开始计算，但是这个时候，pos 已经超出 JS 的 Number 类型的计算极限了
6. 这个时候我们考虑使用 js 的新的基本类型 BigInt 作为节点 pos 的值，但是又由于数字类型和大数类型之间是不能进行运算的，所以最后求值的时候，要进行响相应的转换。

```javascript
// 662. 二叉树最大宽度
var widthOfBinaryTree = function (root) {
  const queue = [];
  queue.push([root, 1n]);
  let max = 0;
  let steps = 0,
    curDepth = 0; // 这是用来确定第一个节点的
  let leftPos = 0n; // 每一次左侧节点的位置
  while (queue.length) {
    // 层数+1
    steps++;
    // 如果还有层
    let len = queue.length;
    while (len--) {
      // 开始一层的遍历了
      const [root, pos] = queue.shift(); // 取出节点
      if (root) {
        // 只要有子节点，那么即便有一个不存在，也得放到队列中
        queue.push([root.left, 2n * pos]);
        queue.push([root.right, 2n * pos + 1n]);

        if (curDepth !== steps) {
          // 第一个节点
          curDepth = steps; // 这个时候更新一下深度
          leftPos = pos; // 左侧节点的位置
        }
        // 每一个存在的节点，都会不断进行更新
        // 由于 bigInt 和 number 是不能进行数学运算的，所以先将 bigint 转成字符串类型，然后隐式转成数字，然后进行比较
        max = Math.max(max, (pos - leftPos + 1n).toString());
      }
    }
  }

  return max;
};

```