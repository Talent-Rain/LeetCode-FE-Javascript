/*
 * @Author: your name
 * @Date: 2021-08-03 08:06:36
 * @LastEditTime: 2021-08-04 21:00:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/3.树/困难题 -- 6/2.剑指 Offer 37. 序列化二叉树.js
 */

/**
 * @分析 -- 序列化 -- 节点转成字符串
 * 1. 我们主观上看一个反序列化的数组或者字符串的时候，也是从上到下，从左到右进行匹配，所以我们再做序列化的时候，就直接使用的 bfs 了
 */
var serialize = function (root) {
  if (!root) return "";
  let ret = "";
  const queue = [];
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    let isNull = true; // 确定一下这一层是不是全是 null，如果是,那么就要结束了
    let str = "";
    while (len--) {
      const root = queue.shift();
      if (!root) {
        // 因为在反序列化的时候，你可不知道当前一层对应的节点的位置在哪里，所以只能用 null 来做占位符了
        str += "null,";
      } else {
        isNull = false;
        str += root.val + ",";
        queue.push(root.left);
        queue.push(root.right);
      }
    }
    // 一层遍历完了
    if (isNull) {
      // 这一层都是 null，所以结束了
      return ret;
    } else {
      ret += str; // 将字符串加上
    }
  }
};

/**
 * @分析 -- 反序列化 -- 字符串转成节点
 */
 var deserialize = function (data) {
  if(!data) return null // 空节点
  const nodes = data.split(',') // 切割成数组
  const root = new TreeNode(nodes[0]); //根节点
  const queue = [] // 队列，用来存储每一层的节点；
  queue.push(root)

  let index = 0; // 当前节点的下标
  while(index < nodes.length - 2){
    const root = queue.shift()
    const lv = nodes[index+1]
    const rv = nodes[index+2]
    if(lv!== 'null') {
      const lnode = new TreeNode(lv)
      root.left = lnode
      queue.push(lnode)
    }
    if(rv!== 'null') {
      const rnode = new TreeNode(rv)
      root.right = rnode
      queue.push(rnode)
    }
    index +=2
  }
 
  return root

};
