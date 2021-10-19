// 146. LRU 缓存机制 -- 最近最少使用
// https://leetcode-cn.com/problems/lru-cache/

/**
 * @分析
 * 1. 使用双向链表来表示每一个节点，这样在 get或者 put 方法之后，移动节点的时间复杂度都为 ${O(1)}$;
 * 2. 使用虚拟头和虚拟尾保证前后节点移动时的边界情况
 * 3. 每一次使用了 get 和 put，对应的节点都要移动到尾部；当 map.size === capacity 的时候，需要先移除头部的节点，然后才能在尾部添加节点
 * 4. 每一次 get, put 的时间复杂度都是 ${O(1)}$, 空间复杂度为 ${O(n)}$
 */

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
