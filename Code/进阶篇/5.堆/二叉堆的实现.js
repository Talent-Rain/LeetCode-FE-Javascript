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