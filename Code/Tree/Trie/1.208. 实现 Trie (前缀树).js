/*
 * @Author: your name
 * @Date: 2021-07-13 08:53:38
 * @LastEditTime: 2021-07-13 09:39:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/Tree/1.208. 实现 Trie (前缀树).js
 */
// 208. 实现 Trie (前缀树)

// 节点函数
const TreeNode = function (value = null) {
  this.value = value; // 当前值
  this.children = []; // 子节点数组, 其中下标表示对应字符，值表示对应的节点
  this.isWord = false; // 判断当前节点是否是一个可以成为 word 的节点
};

// 字符转换下标
function computeIndex(word) {
  return word.charCodeAt() - "a".charCodeAt();
}

var Trie = function () {
  this.root = new TreeNode(); // 初始化根节点
};

Trie.prototype.insert = function (word) {
  let ws = this.root;
  for (let i = 0; i < word.length; i++) {
    const w = computeIndex(word[i]);
    if (!ws.children[w]) {
      // 不存在，就加进去
      ws.children[w] = new TreeNode(word[i]);
    }
    // 继续走下一层
    ws = ws.children[w];
  }
  ws.isWord = true; //走到最后一个节点，将 isWord 设置为 true，证明走到这里的就是一个 word
  console.log(ws);
};

Trie.prototype.search = function (word) {
  let ws = this.root;
  for (let i = 0; i < word.length; i++) {
    const w = computeIndex(word[i]);
    if (!ws.children[w]) return false; // 如果在 children 中每找到，直接返回 false 了
    ws = ws.children[w];
  }
  // 走完了，还要判断一下最后这个节点是不是一个 word
  return ws.isWord;
};

// 判断前缀比判断整个 word 要少一步判断 word
Trie.prototype.startsWith = function (prefix) {
  let ws = this.root;
  for (let i = 0; i < prefix.length; i++) {
    const w = computeIndex(prefix[i]);
    if (!ws.children[w]) return false; // 如果在 children 中每找到，直接返回 false 了
    ws = ws.children[w];
  }
  // 走完了，就是前缀
  return true;
};
