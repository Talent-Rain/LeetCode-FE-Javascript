// 232. 用栈实现队列
// https://leetcode-cn.com/problems/implement-queue-using-stacks/

var MyQueue = function() {
    this.queue = []
    this.tempStack = []
    this.size = 0
};

MyQueue.prototype.push = function(x) {
    this.queue.push(x) // 做为一个栈，本身就是可以在栈尾加入值
    this.size++
};



MyQueue.prototype.pop = function() {
    if(!this.size) return null // 如果没有，就弹出没有
    //转移到 tempStack 中
    while(this.queue.length){
        this.tempStack.push(this.queue.pop())
    }
    // 弹出一个
    const ret = this.tempStack.pop()
    this.size--
    while(this.tempStack.length){
        this.queue.push(this.tempStack.pop())
    }
    return ret
};

MyQueue.prototype.peek = function() {
    if(!this.size) return null // 如果没有，就弹出没有
    //转移到 tempStack 中
    while(this.queue.length){
        this.tempStack.push(this.queue.pop())
    }
    // 弹出一个
    const ret = this.tempStack[this.size-1]
    while(this.tempStack.length){
        this.queue.push(this.tempStack.pop())
    }
    return ret
};

MyQueue.prototype.empty = function() {
    return this.size === 0
};
