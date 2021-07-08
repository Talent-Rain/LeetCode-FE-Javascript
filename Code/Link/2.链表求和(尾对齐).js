// 两数相加2
// https://leetcode-cn.com/problems/add-two-numbers-ii/


/**
@分析
1. 同样是两个链表表示的数相加，但是这里是正向的
2. 所以一开始的时候长的那个链表是可以直接获取到的
3. 等两个链表都合一的时候，再做进位处理。
4. 由于这边进位是从后往前走的，所以如果一开始就用链表存储，当存在进位的时候，就需要往前推，要不用双指针链表，要不只能用数组存储，最后在变换，这里直接用数组即可
 */
var addTwoNumbers = function (l1, l2) {

    let l1_1 = l1, l2_2 = l2 // 因为需要快慢指针求得多出来那一段
    const res = []
    let emptyNode = current = new ListNode()
    while (l1_1 && l2_2) {
        l1_1 = l1_1.next
        l2_2 = l2_2.next
    }
    while (l1_1) {
        // l1 比较长，正式开始前可以先走 l1
        res.push(l1.val)
        l1 = l1.next
        l1_1 = l1_1.next
    }
    while (l2_2) {
        // l2 比较长，正式开始前可以先走 l2
        res.push(l2.val)
        l2 = l2.next
        l2_2 = l2_2.next
    }

    // 这个时候 l1,l2 已经一样长了
    let addNum = 0
    console.log(res,l1,l2)
    while (l1 && l2) {
        let temp = l1.val + l2.val + addNum
        if (temp >= 10) {
            temp %= 10
            addNum = 1
        } else {
            addNum = 0
        }
        let index = res.length - 1 // 求的是上一个下标
        while (addNum && index>=0) {
            res[index] += 1
            if (res[index] >= 10) {
                res[index] = 0
                addNum = 1
            } else {
                addNum = 0  // 如果没有，那么循环也就结束了
            }
            
            index--
        }
        if(addNum){
            // 证明遍历完了 res，还有 addNum，所以需要在前面 +1 了
            res.unshift(1)
        }
        res.push(temp)
        l1 = l1.next
        l2 = l2.next
    }

    // 走完了
     res.reduce((prev,cur) =>{
        prev.next =new ListNode(cur)
        prev = prev.next
        return prev
    },current)

    return emptyNode.next
}