/*
 * @Author: your name
 * @Date: 2021-10-03 09:27:21
 * @LastEditTime: 2021-10-05 20:59:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/进阶篇/2.并查集new/4.924. 尽量减少恶意软件的传播.js
 */
// 924. 尽量减少恶意软件的传播
// https://leetcode-cn.com/problems/minimize-malware-spread/


/**
 * @分析
 * 1. 创建并查集，并将可以连接在一起的构成一个集合
 * 2. 通过并查集，查找到每个并查集的 root 节点，并用 injectedMap 缓存根节点和对应的缺陷节点数
 * 3. 初始化最大子节点数量 maxSize 和返回值 ret
 * 4. 再次遍历 initial 错误节点，然后找到每个节点对应的根节点出现的次数 count，如果超出 1， 那么干掉当前节点 node，依然会有新的节点最后会感染 root 节点，也就是当前集合还是会有感染源；所以没啥意思
 * 5. 如果都是只有一个感染源的集合，那么就判断这个集合的大小，集合越大，则删除当前污染源节点效果更好；如果集合一样大，就删除小的那一个；
 * 6. 时间复杂度 ${O(n)}$，空间复杂度 ${O(n)}$
 * 
 */
 var minMalwareSpread = function (graph, initial) {
  const len = graph.length;
  const union = new UnionFind(len);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (graph[i][j] === 1) {
        union.connect(i, j);
      }
    }
  }
  
  // 感染源触发的根节点状态map，key 是感染源的根节点，value 是出现次数
  const injectedMap = new Map();

  initial.forEach(node=> {
    const root = union.find(node)
    injectedMap.set(root,injectedMap.get(root)?injectedMap.get(root)+1:1)
})

  let maxSize = 0; // 符合要求的的集合的数量
  let ret = -1 

  initial.forEach(node => {
    // 找出感染源的根节点
    const root = union.find(node)
    // 找出感染源的根节点出现次数， -- 超出2个源头，就没有删除的效果了
    const count  = injectedMap.get(root)

    if(count === 1){
        const size = union.sizes[root] // 看一下子节点有多少个
        if(size>maxSize || (size === maxSize && node<ret)){
            ret = node
            maxSize = size
        }
    }
  })

//   如果 ret === -1, 则随便删除一个节点，结果都是一样的，那么就删除其中最小的那个就好了
  if(ret === -1) return Math.min(...initial)
  return ret


};

class UnionFind {
    constructor(len) {
      this.parents = Array.from({ length: len }).map((_, index) => index);
      this.sizes = new Array(len).fill(1);
    }
  
    find(x) {
      if (x === this.parents[x]) return x;
      return this.find(this.parents[x]);
    }
  
    connect(x, y) {
      const px = this.find(x);
      const py = this.find(y);
      if (px === py) return;
      if (this.sizes[px] > this.sizes[py]) {
        this.parents[py] = px;
        this.sizes[px] += this.sizes[py];
      } else {
        this.parents[px] = py;
        this.sizes[py] += this.sizes[px];
      }
    }
  }