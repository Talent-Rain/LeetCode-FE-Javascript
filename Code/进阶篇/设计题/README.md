<!--
 * @Author: your name
 * @Date: 2021-10-16 20:16:02
 * @LastEditTime: 2021-10-20 14:38:07
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


### [460. LFU 缓存 -- 最不经常使用缓存](https://leetcode-cn.com/problems/lfu-cache/solution/lfu-huan-cun-javascript-by-jzsq_lyx-ad68/)
分析
1. 缓存 freqMap, key 是频率， value 是这个频率下的双向链表；
2. 缓存 nodeMap, key 就是 put 进来的 key, value 就是双向链表的 node 节点
3. 这里之所以用 freqMap 缓存相同频率链表，是为了能够在缓存 capacity 超了的时候，快速找到最小频率 minFreq 的链表，然后将频率最小的这个链表中最不常用的节点（链表头 -- 每次都是往链表后面插入的，所以同一频率下，最早加入的就是链表头节点了）
4. 这里需要构建双向链表 DLinkList 和双向链表节点 Node
5. 当我们真实启动 LFU 缓存的时候，它至少需要一下属性, capacity 内存大小，size 使用了的大小, minFreq 缓存中的最小频率，然后就是 nodeMap 和 freqMap

LFU 的操作 -- get 获取
1. 当我们在执行缓存 get 操作的时，我们需要判断 nodeMap 中是否已经缓存了这个节点，如果没有，直接返回 -1，如果有，则取出这个节点 node
2. 由于 node 节点执行了 get 操作，所以需要对这个节点进行`升频操作`,就是提升这个节点已经使用的频率

LFU 的辅助函数 -- insFreq 升频操作
1. 入参是需要提升频率的的节点 node， 我们先获取到它的频率 freq, 然后从 freqMap 中取出这个节点当前存在的链表 oldLinklist；
2. 由于这个节点需要提升频率，所以就需要在 oldLinklist 中移除；
3. 移除之后我们需要考虑这个这个节点是不是缓存中最低频链表中的唯一一个节点，如果是，那么还需要为整个 LFU 缓存提升 minFreq
4. 处理完旧的操作后，开始提升频率，首先将 node.freq +1, 然后找出升频后的链表 newLinklist，然后插入 node 节点；或者新建一个双向链表，插入 node 节点，然后再更新一下 freqMap;

LFU 的操作 -- put 获取
1. 先判断插入的节点是否已经存在，如果已经存在，更新一下 node 的值，然后对节点进行`升频操作`即可
2. 如果还没插入，则先要判断缓存是否已经满了（this.size === this.capacity）
            console.log(minFreqDLinkList,this.freqMap.get(2))
3. 如果内存已经满了，就需要先根据缓存的最新频率 minFreq 找出对应的链表 minFreqDLinkList， 干掉这个链表的真实链表头节点 minFreqDLinkList.head.next, 同时也要在 nodeMap 中进行删除， 对应的缓存可以降下来
4. 然后开始新节点的插入，先创建新节点 newNode, 先创建的频率都是 1， 所以超出频率是 1 的链表，或者创建一个，然后将新节点插入进行，如果是新链表，就需要更新一下 freqMap;
5. 最后还需要更新一下 minFreq 为 1，this.size 加一下

```javascript
/**
 * @双向链表节点
 */
 function Node(key,value) {
    this.key = key
    this.value = value
    this.freq = 1; // 缓存当前节点的操作频率，初始创建的时候就是 1 了
    this.prev = null 
    this.next = null
}

/**
 * @定义一个双向链表
 * 1. removeNode: 在链表中移除输入的某一个节点
 * 2. appendNode: 在链表尾插入一个节点 node
 * 3. 需要注意的是，这个双向链表是一个具有虚拟守卫的链表，所以获取真实头节点为 this.head.next, 获取真实尾节点为 this.tail.prev
 */
function DLinkList(){
    this.head = new Node()
    this.tail = new Node()
    this.head.next = this.tail
    this.tail.prev = this.head
}
// 
DLinkList.prototype.removeNode = function(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
}
DLinkList.prototype.appendNode = function(node) {
    node.next = this.tail
    node.prev = this.tail.prev
    this.tail.prev.next = node
    this.tail.prev = node
}


var LFUCache = function(capacity) {
    this.capacity = capacity
    this.size  = 0 // 这个是链表的长度，最大不超过 capacity
    this.minFreq = 0 // 最少使用频率
    this.nodeMap = new Map()  
    this.freqMap = new Map() // 缓存频率的双向链表
};

LFUCache.prototype.get = function(key) {
    if(!this.nodeMap.has(key)){
        return -1
    }
    const node = this.nodeMap.get(key)
    // 将该节点的频率增加一下
    this.insFreq(node)
    return node.value
};

LFUCache.prototype.put = function(key, value) {
    if(this.capacity === 0 ){
        return 
    }

    const node = this.nodeMap.get(key)
    if(node) {
        // 如果已经存在这个节点，那么直接增加频率就好
        node.value = value
        this.insFreq(node)
    }else{
        // 如果已经超出了缓存
        if(this.size === this.capacity){
            // 获取最小频率的双向链表
            const minFreqDLinkList =this.freqMap.get(this.minFreq)
            console.log(minFreqDLinkList,this.freqMap.get(2))
            // 干掉第一个
            this.nodeMap.delete(minFreqDLinkList.head.next.key)
            minFreqDLinkList.removeNode(minFreqDLinkList.head.next)
            this.size--
        }
        // 然后给新节点做处理
        const newNode = new Node(key,value)
        this.nodeMap.set(key,newNode)
        // 超出频率为 1 的双向链表来处理
        if(this.freqMap.has(1)){
            const newLinklist = this.freqMap.get(1)
            newLinklist.appendNode(newNode)
        }else{
            // 如果没有这个频率的链表，创建一个
            const newLinklist = new DLinkList()
            newLinklist.appendNode(newNode)
            this.freqMap.set(1,newLinklist)
        }
        this.size++
        this.minFreq = 1 //这个是最小的最小频率
    }
};

/**
 * @分析 -- 增加 node 节点的频率
 * 1. 从原来的频率双线链表中取出来，加1之后再插入到新的双向链表中
 */
LFUCache.prototype.insFreq = function(node) {
    let freq = node.freq
    // 获取旧频率的双向链表
    const oldLinklist = this.freqMap.get(freq)
    // 从链表中移除 node 这个节点
    oldLinklist.removeNode(node)
    // 移除之后需要考虑是否会更新最小频率的值，需要满足一下情况
    // 1. 如果最小频率就是旧频率
    // 2. 旧频率链表现在没有节点了
    // 那么就需要更新最小频率了
    if(freq === this.minFreq && oldLinklist.head.next === oldLinklist.tail){
        this.minFreq = freq+1
    }

    // 继续往下处理
    freq++
    node.freq = freq
    if(this.freqMap.has(freq)){
        // 找出新的频率的链表，如果存在的话
        const newLinklist = this.freqMap.get(freq)
        // 在链表添加上一个节点
        newLinklist.appendNode(node)
    }else{
        // 新建一个
        const newLinklist = new DLinkList()
        newLinklist.appendNode(node)
        this.freqMap.set(freq,newLinklist)
    }
}
```

### [705. 设计哈希集合](https://leetcode-cn.com/problems/design-hashset/)
分析
1. 由于 key 的大小不超过 10^6, 所以用空间换时间，直接将 key 作为数组的下标存储起来
2. 这样 add,remove,containers 的时间复杂度都是 ${O(1)}$， 但是整体的空间复杂度会很高
3. 真正的 hash 处理集合，不应该有那么大的空间复杂度
```javascript
 var MyHashSet = function() {
    this.map = []
};

MyHashSet.prototype.add = function(key) {
    this.map[key] = true 
};

MyHashSet.prototype.remove = function(key) {
    this.map[key] = false // 设置为 undefined , 原始值也是这样的
};

MyHashSet.prototype.contains = function(key) {
    return !!this.map[key]
};
```

### [706. 设计哈希映射](https://leetcode-cn.com/problems/design-hashmap/)
分析
1. 和 `705. 设计哈希集合` 设计类型，直接用数组缓存 put 进来的值
2. 时间复杂度为 ${O(1)}$, 空间复杂度 ${O(n)}$
```javascript
var MyHashMap = function() {
    this.map = []
};


MyHashMap.prototype.put = function(key, value) {
    this.map[key] = value
};

MyHashMap.prototype.get = function(key) {
    return this.map[key] !== undefined ? this.map[key] : -1
};

MyHashMap.prototype.remove = function(key) {
    this.map[key] = undefined
};
```


