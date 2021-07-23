/*
 * @Author: your name
 * @Date: 2021-07-14 09:26:56
 * @LastEditTime: 2021-07-14 10:07:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/Tree/Trie/2.677. 键值映射.js
 */
// 677. 键值映射

const TreeNode = function (key = null, value = 0) {
    this.key = key; // 当前字符
    this.value = value; // 值
    this.children = []; // 子节点数组, 其中下标表示对应字符，值表示对应的节点
  };
  
  // 字符转换下标
  function computeIndex(word) {
    return word.charCodeAt() - "a".charCodeAt();
  }
  
  var MapSum = function () {
    this.root = new TreeNode(); // 根节点啥也没有
  };
  
  // 将key字符串插入到 Trie 树中，并最后节点中的 value 设置为 val
  MapSum.prototype.insert = function (key, val) {
    let ws = this.root;
    for (let i = 0; i < key.length; i++) {
      const w = key[i];
      const wIndex = computeIndex(w);
      if (!ws.children[wIndex]) {
        ws.children[wIndex] = new TreeNode(w);
      }
      ws = ws.children[wIndex];
    }
    // 遍历完了,要将这个单词给塞进去
    ws.value = val;
  };
  
  // 获取某个节点树的所有 value 值总和
  function getAllValue(root) {
    //   如果节点没有子树，则返回 0
    if (!root.children) return 0 
    // 遍历每个子树，将所有子树的 value 和子树节点对应的总和累加起来
    return root.children.reduce(
      (pre, cur) => pre + getAllValue(cur) + cur.value,
      0
    );
  }
  
  MapSum.prototype.sum = function (prefix) {
    let ws = this.root;
    let ret = 0;
    for (let i = 0; i < prefix.length; i++) {
      const w = prefix[i];
      const wIndex = computeIndex(w);
      if (!ws.children[wIndex]) return ret; // 如果这个前缀没能走完前缀树，那么就是一个都么得
      ws = ws.children[wIndex];
    }
    // 遍历完了,继续遍历
    return getAllValue(ws) + ws.value;
  };
  