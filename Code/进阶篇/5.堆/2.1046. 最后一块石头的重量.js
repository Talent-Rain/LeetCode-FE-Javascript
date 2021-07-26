/*
 * @Author: your name
 * @Date: 2021-07-26 07:01:46
 * @LastEditTime: 2021-07-26 07:32:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/2.1046. 最后一块石头的重量.js
 */

// 1046. 最后一块石头的重量

var lastStoneWeight = function (stones) {
    // 维护一个大顶堆
    const heap = new MaxHeap();
    for (let i = 0; i < stones.length; i++) {
      heap.add(stones[i]);
    }
  
    while (heap.data[0] > 1) {
      // 1. 每次取出两个最大值
      const first = heap.pop();
      const second = heap.pop();
      // 2. 相减，再放回去
      const temp = first - second;
      if (temp) {
        heap.add(temp);
      }
    }
     return heap.data[0] ? heap.data[1]:0
  };
  
  class MaxHeap {
    constructor() {
      this.data = [];
      this.data[0] = 0; // 第一个值是当前堆的size
    }
  
    down(index) {
      const len = this.data.length; // 是下标极限
      while (index << 1 < len) {
        let child = index << 1;
        if (child !== len && this.data[child + 1] > this.data[child]) {
          child++;
        }
        if (this.data[child] > this.data[index]) {
          [this.data[child], this.data[index]] = [
            this.data[index],
            this.data[child],
          ];
          index = child;
        } else {
          break;
        }
      }
    }
  
    upper() {
      let index = this.data[0]; // 最大下标
      while (index >> 1 > 0) {
        const father = index >> 1;
        if (this.data[index] > this.data[father]) {
          [this.data[father], this.data[index]] = [
            this.data[index],
            this.data[father],
          ];
          index = father;
        } else {
          break;
        }
      }
    }
  
    add(value) {
      // 先加在最末尾
      this.data.push(value);
      this.data[0]++; // size 也加一下
      this.upper(); // 整理一下
    }
  
    // 弹出堆顶元素
    pop() {
        const last = this.data[0];
      [this.data[1], this.data[last]] = [
        this.data[last],
        this.data[1],
      ] //交换堆顶和堆尾的值
      const ret = this.data.pop();
      this.data[0]--;
      this.down(1); // 整理
      return ret
    }
  }
  