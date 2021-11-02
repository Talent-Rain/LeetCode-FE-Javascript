// 1381. 设计一个支持增量操作的栈
// https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/

/**
 * @分析
 * 1. 这里的 push, pop 都是很典型的栈的操作
 * 2. increment 操作属于一个增值功能，如果直接用 js 的数组处理，可以直接在第一个加到第 k 个，那么就破坏了题目说的栈的结构了，所以在操作的时候，我们也应该只按照栈的特点去设计
 * 3. 所以我们加一个临时栈来接收多出来的数值，然后把 k 个值加上 val 之后继续扔到临时栈，最后将临时栈翻转回原来的栈中
 * 4. 整个过程中都只用到了出栈操作和入栈操作，时间复杂度是 ${O(n)}$, 用到了临时栈，所以空间复杂度是 ${O(n)}$
 */
 var CustomStack = function(maxSize) {
    this.stack = []
    this.maxSize =  maxSize
};

CustomStack.prototype.push = function(x) {
    if(this.stack.length<this.maxSize){
        this.stack.push(x)
    }
};

CustomStack.prototype.pop = function() {
    if(this.stack.length === 0) return -1
    return this.stack.pop()
};

/**
 * @分析
 * 1. 由于这里是用数组模拟栈，所以我们不能用数组的方法处理，必须要以栈的特点(LIFO)来处理
 */
CustomStack.prototype.increment = function(k, val) {
    const tempStack = [] // 找一个临时栈来缓存多出的栈顶值

    while(this.stack.length>k) {
        tempStack.push(this.stack.pop())
    }

    // 这个时候整个栈的长度小于等于 k 了
    // 但是栈一般就只有出栈和入栈，所以还是得用临时栈接收一下
    while(this.stack.length>0) {
        tempStack.push(this.stack.pop()+val)
    }

    // 现在把临时栈的值弄回真实栈中即可
    while(tempStack.length>0){
        this.stack.push(tempStack.pop())
    }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */