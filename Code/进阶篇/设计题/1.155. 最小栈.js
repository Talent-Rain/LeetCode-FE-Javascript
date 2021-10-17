
/**
 * @分析
 * 1. 使用辅助栈缓存最小值，每当 push 一个值进来的时候，就要把这个值对应的在栈中的最小值存在 minStack 中，这样每次 pop 出去的时候，就可以直接从 minStack 中 pop 一个值出去；
 * 2. minStack 表示当前下标下的最小值，可以跟随实际的 data 值一起 pop 出去，而不会影响最小值；
 */
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
