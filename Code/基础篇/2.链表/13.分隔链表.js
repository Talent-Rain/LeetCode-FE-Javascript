// 725. 分隔链表
// https://leetcode-cn.com/problems/split-linked-list-in-parts/


/**
 * @分析 -- 暴力
 * 1. 先求出链表长度，然后分割链表
 * 2. 根据不同的情况进行分隔，如果链表走完，即 count 为 0的时候，直接返回 null 即可
 */
var splitListToParts = function (root, k) {

    let len = 0
    let cur = root
    while (cur) {
        cur = cur.next
        len++
    }
    let min = 0 // 最少有 min 个节点
    let left = 0 // 前面 left 个节点有 min+1 个节点
    if (len < k) {
        // 代表有长度为 k 的数组，前 k 个分别是单个节点的
        left = k
    } else {
        // 前 left 个节点有 min+1 个节点，剩下的有 min 个节点
        min = Math.floor(len / k)
        left = len % k
    }

    let res = []
    cur = root
    while (k--) {
        // 当前分割节点的长度为  count
        let count = min
        if (left > 0) {
            //    还处于多出来的情况
            count = min + 1
        }

        if (count === 0) {
            // 如果值为 0，这个时候 left 肯定也没了
            res.push(null)
        } else {
            let temp =  cur
            while (--count) {
                cur = cur.next
            }
            let next = cur.next
            cur.next = null
            res.push(temp)
            cur = next
            left--
        }

    }
    return res
};