<!--
 * @Author: your name
 * @Date: 2021-10-16 20:16:02
 * @LastEditTime: 2021-10-18 08:28:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/设计题/README.md
-->
### [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)
分析
1. 使用辅助栈缓存最小值，每当 push 一个值进来的时候，就要把这个值对应的在栈中的最小值存在 minStack 中，这样每次 pop 出去的时候，就可以直接从 minStack 中 pop 一个值出去；
2. minStack 表示当前下标下的最小值，可以跟随实际的 data 值一起 pop 出去，而不会影响最小值；
```javascript
var MinStack = function() {
    this.data = [] 
    this.minStack = []  // 用来存储一一对应下的最小值
};

MinStack.prototype.push = function(val) {
    this.data.push(val)
    const top = this.minStack[this.minStack.length-1]
    this.minStack.push(Math.min(top ?? Infinity, val))
};

MinStack.prototype.pop = function() {
    const ret = this.data.pop()
    this.minStack.pop() // 跟着一起弹出即可
    return ret
};


MinStack.prototype.top = function() {
    return this.data[this.data.length-1]
};

MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length-1]
};

```


### [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/208-shi-xian-trie-qian-zhui-shu-by-jzsq_-atfv/)
分析
1. 在实现 Trie 树的时候，我们需要考虑当前节点是否是插入的字符串的终点，用在 search 方法的判断上，所以节点就必须有 isEnd 这样一个属性
2. 考虑这里只展示 26 个小写字母，所以 children 可以是长度为 26 的数组进行缓存，那么就要有一个方法将字母转成数组的下标，方便搜索，这个时候搜索的复杂度 ${O(1)}$
3. 每次插入的字符串有可能不一致，但是他们都存在同一个 Trie 树中，所以 this.root 是一个虚拟的根节点，我们每次判断都是用 children 来进行的
4. 在插入操作中，每次判断当前的字符 w 是否在上一个节点 root 的 children 中，如果是就继续遍历，如果不是，就创建对应的节点，然后再遍历
5. 最后 start 只需要判断完全匹配的最后一个根节点 root 的 isEnd 即可；
6. 时间复杂度： 插入操作 ${O(m)}$ -- m 是插入字符的长度, startsWith 和 search 也都是  ${O(m)}$
```javascript
function TrieNode (val = null) {
    this.isEnd = false // 默认不是终点
    this.val = val;
    this.children = [];
}

// 用数组来缓存子节点，每个字母有对应的下标
function wordToIndex(s){
    return s.charCodeAt() - 'a'.charCodeAt()
}

var Trie = function() {
    this.root = new TrieNode(); //初始化根节点 -- 这个相当于是虚拟更节点，因为不确保插入的 word 的首个字母都是一样的
};

Trie.prototype.insert = function(word) {
    let root = this.root // 这一层的 root
    for(let w of word) {
        const wi = wordToIndex(w)
        if(!root.children[wi]){
            // 没有设置，则新建一个，放在对应的位置上
            root.children[wi] = new TrieNode(w)
        }
        // 如果已经存在了，那么继续搜索
        root = root.children[wi]
    }
    root.isEnd = true // 这个就是当前 word 的结束位置
};

Trie.prototype.search = function(word) {
    let root = this.root
    for(let w of word) {
        const wi = wordToIndex(w)
        if(!root.children[wi]) return false
        root = root.children[wi]
    }
    // 需要判断是否是终点
    return root.isEnd 
};

Trie.prototype.startsWith = function(prefix) {
    let root = this.root
    for(let w of word) {
        const wi = wordToIndex(w)
        if(!root.children[wi]) return false
        root = root.children[wi]
    }
    return true
};

```


### [146. LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/)
分析
1. 使用双向链表来表示每一个节点，这样在 get或者 put 方法之后，移动节点的时间复杂度都为 ${O(1)}$;
2. 使用虚拟头和虚拟尾保证前后节点移动时的边界情况
3. 每一次使用了 get 和 put，对应的节点都要移动到尾部；当 map.size === capacity 的时候，需要先移除头部的节点，然后才能在尾部添加节点
4. 每一次 get, put 的时间复杂度都是 ${O(1)}$, 空间复杂度为 ${O(n)}$
```javascript
function ListNode(key = null, val = null) {
  this.key = key;
  this.val = val;
  this.next = null;
  this.prev = null;
}

var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.emptyHead = new ListNode();
  this.emptyTail = new ListNode();
  this.emptyHead.next = this.emptyTail;
  this.emptyTail.prev = this.emptyHead;
  this.map = new Map();
};

LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    // 先移除，再移动到末尾，然后获取
    const ret = this.removeAndMoveToEnd(key);
    return ret.val;
  }
  return -1;
};

LRUCache.prototype.put = function (key, value) {
  if (!this.map.has(key)) {
    // 不存在的时候
    if (this.map.size === this.capacity) {
      // 再加上去就要超了,先删除前面一个
      let node = this.emptyHead.next;
      this.map.delete(node.key); // map 中移除
      this.emptyHead.next = node.next;
      node.next.prev = this.emptyHead;
    }
    const node = new ListNode(key, value);
    // 恢复最后的值
    this.moveToTail(node);
    this.map.set(key, node);
  } else {
    // 这里的 node 是之前的 node， 但是  put 可能改变了对应的 val 值
    const node = this.removeAndMoveToEnd(key);
    node.val = value;
  }
};

LRUCache.prototype.removeAndMoveToEnd = function (key) {
  // 已经存在了，先删除，移动到末尾就好
  let node = this.map.get(key);
  // 先移除
  node.prev.next = node.next;
  node.next.prev = node.prev;
  // 移动到后面
  this.moveToTail(node);
  return node; // 返回值
};

LRUCache.prototype.moveToTail = function (node) {
  node.prev = this.emptyTail.prev;
  node.next = this.emptyTail;
  this.emptyTail.prev.next = node;
  this.emptyTail.prev = node;
};

```