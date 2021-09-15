/*
 * @Author: your name
 * @Date: 2021-09-15 08:45:58
 * @LastEditTime: 2021-09-15 09:10:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/5.双指针/快慢指针/4.202. 快乐数.js
 */

// 202. 快乐数

var isHappy = function (n) {
    const set = new Set()
    let result
    const dfs = n => {
        let ret = 0;
        while (n) {
          ret += Math.pow(n % 10, 2);
          n = Math.floor(n / 10);
        }
        if(ret === 1)  {
            result = true
            return 
        }
        if(set.has(ret)){
            result = false
            return 
        }
        set.add(ret)
        // 迭代写法，如果用 return 就是递归的写法了
        dfs(ret);
    }
    dfs(n)
    return result

};



var isHappy = function (n) {
    function getNext(n) {
        let ret = 0;
        while (n) {
          ret += Math.pow(n % 10, 2);
          n = Math.floor(n / 10);
        }
        return ret
    }
    let s = f = n // 初始化的值都是 n
    while(f !== 1 && getNext(f) !== 1){
        s = getNext(s)
        f = getNext(getNext(f))
        if(s === f) return false
    }
    return true
}