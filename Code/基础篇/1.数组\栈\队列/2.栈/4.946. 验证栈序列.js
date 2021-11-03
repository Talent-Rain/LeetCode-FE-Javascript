// 946. 验证栈序列
// https://leetcode-cn.com/problems/validate-stack-sequences/

/**
 * @分析
 * 1. 已知：两个序列的值都不相同，所以只需要遇到相同的就相互抵消即可；pushed.length === popped.length
 * 2. 使用 stack 模拟栈，只有当最后栈变回空，返回true，否则返回 false
 */
 var validateStackSequences = function(pushed, popped) {
    const stack = []
    for(let i =0;i<pushed.length;i++){
        // 这里是 stack 的栈顶元素等于 popped 的的第一个元素的时候，需要出栈操作
        while(stack.length && popped.length && stack[stack.length-1] === popped[0]) {
            stack.pop()
            popped.shift()
        }
        stack.push(pushed[i])
    }
    // push 操作结束，如果还有剩余的，必须和 popped 仙湖抵消
    while(stack.length && popped.length && stack[stack.length-1] === popped[0]) {
        stack.pop()
        popped.shift()
    }
    if(stack.length) return false
    return true
};