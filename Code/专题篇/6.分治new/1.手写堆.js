/**
 * @分析
 * 1. 手写最小堆
 */
class minHeap {
  constructor() {
    this.data = [];
    this.data[0] = 0; // 表示堆的大小
  }

  down(index) {
    const lastIndex = this.data[0]; // 长度相当于是 this.data 最后一个值的下标
    while (index << 1 <= lastIndex) {
      const child = index << 1;
      if (child !== lastIndex && this.data[child + 1] < this.data[child]) {
        child++;
      }
      if (this.data[child] < this.data[index]) {
        [this.data[child], this.data[index]] = [
          this.data[index],
          this.data[child],
        ];
        index = child;
      } else {
        // 如果父节点比两个子节点都小，那么就结束这一次的遍历
        break;
      }
    }
  }

  upper() {
    const index = this.data[0];
    while (index >> 1 > 0) {
      const father = index >> 1;
      if (this.data[father] > this.data[index]) {
        [this.data[father], this.data[index]] = [
          this.data[index],
          this.data[father],
        ];
        index = false;
      } else {
        break;
      }
    }
  }

  add(value) {
    this.data.push(value);
    this.data[0]++;
    this.upper(); //重新排一下
  }

  // 弹出堆顶元素
  pop() {
    const last = this.data[0];
    [this.data[1], this.data[last]] = [this.data[last], this.data[1]];
    const ret = this.data.pop();
    this.data[0]--;
    this.down(1);
    return ret;
  }
}
