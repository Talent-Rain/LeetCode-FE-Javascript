/*
 * @Author: your name
 * @Date: 2021-07-31 09:31:24
 * @LastEditTime: 2021-07-31 10:32:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/1.662. 二叉树最大宽度.js
 */

// 662. 二叉树最大宽度

/**
 * @分析
 * 1. 求宽度，盲猜用层序遍历比较合适，但是啥时候加 null 是个体面活
 * 2. 这里有一个降难度的点 -- 该层最左和最右的非空节点，两端点间的null节点也计入长度 -- 也就是在遍历存在节点的一层时，第一个节点肯定是存在，最后一个节点也是
 * 3. 虽然左侧节点确定了，但是右侧节点大小不确定啊，中间存在有多少个 null，后面是否存在一个节点隔开了n个 null都不确定，这个时候可以考虑把树当成是完全二叉树，然后所有的节点再带一个 pos 属性
 * 4. 我们以 1 作为根节点 root 的 pos，左节点就是 2n, 右节点是 2n+1
 * 5. 注意，由于节点 pos 的值是呈现指数级别上升的，即 2^k, 其中 k 是树的深度，而在 JS 中，最大有效值是 2^31 - 1 ， 也就是说如果只要给出的树深度超过了31，那么 pos 这个值就没法计算了
 * 6. 这个时候我们考虑使用 js 的新的基本类型 BigInt 作为节点 pos 的值，但是又由于数字类型和大数类型之间是不能进行运算的，所以最后求值的时候，要进行响相应的转换。
 */
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
