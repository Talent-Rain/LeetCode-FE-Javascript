// 3. 无重复字符的最长子串

/**
 * @分析
 * 1. 这里求的是最长的子串，证明有很多长度不一的子串，那么就是有很多大小不一的窗口，所以属于窗口不固定的滑窗题
 * 2. 初始化 l r ，初始化一个 map 用来存放窗口里的字符的
 * 3. map 是用来做条件判断的，判断窗口扩展过程中是否和已有的窗口字符重复了，如果重复了，那么就要收缩窗口 s[r]=== s[l] 然后 l++, 
 * 4. 然后不管是否整理窗口， r 指针都会继续扩展下去，所以处理完了，需要重新加上 s[r]， 并继续走下去
 * 5. 时间复杂度 ${O(n)}$ 因为 r 指针遍历一次，走的过程中遇到重复值 ，l 指针移动，最多 l 也就遍历一次，也就是最多直走了 2n
 * 6. 空间复杂度 $(O(k))$ k 是最大的窗口size
 */
// var lengthOfLongestSubstring = function(s) {
//     const map = new Map() // 这个用来存放窗口的值
//     let l = r = 0 
//     let max = 0
//     while(r<s.length) {
//         if(map.has(s[r])){
//             // 说明窗口里的值已经出现重复了，所以需要整理窗口
//             max = Math.max(max,map.size) // 存一下大小
//             // 开始收缩窗口，找出 s[r] 同值的那个位置
//             while(s[l] !== s[r]){
//                 map.delete(s[l])
//                 l++
//             }
//             // 找到了 -- 再移除一下
//             map.delete(s[l])
//             l++
//         }
//         // 将当前 s[r] 字符存起来
//         map.set(s[r],1)
//         r++
//     }
//     // 这个时候 r 走到底了，
//     return Math.max(max,map.size)
// }


var lengthOfLongestSubstring = function(s) {
    const map = new Map() // 这个用来存放窗口出现过的值
    let l = r = 0 
    let max = 0
    while(r<s.length) {
        if(map.has(s[r]) && map.get(s[r])>=l){
            // 已经遍历过了这个值且在当前的这个窗口里
            max = Math.max(max,r-l) // 先存一下大小
           l = map.get(s[r]) +1 // 跳到重复出现字符前面去了
        }
        // 将当前 s[r] 字符存起来,并将字符的下标也存起来 -- or 更新一下罪行 s[r] 的位置
        map.set(s[r],r)
        r++
    }
    // 这个时候 r 走到底了，
    return Math.max(max,r-l)
}

console.log(lengthOfLongestSubstring("aab"))
console.log(lengthOfLongestSubstring("pwwkew"))