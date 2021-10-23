// 811. 子域名访问计数
// https://leetcode-cn.com/problems/subdomain-visit-count/description/

/**
 * @分析
 * 1. 从题目可知，可以一个 url 可以拆分成多级域名，多个 url 可能共用同一个定级域名，所以可以用 map 缓存不同类型的域名；
 * 2. 设计 map 缓存域名 -- key 是域名，value 是次数
 * 3. 然后开始将数组中的字符串拆开，进而拆分成不同的域名，然后缓存到 map 中，遍历完之后，再把 map 缓存的域名取出来，转换成字符串返回出去
 * 4. 时间复杂度 ${O(n * m)}$ n 是数组的长度，m 是每个字符串的平均长度 -- 我们在拆分字符串的时候，需要遍历字符串
 * 5. 时间复杂度 ${O(n)}$ n 是数组的长度
 */
var subdomainVisits = function(cpdomains) {
    const map = new Map() // key 是域名，value 是次数
    for(let item of cpdomains) {
        let [count,cpdomain] = item.split(' ') // 空格将次数的域名分开
        count = +count // 转成数字
        // 将 cpdomains 按照 . 拆分开来
        const cpArr = cpdomain.split('.')
        while(cpArr.length>0){
            const cp = cpArr.join('.') // 并起来
            map.set(cp,map.has(cp)?map.get(cp)+count:count)
            cpArr.shift()
        }
    }
    // 根据 map 再合并起来
    const ret = []
    for(let [key,value] of map.entries()){
        ret.push([value,key].join(' ')) // 用空格将数量和对应的域名组合成字符串，然后加在数组中
    }

    return ret
};