### [150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/solution/shi-yong-zhan-lai-cun-chu-shu-zhi-jin-xi-jggq/)
@分析
1. 根据逆波兰表达法的规律，可以用栈 stack 来存储数值，一旦遇到有效的算符（+，-，*，/） 的时候，从栈中提取两个数字进行运算，且最后结构没有差异性
2. 因为题目已知逆波兰算法必然可行，所以要取栈值的时候，不需要判断大小；
3. 当遇到符号的时候，我们从栈中取两个值，拼成一个表达式，然后用 eval 函数去执行
4. 当第二个参数是负数，且符号为 `-` 的时候，eval 函数无法处理,所以需要特殊处理一下（JS中的 eval 函数）
5. 需要注意的是，除数只取整数部分，所以要区分正负数的取整 
```javascript

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
```


### [1381. 设计一个支持增量操作的栈](https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/)
分析
1. 这里的 push, pop 都是很典型的栈的操作
2. increment 操作属于一个增值功能，如果直接用 js 的数组处理，可以直接在第一个加到第 k 个，那么就破坏了题目说的栈的结构了，所以在操作的时候，我们也应该只按照栈的特点去设计
3. 所以我们加一个临时栈来接收多出来的数值，然后把 k 个值加上 val 之后继续扔到临时栈，最后将临时栈翻转回原来的栈中
4. 整个过程中都只用到了出栈操作和入栈操作，时间复杂度是 ${O(n)}$, 用到了临时栈，所以空间复杂度是 ${O(n)}$
```javascript

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

```


### [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)
分析
1. 使用栈来存储数字和字母，按照题目已知的规律进行解码
2. 由于中括号中只能是倍加的字母字符串，所以 ‘]’ 字符是启动编译的起点， ‘[’ 字符是字母字符串的截止点
3. 然后开始遍历整个字符串 s, 对于普通的非 ']' 字符面都是直接存入 stack 中
4. 一旦遇到 ']'， 开启编码，不断从栈顶找 '[', 拼接成字符串 str
5. 找到 '[' 后，得到 str，然后要得到重复的倍数 k，这个时候也是不断找到第一个字母字符，由于只存在数字和字母，符号字符，所以用 Number 转成数字类型，那些不是 NaN 的都是数字，然后合成倍数 k
6. 然后用 str 和 k 生成新的解码后的字符 str，然后 push到栈中
7. 不断重复操作，最后栈中得到的就是编码好的字符串端，最后合并起来就好
8. 时间复杂度:${O(n)}$, 空间复杂度 ${O(n)}$
```javascript

 var decodeString = function(s) {
    const stack =  []
    for(let ss of s) {
        if(ss === ']') {
            // 只要是 ], 才启动编码
            let str = ''
            while(stack[stack.length-1]!== '['){
                // 只有到了 [, 才是字母字符串的截止位置
                str=stack.pop()+str 
            }
            stack.pop() // 弹出 '['
            // 已经得到了字母字符串，然后取倍数 k
            let k = ''
            while(!Number.isNaN(Number(stack[stack.length-1]))) {
                // 只要还是数值，那就是倍数 k 的值
                k = stack.pop()+k
            }
            str = str.repeat(k)
            stack.push(str)
            continue
        }
        // 正常就是这么加上字符串
        stack.push(ss)
    }
    // 最后栈中得到的都是字符串了，拼接起来就好
    return stack.reduce((pre,cur) => pre+cur,'')
};
```