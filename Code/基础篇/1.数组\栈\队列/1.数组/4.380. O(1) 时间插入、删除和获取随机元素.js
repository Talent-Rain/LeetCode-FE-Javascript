// 380. O(1) 时间插入、删除和获取随机元素
// https://leetcode-cn.com/problems/insert-delete-getrandom-o1/


/**
 * @分析
 * 1. 增删复杂度为 O(1)，如果要保证增删时的相对位置不发生改变，用双向链表是比较合理的
 * 2. 但是这里的插入都只是简单的末尾插入，所以数组也 ok， 删除的时候也没有要求保证整个数组的值之间相对位置，所以数组也 ok； 需要注意的是，我们在增删的时候，是需要先判存的，这个时候用数组的话，得有哈希表来判断，不然遍历数组判断的话，复杂度为 ${O(n)}$
 * 3. 所以本次可以用数组，也可以用双向链表，只是链表处理比较麻烦，这里直接用数组了；
 * 4. 首先我们用 this.data 缓存插入的值，然后为了能通过 value 来直接查找到缓存数据，所以要用 valToIndex 这样的哈希表缓存 val-index 的值
 * 5. 这样我们在增删过程中，判断搜索就可以是复杂度为 ${O(1)}$ 了
 * 6. 最后根据数组长度来做一个随机下标，然后直接捕获出来即可；
 */
var RandomizedSet = function() {
    this.data = []
    this.valToIndex = new Map() // key 是插入值，value 是对应的下标
};

// 插入都是插入到最后即可
RandomizedSet.prototype.insert = function(val) {
    if(this.valToIndex.has(val)) return false
    this.data.push(val)
    this.valToIndex.set(val,this.data.length-1)
    return true
};


RandomizedSet.prototype.remove = function(val) {
    if(!this.valToIndex.has(val)) return false
    // 先判断插入的 val 所在的下标
    const index = this.valToIndex.get(val)
    if(index !== this.data.length-1) {
        // 交换值
        [this.data[this.data.length-1],this.data[index]] = [this.data[index],this.data[this.data.length-1]]
    }
    //弹出最后的值
    this.data.pop() 
    this.valToIndex.delete(val)
    this.valToIndex.set(this.data[index],index)
    return true
};


RandomizedSet.prototype.getRandom = function() {
    const random = Math.floor((Math.random() * this.data.length)) // 获取随机下标
    console.log(this.data,this.valToIndex,random)
    return this.data[random]
};