// 460. LFU 缓存 -- Least Frequently Used 最不经常使用缓存
// https://leetcode-cn.com/problems/lfu-cache/

/**
 * @分析
 * 1. 缓存 freqMap, key 是频率， value 是这个频率下的双向链表；
 * 2. 缓存 nodeMap, key 就是 put 进来的 key, value 就是双向链表的 node 节点
 * 3. 这里之所以用 freqMap 缓存相同频率链表，是为了能够在缓存 capacity 超了的时候，快速找到最小频率 minFreq 的链表，然后将频率最小的这个链表中最不常用的节点（链表头 -- 每次都是往链表后面插入的，所以同一频率下，最早加入的就是链表头节点了）
 * 4. 这里需要构建双向链表 DLinkList 和双向链表节点 Node
 * 5. 当我们真实启动 LFU 缓存的时候，它至少需要一下属性, capacity 内存大小，size 使用了的大小, minFreq 缓存中的最小频率，然后就是 nodeMap 和 freqMap
 */

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

    if(this.nodeMap.has(key)) {
        // 如果已经存在这个节点，那么直接增加频率就好
        const node = this.nodeMap.get(key)
        node.value = value
        this.insFreq(node)
    }else{
        // 如果已经超出了缓存
        if(this.size === this.capacity){
            // 获取最小频率的双向链表
            const minFreqDLinkList =this.freqMap.get(this.minFreq)
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