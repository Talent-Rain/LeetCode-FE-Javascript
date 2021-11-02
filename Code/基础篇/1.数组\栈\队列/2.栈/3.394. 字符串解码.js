// 394. 字符串解码
// https://leetcode-cn.com/problems/decode-string/

/**
 * @分析
 * 1. 使用栈来存储数字和字母，按照题目已知的规律进行解码
 * 2. 由于中括号中只能是倍加的字母字符串，所以 ‘]’ 字符是启动编译的起点， ‘[’ 字符是字母字符串的截止点
 * 3. 然后开始遍历整个字符串 s, 对于普通的非 ']' 字符面都是直接存入 stack 中
 * 4. 一旦遇到 ']'， 开启编码，不断从栈顶找 '[', 拼接成字符串 str
 * 5. 找到 '[' 后，得到 str，然后要得到重复的倍数 k，这个时候也是不断找到第一个字母字符，由于只存在数字和字母，符号字符，所以用 Number 转成数字类型，那些不是 NaN 的都是数字，然后合成倍数 k
 * 6. 然后用 str 和 k 生成新的解码后的字符 str，然后 push到栈中
 * 7. 不断重复操作，最后栈中得到的就是编码好的字符串端，最后合并起来就好
 * 8. 时间复杂度:${O(n)}$, 空间复杂度 ${O(n)}$
 */
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