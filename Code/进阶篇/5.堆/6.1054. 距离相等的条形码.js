// 1054. 距离相等的条形码

/**
 * @分析
 * 1. 为了保证两两不相等，那得保证数量最多的那个条码必须先排完，防止排完其他就省它自个儿了；
 * 2. 所以先用 map 存储所有条码值(key)和数量(value)
 * 3. 这个时候就和[1046. 最后一块石头的重量](https://leetcode-cn.com/problems/last-stone-weight/solution/)那个题目很像了,但是还有一点区别，就是每次你取出最大的两块，都只能取走一份进行排列，然后就要把剩下的放回去，保证每一次取两个值都是最大；
 * 4.
 */
var rearrangeBarcodes = function (barcodes) {
  // 1. 将条形码的值和数量用 map 存储起来
  const map = new Map();
  for (let i = 0; i < barcodes.length; i++) {
    const item = barcodes[i];
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  // 2.创建最大堆，进行堆排
  const heap = new MaxHeap();
  for (let item of map.entries()) {
    console.log(111, item);
    heap.add(item); // [key,value]
  }

  console.log(map, heap);
  // 3. 每次取出最大的两个 item 进行重写排列
  const ret = [];
  while (heap.data[0] > 1) {
    // 这里是默认是保证存在答案，所以即便最后还有item，那么对应的值也只有1个
    // 但是如果条件没有已知，那么就可以根据这个值进行判断是否成功了
    const first = heap.pop();
    const second = heap.pop();
    // Error:错误
    // while(second[1]--){
    //     ret.push(first[0])
    //     ret.push(second[0])
    //     first[1]--
    // }

    ret.push(first[0]);
    first[1]--;
    ret.push(second[0]);
    second[1]--;
    // 然后就要放回去了

    if (first[1]) {
      // 如果还有值，放回堆里再来
      heap.add(first);
    }
    if (second[1]) {
      // 如果还有值，放回堆里再来
      heap.add(second);
    }
  }
  if (heap.data[0]) {
    ret.push(heap.pop()[0]);
  }
  return ret;
};

class MaxHeap {
  constructor() {
    this.data = [];
    this.data[0] = 0;
  }

  down(index) {
    const lastIndex = this.data[0];
    while (index << 1 <= lastIndex) {
      let child = index << 1;
      if (
        child !== lastIndex &&
        this.data[child + 1][1] > this.data[child][1]
      ) {
        child++;
      }
      if (this.data[child][1] > this.data[index][1]) {
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
      console.log(123, index, this.data);
      let father = index >> 1;
      if (this.data[father][1] < this.data[index][1]) {
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
    const item = this.data.pop();
    this.data[0]--;
    this.down(1);
    return item;
  }
}

console.log(rearrangeBarcodes([7, 7, 7, 8, 5, 7, 5, 5, 5, 8]));
