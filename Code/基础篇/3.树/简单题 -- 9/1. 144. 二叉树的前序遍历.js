// 144. 二叉树的前序遍历

/**
 * @分析 -- 递归
 */
var preorderTraversal = function (root) {
  const ret = [];
  const recursion = (root) => {
    if (!root) return;
    ret.push(root.val);
    recursion(root.left);
    recursion(root.right);
  };
  recursion(root);
  return ret;
};

/**
 * @分析 -- 迭代 -- 双色标记法
 * 1. 使用颜色标记节点状态，新节点为白色，已经访问的节点为灰色 -- 可以用数字或者其他任意标签标示
 * 2. 如果遇到的节点是白色，则标记为灰色，然后将右节点，自身，左节点一次入栈 -- 中序遍历
 * 3. 如果遇到的节点是灰色的，则将节点输出
 * 4. 注意这里是用 stack 栈来存储的，所以是后进先出，这里是前序遍历，中 - 左  - 右 ，那么在插入栈的时候要反过来 右 - 左 - 中
 */
var preorderTraversal = function (root) {
  const ret = [];
  const stack = [];
  stack.push([root, 0]); // 0 是白色未处理的，1 是灰色处理过的
  while (stack.length) {
    const [root, color] = stack.pop();
    if (root) {
      if (color === 0) {
        // 遇到白球，则插入 -- 前序
        stack.push([root.right, 0]);
        stack.push([root.left, 0]);
        stack.push([root, 1]);
      } else {
        // 遇到灰球，则收网
        ret.push(root.val);
      }
    }
  }
  return ret;
};
