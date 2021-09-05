// 904. 水果成篮 (https://leetcode-cn.com/problems/fruit-into-baskets/submissions/)

/**
 * @分析
 * 1. 审题，数组中的值代表的类型，比方说 1型水果，2型水果；给定两个篮子，也就是最多选择两种类型的水果放进篮子里，然后保证能进去的树最多，即 r-l+1 的值最大，所以属于窗口不固定的滑动窗口题目
 * 2. 用 map 作为篮子存储水果， map.size 最大应该为 2，
 * 3. 一旦 map.size 值超出 2， 证明存储超过了 2 种类型的水果，所以需要收缩 l， 将一些其他类型的果子扔掉，直到 map 中的种类恢复到两种
 */
 var totalFruit = function(fruits) {
    const map = new Map() // 篮子，大小为2，用来存储当前窗口下的水果
    let ret = 0
    let l = r =0 
    while(r < fruits.length){
        ret = Math.max(ret,r-l); // 先保存一下上一次的大小
        const rr = fruits[r]
        map.set(rr,map.get(rr)?map.get(rr)+1:1)
        // 如果超了，则需要收缩一整类的树
        while(map.size > 2){
            // 长度超了，向左收缩
            const ll = fruits[l]
            if(map.get(ll) ===  1){
                map.delete(ll)
            }else{
                map.set(ll,map.get(ll)-1)
            }
            l++ 
        }
        r++
    }
    return Math.max(ret,r-l);
};