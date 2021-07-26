// 817. 链表组件
// https://leetcode-cn.com/problems/linked-list-components/


/**
 * @分析
 * 1. 用 map 将 G 存起来，这样比较好找
 * 2. 遍历 head，然后开始判断组件个数，使用 temp 表示临时组件的长度，len 表示 G 的剩余长度
 * 3. 当 head 遍历到 G 不存在的值 且 temp 存在时，表示一个组件完成，res++, 同时 len 的长度要减去 temp
 * 4. 如果遍历完了，还有 temp，证明最后一个组件也成型，需要+1
 * 
 * @注意
 * 1. G 是 head 节点的一个子集，但是并不一定按照顺序排列的
 * 2. 链表上的值都是唯一整型值
 */
var numComponents = function (head, G) {
    if (!head || !G.length) return 0
    let map = new Map()
    G.forEach(element => {
        map.set(element, true)
    });
    let len = G.length
    let res = 0
    let temp = 0
    while (head && len > 0) {
        if (map.has(head.val)) {
            temp++
        } else {
            if (temp) {
                res++
                len -= temp
                temp = 0
            }
        }
        head = head.next
    }
    res += temp ? 1 : 0
    return res
};