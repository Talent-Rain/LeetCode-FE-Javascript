/*
 * @Author: your name
 * @Date: 2021-08-13 09:28:09
 * @LastEditTime: 2021-08-13 20:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/13.725. 分隔链表.js
 */

// 725. 分隔链表

/**
 * @分析
 * 1. 两个关键点，每一个部分尽可能平均，前面的链表长度大于后面的链表长度
 * 2. 直接计算出链表长度，取除数可以得到最短长度 n，取余可以知道前面 m 个链表的长度要为 n+1
 * 3. 再一次遍历链表，使用读写指针分割好，保存到数组中
 */
var splitListToParts = function(head, k) {
    if(!head) return new Array(k).fill(null) // 没有节点也要切，只是切成 k 份的 null
    let emptyNode = new ListNode
    emptyNode.next = head
    let temp = head
    let len = 0
    while(temp){
        len++;
        temp =temp.next
    }
    const n = Math.floor(len/k)
    let m = len % k // 前 m 个链表取 n+1 个值
    let write = read = head 
    let ret = []
    let other = k - m
    while(m--){
        let count = 0
        //前 m 个值,最少都还有一个值
        while(count < n){
            read = read.next
            count++
        } 
        // 此时 read 指针在切割指针的位置
        const next = read.next
        read.next = null //切割
    console.log(read,write,next)
        ret.push(write)
        write = next
        read = next
    }
    console.log(other)
    while(other --){
        if(n === 0) {
            ret.push(null)
        }else{
            let count = 0
            while(count < n-1){
                read = read.next
                count++
            } 
            // 此时 read 指针在切割指针的位置
            const next = read.next
            read.next = null //切割
            ret.push(write)
            write = next
            read = next
        }
    }
    return ret

};