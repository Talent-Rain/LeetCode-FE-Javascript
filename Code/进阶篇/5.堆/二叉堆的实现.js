class MinHeap {
  constructor(len) {
    this.data = [];
    this.data[0] = len; // 第一个节点用来存放对的大小
  }

  // 下浮
  down(index) {
    const size = this.data[0];
    while (index << 1 <= size) {
      let child = index << 1;

      if (child !== size && this.data[child] > this.data[child + 1]) {
        child += 1; //如果右节点更小，就右节点作为下一个接盘的节点
      }
      if (this.data[index] > this.data[child]) {
        //   交换一下
        [this.data[index], this.data[child]] = [
          this.data[child],
          this.data[index],
        ];
        index = child;
      } else {
        //   只要其中一次失效了，那么就没必要继续往下查找了
        break;
      }
    }
  }

  // 都是从最底层开始算的
  upper() {
    let index = this.data.length - 1;
    while (index >> 1 > 0) {
      let father = index >> 1;
      if (this.data[index] < this.data[father]) {
        // 子节点比父节点要小，则网上走
        [this.data[index], this.data[father]] = [
          this.data[father],
          this.data[index],
        ];
        index = father;
      } else {
        break;
      }
    }
  }
}

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
    [this.data[1], this.data[last]] = [this.data[last], this.data[1]]; //交换堆顶和堆尾的值
    const ret = this.data.pop();
    this.data[0]--;
    this.down(1); // 整理
    return ret;
  }
}
