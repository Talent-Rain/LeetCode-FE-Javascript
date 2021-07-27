<!--
 * @Author: your name
 * @Date: 2021-07-25 11:06:42
 * @LastEditTime: 2021-07-27 10:20:40
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

## [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/dui-fen-zhi-by-jzsq_lyx-22r6/)
### 分析 -- 堆
1. 这里主要是把链表当成是堆的一个元素，以链表头的值作为小顶堆创建的基点
2. 这里要求得到是 K 个升序链表合并链表，我每次都获取 K 个链表中的最小值，然后放到我自己的链表中，最后得到的就是一个合并完的升序链表了
3. 空间复杂度就是维护堆，所以是 ${O(N*M)}$, 其中 N 是 lists 的长度， M 是 链表的平均长度
4. 时间复杂度: 取出值合并到新链表 -- ${O(N*M)}$
```javascript
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
```

### 分析 -- 分治
1. 多个排序链表很难处理，那么两个排序好的链表合并呢？
2. 将两个有序链表合成一个，然后放进 list 继续走，最后合成一个即可
3. 用分治，如果超出 2 个链表，就拆分了处理，mergeKLists(arr) 最后得到的也是一个排序好的链表，所以每次可以分开治，然后最后 merge 治；
4. 合并两个链表的时间复杂度 ${O(N)}$，分治处理 M 个链表的复杂度为 ${O(logM)}$ 所以 ${O(NlogM)}$ ， 其中 N 是链表的长度， M 是链表的数量

```javascript
/**
 * @分析
 * 1. 多个排序链表很难处理，那么两个排序好的链表合并呢？
 * 2. 将两个有序链表合成一个，然后放进 list 继续走，最后合成一个即可
 * 3. 用分治，如果超出 2 个链表，就拆分了处理，mergeKLists(arr) 最后得到的也是一个排序好的链表，所以每次可以分开治，然后最后 merge 治；
 * 4. 合并两个链表的时间复杂度 ${O(N)}$，分治处理 M 个链表的复杂度为 ${O(logM)}$ 所以 ${O(NlogM)}$ ， 其中 N 是链表的长度， M 是链表的数量
 */
 var mergeKLists = function(lists) {
     const len  =lists.length
     // return lists.reduce((prev,cur) => mergeTwoList(prev,cur)) // 直接 api 递推即可，但是复杂度更高
    // 用分治的方式可以将 N 的复杂度降低到 logN
    if(len<1) return null
    if(len === 1) return lists[0]
    if(len === 2) return mergeTwoList(lists[0],lists[1])
    const mid = len>>1
    return mergeTwoList(mergeKLists(lists.slice(0,mid)),mergeKLists(lists.slice(mid)))
    
};

// 合并两个有序链表
function mergeTwoList (list1,list2){
    const emptyNode = new ListNode()
    let cur =emptyNode
    while(list1 && list2){
        if(list1.val<list2.val){
            cur.next= list1
            list1 = list1.next
        }else{
            cur.next= list2
            list2 = list2.next
        }
        cur = cur.next 
        cur.next = null
    }
    if(list1) cur.next = list1
    if(list2) cur.next = list2
    return emptyNode.next
}
```