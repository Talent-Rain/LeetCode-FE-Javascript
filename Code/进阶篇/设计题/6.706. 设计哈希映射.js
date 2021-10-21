// 706. 设计哈希映射
// https://leetcode-cn.com/problems/design-hashmap/

/**
 * @分析
 * 1. 和 `705. 设计哈希集合` 设计类型，直接用数组缓存 put 进来的值
 * 2. 时间复杂度为 ${O(1)}$, 空间复杂度 ${O(n)}$
 */
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


