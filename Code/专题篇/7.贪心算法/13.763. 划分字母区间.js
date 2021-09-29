// 763. 划分字母区间
// https://leetcode-cn.com/problems/partition-labels/

/**
 * @分析
 * 1. 题目限制条件1：相同的字符只能存在于同一个字符串片段；限制条件2：尽可能多的切分字符串片段
 * 2. 所以我们先用 map 缓存每个字符最后出现的下标值，那么当我的字符串中存在这个字符，那么最少要走到它的尽头下标
 * 3. 相当于开启了一个不定长窗口，然后在这个窗口遍历过程，判断窗口的最长值是否需要扩展，当窗口遍历完成后，记录窗口的长度，然后执行下一个窗口
 * 4. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var partitionLabels = function(s) {
    const map = new Map() // 记录字符和最后一个字符对应的下标
    for(let i = 0;i<s.length;i++){
        const ss = s[i]
        map.set(ss,i)
    }
    console.log(map)
    let ret = []
    let start = 0
    // 现在尽可能短的获取片段
    while(start<s.length){
        let temp = start // 起始值
        let end = map.get(s[start]) //第一个字母的最后一个下标

        while(start<=end){
            if(map.get(s[start])>end){
                end = map.get(s[start]) // 将 end 变长
            }
            start++
        }
        // 抛出一轮了
        ret.push(start-temp)
    }
    return ret
};

console.log(partitionLabels('ababcbacadefegdehijhklij'))