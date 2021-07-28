/*
 * @Author: your name
 * @Date: 2021-07-28 07:51:05
 * @LastEditTime: 2021-07-28 08:29:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/4.451. 根据字符出现频率排序.js
 */
// 451. 根据字符出现频率排序

var frequencySort = function (s) {
    let ret = "";
    if (!s) return s;
    const map = new Map();
    const heap = new MaxHeap();
    for (let i = 0; i < s.length; i++) {
      const item = s[i];
      if (map.has(item)) {
        map.set(item, map.get(item) + 1);
      } else {
        map.set(item, 1);
      }
    }
    // 加入堆中，元素值是 [key,value], 要用 value 来进行比对
    for (let item of map.entries()) {
      heap.add(item);
    }
    while (heap.data[0]) {
      const item = heap.pop();
      ret = ret.concat(item[0].repeat(item[1]));
    }
    return ret;
  };
  
  class MaxHeap {
    constructor() {
      this.data = [];
      this.data[0] = 0;
    }
  
    down(index) {
      const lastIndex = this.data[0]; //最后一个值的下标值
      while (index << 1 <= lastIndex) {
        let child = index << 1;
        if (
          child !== lastIndex &&
          this.data[child + 1][1] > this.data[child][1]
        ) {
          child++;
        }
        if (this.data[child][1] > this.data[index][1]) {
          // 注意，item 是数组，所以用第二个值做比对，但是交换的是整个 item
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
      let index = this.data[0];
      while (index >> 1 > 0) {
        const father = index >> 1;
        if (this.data[father][1] < this.data[index][1]) {
          // 注意，item 是数组，所以用第二个值做比对，但是交换的是整个 item
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
  
    add(item) {
      this.data.push(item);
      this.data[0]++;
      this.upper();
    }
  
    pop() {
      [this.data[1], this.data[this.data[0]]] = [
        this.data[this.data[0]],
        this.data[1],
      ];
      this.data[0]--;
      const temp = this.data.pop();
      this.down(1)
      return temp
    }
  }
  