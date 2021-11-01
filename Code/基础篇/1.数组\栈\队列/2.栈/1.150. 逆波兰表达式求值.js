// 150. 逆波兰表达式求值
// https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/

/**
 * @分析
 * 1. 根据逆波兰表达法的规律，可以用栈 stack 来存储数值，一旦遇到有效的算符（+，-，*，/） 的时候，从栈中提取两个数字进行运算，且最后结构没有差异性
 * 2. 因为题目已知逆波兰算法必然可行，所以要取栈值的时候，不需要判断大小；
 * 3. 当遇到符号的时候，我们从栈中取两个值，拼成一个表达式，然后用 eval 函数去执行
 * 4. 当第二个参数是负数，且符号为 `-` 的时候，eval 函数无法处理,所以需要特殊处理一下（JS中的 eval 函数）
 * 5. 需要注意的是，除数只取整数部分，所以要区分正负数的取整 
 */
 var evalRPN = function(tokens) {
    const valid = new Map([["+",true],["-",true],["*",true],["/",true]])
    const stack = []
    for(let token of tokens) {
        if(valid.has(token)) {
            const second = stack.pop()
            const first = stack.pop()
            let target
            if(second<0 && token === '-') {
                    target = eval(`${Number(first)}+${-Number(second)}`)
            }else {
             target = eval(`${Number(first)}${token}${Number(second)}`)
            }
            // 除数只取整数部分，所以要区分正负数的取整
            stack.push(target<0?Math.ceil(target):Math.floor(target))
        }else{
            stack.push(token)
        }
    }
    return stack.pop()
};