### [547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)
分析
1. 每一个城市都有可能是一个省份，而只有是连接的城市，就合并为一个省份，最后剩下的集合就是省份
2. 所以可以直接用 parents 数组缓存，其中 index 表示自己的唯一表示，value 表示指向集合城市
3. 当我们遇到 isConnected[i][j] === 1 的时候，将两个城市连接起来，最后得到的值就是连接状况
4. 最后的 parents[index] === index 的数量，就是集合的数量
5. 时间复杂度 ${O(n)}$, 空间复杂度 ${O(n)}$
```javascript
 var findCircleNum = function(isConnected) {
    const len = isConnected.length
    const parents = Array.from(isConnected).map((_,index) => index) // 指向自己
    for(let i = 0;i<len;i++){
        for(let j=0;j<len;j++){
            if(isConnected[i][j] === 1){
                _connect(i,j) // 将 i, j 合并
            }
        }
    }
    return parents.filter((item,index) => item === index).length //筛选出根节点

   function _connect(x,y) {
        parents[_find(x)] = _find(y)
    }

    function _find(x){
        if(parents[x] ===x) return x
        return _find(parents[x])

    }
}
```

```javascript
// 标准类写法
 class UnionFind {
    constructor(n){
        // 缓存两个数组，父节点数组和当前节点的子节点数量数组
        // 1. 初始化的父节点数组都是指向自己当前的下标的； -- 其中下标是唯一值
        this.parents = new Array(n).fill(1).map((_,index) => index)
        // 2. 初始化的子节点数量数组都是只有一个；-- 其中下标是唯一值
        this.sizes = new Array(n).fill(1) // 
    }

    // 寻找 x 的根节点
    find(x){
        if(this.parents[x] === x) return x
        return this.find(this.parents[x])
    }

    // 合并两个并查集
    connect(x,y){
        const px = this.find(x)
        const py = this.find(y)
        if(px === py) return // 如果他们是一个集合，则直接返回
        if(this.sizes[px]>this.sizes[py]){
            // px 挂的节点更多，所以将 py 也挂过来
             this.parents[py] =px
             this.sizes[px]++
        }else{
            this.parents[px] =py
             this.sizes[py]++ 
        }
    }
}

var findCircleNum = function(isConnected) {
    const len = isConnected.length
    const unions = new UnionFind(isConnected.length)
    for(let i = 0;i<len;i++){
        for(let j=0;j<len;j++){
            if(isConnected[i][j] === 1){
                unions.connect(i,j) // 将 i, j 合并
            }
        }
    }
    console.log(unions)
    return new Set(unions.parents).size
}
```


### [721. 账户合并](https://leetcode-cn.com/problems/accounts-merge/)
分析
1. 首先题目已知邮箱属于唯一的一个name，而name的名字是可以相同但是代表不同的人的，所以 name 只能算是一个标记而已,所以一开始做合并操作不需要计算 name，用 email_name_map 缓存起来，直到最后再用
2. 由于邮箱是一个字符串，而这里显然需要将同一个用户的邮箱缓存到一起，所以这里用下标来标记不同的邮箱，并缓存到 email_index_map 
3. 开始使用并查集，将同一个用户下 email 连接起来
4. 连接完之后，现在在并查集 parents 里面都是一些 index 表示的东西，他们代表一种关联逻辑，
5. 但是具体怎么重新排列，需要通过 email_index_map 来找到找到原始的 email,然后查找是否属于同一个集合的，然后再缓存在在一起；
6. 这个时候所有相同集合的值后缓存在了 email_index_map 的 value 中了，取出来，排序，然后从 email_name_map 取出 name，然后合并成一个数组，然后作为二维数组的一个 item push 到 merge 数组里
7. 时间复杂度 ${nlogn}$ -- 每一次并查集合并的时候，需要进行2次查找1次合并；空间复杂度 ${O(n)}$
```javascript
 var accountsMerge = function(accounts) {
    const email_index_map=new Map()
    const email_name_map=new Map()
    let emailIndex = 0 // 设置下标，作为唯一标识 -- 也代表了 emails 的数量
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const name = account[0]
        for(let i = 1;i<account.length;i++){
            const email = account[i]
            if(!email_index_map.has(email)){
                email_index_map.set(email,emailIndex)
                email_name_map.set(email,name)
                emailIndex++
            }
        }
    }
    const parents = Array.from({length:emailIndex}).map((_,index) => index) 
    function _find(x){
        if(parents[x]=== x) return x
        return _find(parents[x])
    }
    function _connect(x,y) {
        const px = _find(x)
        const py = _find(y)
        parents[py] = px // 让 py 指向 py
    }
    // 开始使用并查集，将同一个用户下 email 连接起来
    for (let i = 0; i < accounts.length; i++) {
        const firstEmail = accounts[i][1];
        const firstIndex = email_index_map.get(firstEmail);
        for(let j = 2;j<accounts[i].length;j++){
            const secondEmail = accounts[i][j];
            const secondIndex = email_index_map.get(secondEmail);
            _connect(firstIndex,secondIndex)
        }
    }

    // 现在每一个 email 的关联关系都通过 index 连接好了，现在需要用一个数据结构将他们取出来
    // 这 key 值是根 emailIndex, values 就是这个集合的 emails 
    const index_email_map = new Map() 
    for(let email of email_index_map.keys()) {
        const emailIndex = email_index_map.get(email)
        const root = _find(emailIndex)
        index_email_map.set(root,index_email_map.has(root)? [...index_email_map.get(root),email]:[email])
    }

    const merge = []
    for(let emailsArr of index_email_map.values()){
        emailsArr.sort();
        const name = email_name_map.get(emailsArr[0])
        merge.push([name,...emailsArr])
    }
    return merge
}

```


### [924. 尽量减少恶意软件的传播](https://leetcode-cn.com/problems/minimize-malware-spread/)
分析
1. 创建并查集，并将可以连接在一起的构成一个集合
2. 通过并查集，查找到每个并查集的 root 节点，并用 injectedMap 缓存根节点和对应的缺陷节点数
3. 初始化最大子节点数量 maxSize 和返回值 ret
4. 再次遍历 initial 错误节点，然后找到每个节点对应的根节点出现的次数 count，如果超出 1， 那么干掉当前节点 node，依然会有新的节点最后会感染 root 节点，也就是当前集合还是会有感染源；所以没啥意思
5. 如果都是只有一个感染源的集合，那么就判断这个集合的大小，集合越大，则删除当前污染源节点效果更好；如果集合一样大，就删除小的那一个；
6. 时间复杂度 ${O(n)}$，空间复杂度 ${O(n)}$
```javascript

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
```