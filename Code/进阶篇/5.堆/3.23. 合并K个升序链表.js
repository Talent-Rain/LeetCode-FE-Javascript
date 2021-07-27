/*
 * @Author: your name
 * @Date: 2021-07-27 08:55:29
 * @LastEditTime: 2021-07-27 09:39:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/3.23. 合并K个升序链表.js
 */


// 23. 合并K个升序链表


/**
 * @分析
 * 1. 以链表的表头值作为判断元素，创建小顶堆
 */
 var mergeKLists = function(lists) {
    let emptyNode  = new ListNode() // 自己创建一个
    // 构建一个堆
    const minHeap = new MinHeap()
    for (let i = 0; i < lists.length; i++) {
        const head = lists[i];
        if(head){
            minHeap.add(head)
        }
    }
    let cur = emptyNode;
    while(minHeap.data[0]){
        cur.next =new ListNode(minHeap.pop()) 
        cur = cur.next
    }
    return emptyNode.next
};

class MinHeap {
    constructor(){
        this.data = []
        this.data[0] = 0
    }

    down(index){
        const lastIndex = this.data[0]
        while(index<<1 <= lastIndex){
            let child = index<<1
            if(child!== lastIndex && this.data[child+1].val<this.data[child].val){
                child++
            }
            if(this.data[child].val<this.data[index].val){
                [this.data[child],this.data[index]] = [this.data[index],this.data[child]]
                index = child
            }else{
                break
            }
        }
    }

    upper(){
        let index = this.data[0]
        while(index>>1 > 0){
            let father = index>>1
            // 以表头值作为判断依据
            if(this.data[father].val>this.data[index].val){
                // 交换的是整个链表
                [this.data[father],this.data[index]] = [this.data[index],this.data[father]]
                index = father
            }else{
                break
            }
        }
    }

    add(head){
        // 添加的是一个排好序的链表，
        this.data.push(head);
        this.data[0]++
        this.upper()
    }

    // 将堆顶链表的头部值取出之后，重新整理
    pop(){
        const ret = this.data[1].val
        this.data[1] = this.data[1].next
        if(!this.data[1]){
            // 链表为 undefined 了
            [this.data[1],this.data[this.data[0]]] = [this.data[this.data[0]],this.data[1]]
            this.data.pop()
            this.data[0]--
        }
        this.down(1) //整理
        return ret // 返回的是一个值
    }
}