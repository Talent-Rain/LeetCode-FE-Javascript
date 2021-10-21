// 705. 设计哈希集合
// https://leetcode-cn.com/problems/design-hashset/

/**
 * @分析
 * 1. 由于 key 的大小不超过 10^6, 所以用空间换时间，直接将 key 作为数组的下标存储起来
 * 2. 这样 add,remove,containers 的时间复杂度都是 ${O(1)}$， 但是整体的空间复杂度会很高
 * 3. 真正的 hash 处理集合，不应该有那么大的空间复杂度
 */
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