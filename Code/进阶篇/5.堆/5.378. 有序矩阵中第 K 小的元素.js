/*
 * @Author: your name
 * @Date: 2021-07-29 09:15:46
 * @LastEditTime: 2021-07-29 09:34:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/5.378. 有序矩阵中第 K 小的元素.js
 */
// 378. 有序矩阵中第 K 小的元素

/**
 * @分析 -- 第 K 小
 * 1. 这里给的排好序的矩阵，那么可以用小顶堆将矩阵中元素转移到小顶堆中，每次从堆顶取值后整理，取到第 K 个即可
 */
var kthSmallest = function(matrix, k) {
    const minHeap = new MinHeap()
    for(let i = 0;i<matrix.length;i++){
        minHeap.add(matrix[i])
    }
    const ret = []
    while(--k){
        minHeap.pop()
    }
    return minHeap.pop()

};

class MinHeap {
    constructor(){
        this.data = []
        this.data[0] = 0
    }

    down(index){
        const lastIndex = this.data[0]
        while(index<<1 <= lastIndex){
            let child = index << 1
            if(child!==lastIndex && this.data[child+1][0]< this.data[child][0]){
                child++
            }
            if(this.data[child][0]< this.data[index][0]){
                [this.data[child], this.data[index]] = [this.data[index], this.data[child]]
                index = child
            }else {
                break
            }
        }
    }

    upper() {
        let index = this.data[0]
        while(index >>1 > 0){
            let father = index >> 1 
            if(this.data[father][0]> this.data[index][0]){
                [this.data[father], this.data[index]] = [this.data[index], this.data[father]]
                index = father
            }else {
                break
            }
        }
    }

    add(item){
        this.data.push(item)
        this.data[0]++
        this.upper()
    }

    // 这里不是直接弹出 item，而只是弹出堆顶的第一个字母，然后再整理
    pop(){
        const temp = this.data[1].shift()
        if(!this.data[1].length){
             // 数组空了
             this.data[1] = this.data[this.data[0]]
             this.data.pop()
             this.data[0]--
        }
        this.down(1)
        return temp
    }
}

const ret = kthSmallest([[1,5,9],[10,11,13],[12,13,15]],8)
console.log(ret)