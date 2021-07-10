/*
 * @Author: your name
 * @Date: 2021-07-09 08:00:16
 * @LastEditTime: 2021-07-09 08:43:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/贪心算法/2.23. 合并K个升序链表.js
 */

/**
 * @分析
 * 1. 多个排序链表很难处理，那么两个排序好的链表合并呢？
 * 2. 将两个有序链表合成一个，然后放进 list 继续走，最后合成一个即可
 * 3. 用分治，如果超出 2 个链表，就拆分了处理，mergeKLists(arr) 最后得到的也是一个排序好的链表，所以每次可以分开治，然后最后 merge 治；
 * 4. 合并两个链表的时间复杂度 ${O(N)}$，分治处理 M 个链表的复杂度为 ${O(logM)}$ 所以 ${O(NlogM)}$ ， 其中 N 是链表的长度， M 是链表的数量
 */
 var mergeKLists = function(lists) {
     const len  =lists.length
     // return lists.reduce((prev,cur) => mergeTwoList(prev,cur)) // 直接 api 递推即可，但是复杂度更高
    // 用分治的方式可以将 N 的复杂度降低到 logN
    if(len<1) return null
    if(len === 1) return lists[0]
    if(len === 2) return mergeTwoList(lists[0],lists[1])
    const mid = len>>1
    return mergeTwoList(mergeKLists(lists.slice(0,mid)),mergeKLists(lists.slice(mid)))
    
};

// 合并两个有序链表
function mergeTwoList (list1,list2){
    const emptyNode = new ListNode()
    let cur =emptyNode
    while(list1 && list2){
        if(list1.val<list2.val){
            cur.next= list1
            list1 = list1.next
        }else{
            cur.next= list2
            list2 = list2.next
        }
        cur = cur.next 
        cur.next = null
    }
    if(list1) cur.next = list1
    if(list2) cur.next = list2
    return emptyNode.next
}