<!--
 * @Author: your name
 * @Date: 2021-07-25 11:06:42
 * @LastEditTime: 2021-07-26 08:13:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/README.md
-->


## 二叉堆的创建

### 分析 -- 小顶堆
1. 这里是一个小顶堆，特点就是根节点的值比子节点的值都小，通常用作经典的前 K 大
2. 主要有两个方法，
    - 一个是上升，这里主要用作构建堆的时候，整理堆用的
    - 一个是下沉，这里主要用于弹出堆顶元素后，置换了堆顶值之后使用的，这里用到 this.data[0]，是因为这个方法一般是构建完整的堆之后，才会使用
3. 其他的方法不是不可以，只是为了保证灵活性，暂时就先做个简易版，后面再考虑，因为方法越多，其实兼容性就越差了
```javascript
class MinHeap {
    constructor(len) {
      this.data = [];
      this.data[0] = len; // 第一个节点用来存放堆的大小 -- 某些特定环境比较好用
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
      // 这里不用 this.data[0] 是因为当前构建的堆可能还没达到堆的最大值，所以不能使用  
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
```

### 分析 -- 大顶堆

- 相对于初始版的小顶堆，这一版的大顶堆添加了两个方法， pop 和 add
- add 方法可以写在使用堆的位置，但是为了让它和堆的第一个值匹配，所以写在了类方法里面，方便对 size 的添加
- pop 是为了取出堆顶元素，`堆是为了解决动态取极值`而存在的数据结构，所以必然要取出整理的过程。

```javascript
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
```


## [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/xiao-ding-dui-by-jzsq_lyx-dnb7/)
分析
- 这是一道炒鸡经典的题，可以用冒泡，快排，其中最经典的方法，莫过于小顶堆求值 -- 作为教材基本的题目
- 这里求第 K 大，那么就是要维护一个 K 大的小顶堆，然后堆顶就是第 K 大
- 然后遍历数组 nums，先初始化一个 K 大的小顶堆，然后剩下的值就和堆顶比较；
- 只要是值大过堆顶值的，那么直接把堆顶值替换掉，但这时，堆顶值就不一定是小顶堆中的最小值了，所以需要向下 down 整理一下小顶堆
- 遍历结束后就得到一个小顶堆了，然后直接去堆顶元素就是第 K 大了；
- 时间复杂度: ${O(N*L)$ -- 其中 N 是数组大小， L 是二叉堆的层高，L其实相对来说比较小，所以复杂度可以说接近线性
- 空间复杂度: ${O(M)}$ -- 其中 M 是就是 K 值，因为要维护一个 K 大堆

```javascript
// 215. 数组中的第K个最大元素

// MinHeap 就是上面的那个类

var findKthLargest = function (nums, k) {
    // 创建一个 K 大的小顶堆
    const minHeap = new MinHeap(k);
    const len = nums.length;
    for (let i = 0; i < len; i++) {
      if (i < k) {
        // 初始化堆
        minHeap.data.push(nums[i]);
        minHeap.upper();
      } else {
        // 这个时候开始考虑是否要压到小顶堆中了
        // 因为维护的是一个 k 大的小顶堆，而目的是求第 k 大，所以只需要判断后面的值是否大于小顶堆的堆顶值，即可晓得是否需要取代
        if (nums[i] > minHeap.data[1]) {
          minHeap.data[1] = nums[i];
          minHeap.down(1);
        }
      }
    }
    return minHeap.data[1]
  };
  
  
```

## [1046. 最后一块石头的重量](https://leetcode-cn.com/problems/last-stone-weight/solution/dui-dong-tai-qu-ji-zhi-by-jzsq_lyx-09o6/)
分析 -- 大顶堆
1. 按照题目已经，需要取出一组数组中的最大值和次大值，进行一定运算后，会将计算值返回给数组，然后循环操作，直到数组长度最大为 1 时结束
2. 所以就是动态取极值，可以考虑用堆来处理
3. 定义一个方法 pop，每次获取堆顶元素，并将大顶堆整理好，定义方法 add 为为堆加入元素
4. 这样每一次取出两个元素，返回 1 或 0 个元素，一直到堆元素小于 2 时结束，返回堆中的元素或 0
5. 空间复杂度就是维护堆，所以是 ${O(N)}$, 时间复杂度 ${O(NlogN)}$ 
```javascript
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
  
```