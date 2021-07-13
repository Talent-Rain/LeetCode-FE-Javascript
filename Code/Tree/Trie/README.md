<!--
 * @Author: your name
 * @Date: 2021-07-13 09:47:27
 * @LastEditTime: 2021-07-13 09:47:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/Tree/Trie/README.md
-->

## [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/qian-zhui-shu-trie-by-jzsq_lyx-jgt1/)
### 分析
- 树节点保存三个属性，分别是节点值 -- 字符，子节点数组，以及是否能成为完整单词的标志 isWord
- 这里将字符转成数字，作为子数组的下标，数组的值就是对应的子节点
- 插入操作就是从根节点开始遍历，遇到不存在的字符下标，就在子数组中加上，一直到遍历完成整个字符串，并在最后的节点的 isWord 属性设置为 true，保证当查询到这个节点的时候，证明是一个完整的 word
- 搜索操作也是遍历整个树，只是一旦遇到子数组搜寻不到的字符下标时，直接 return false，即便整个字符串搜索结束，也要看一下最后的节点是否是完整 word，从 isWord 判断
- 前缀搜索比搜索单纯少了最后一步，只要搜索完整个前缀字符串没问题，直接返回 true 
- 时间复杂度都是 ${O(N)}$，其中N 表示要插入，搜索的字符串的长度
```javascript
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

```