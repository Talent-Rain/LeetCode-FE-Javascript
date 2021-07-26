// 面试题 02.05. 链表求和
// https://leetcode-cn.com/problems/sum-lists-lcci/

/**
 * @分析
 * 1. 传入传出都是链表，当然可以转成数组等，处理完再换回来，但是这样就没意思了。
 * 
 * @注意
 * 1. 个位在首字母
 */
var addTwoNumbers = function (l1, l2) {
    let emptyNode = current = new ListNode()
    let addNum = 0 // 是否需要进位
    while (l1 && l2) {
        let temp = l1.val + l2.val + addNum
        if (temp >= 10) {
            temp %= 10
            addNum = 1
        } else {
            addNum = 0
        }
        current.next = new ListNode(temp)
        current = current.next
        l1 = l1.next
        l2 = l2.next
    }
    let l3 = l1 || l2 //剩下的那个链表
    while (addNum) {
        // 如果还有进位，那么必须处理到每位为止
        if (!l3) {
            // l1,l2 已经结束
            current.next = new ListNode(1)
            return emptyNode.next
        }
        let temp = l3.val + addNum
        if (temp >= 10) {
            temp %= 10
            addNum = 1
        } else {
            addNum = 0
        }
        current.next = new ListNode(temp)
        current = current.next
        l3 = l3.next
    }
    // 当有一个走完了，剩下的直接全部拼接起来就可以了
    current.next = l3
    return emptyNode.next
};