<!--
 * @Author: your name
 * @Date: 2021-07-25 11:06:42
 * @LastEditTime: 2021-07-25 11:21:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/5.堆/README.md
-->


## 二叉堆的创建

### 分析
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


## [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/xiao-ding-dui-by-jzsq_lyx-dnb7/)
### 分析
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