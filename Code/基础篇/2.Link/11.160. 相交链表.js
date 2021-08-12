/*
 * @Author: your name
 * @Date: 2021-08-12 09:16:03
 * @LastEditTime: 2021-08-12 09:47:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/11.160. 相交链表.js
 */


var getIntersectionNode = function(headA, headB) {
    let tempA = headA, tempB = headB
    while(tempA && tempB){
        // 一起走
        tempA= tempA.next
        tempB= tempB.next
    }
    // tempC 是剩下的， long 是更长的链表
    if(tempA){
        tempC = tempA 
        long = headA
        short = headB
    }else{
        tempC = headB 
        long = headB
        short = headA 
    }
    while(long){
        while(tempC){
            tempC= tempC.next
            long= long.next
        }
    }
    while(long){
        if(long === short) return long
        long =long.next
        short =short.next
    }
    return null
};


var getIntersectionNode = function(headA, headB) {
    let tempA = headA, tempB = headB
    while(tempA!==tempB){
        tempA = tempA.next?tempA.next:headB
        tempB = tempB.next?tempB.next:headA
    }
    return tempA
}