### [414. 第三大的数](https://leetcode-cn.com/problems/third-maximum-number/solution/mou-pao-jie-jue-di-k-da-by-jzsq_lyx-0gt4/)
分析
1. 注意，这里的第三大，和第 k 大是有区别，这里要求的是第三大的数，不是从大到小的第三个，因为可能遍历下来会有重复的值，必须是第3个值
2. 由于只是单存要第 3 个，直接用冒泡即可
3. 用 valid 表示冒泡出来的 n 个 不同的值，只要等于 3 的那个就结束冒泡遍历了
4. 用 count 表示冒泡遍历的次数，由于可能会有 m 次相同给的值 k 大，所以需要和 valid 区分开来
5. 最后如果找出了 3 个 valid 值，那么就取当前的第 len-count 下标下的值，如果 valid 不足 3 个，就取最大值
6. 最佳的时间复杂度就是 ${O(n)}$, 最差的就是需要完全遍历 n 次，那么复杂度就是 ${O(nlogn)}$
```javascript

 var thirdMax = function(nums) {
    let valid = 0
    let count = 0
    while(valid < 3 && count<nums.length) {
        for(let i = 1;i<nums.length-count;i++){
            if(nums[i]<nums[i-1]){
                [nums[i-1],nums[i]] = [nums[i],nums[i-1]]
            }
        }
        if(valid === 0 || nums[nums.length-count] !== nums[nums.length-count-1]) valid++ // 如果第一次或者冒泡完之后不与上一个值值相等的时候，才会
        count++ // 这个是冒泡的次数
    }
    return valid===3 ?nums[nums.length-count]:nums[nums.length-1] // 最后找到的是 count 的那个,或者最大那个
};
```


### [剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/solution/yi-huo-qiu-zhi-by-jzsq_lyx-nc3j/)
分析
1. 这里是给定了 [0,len] 中缺失的一个数组，我们可以直接用异或直接取值
2. 相同值异或得到0, 0 和任意值异或得任意值
3. 由于数组 nums 中都是只出现过一次的值，那么我取 [1,2,...len] 来与 nums 中的值进行异或，最后剩下的值就是缺失的值，因为相同值都抵消了，只剩下 0 和 target 异或得 target
4. 时间复杂度为 ${O(n)}$
5. 本题同 [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/submissions/)
```javascript
var missingNumber = function(nums) {
    return nums.reduce((prev,cur,index) => prev ^ cur ^ (index+1), 0)
};
```

### [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/solution/liang-you-xu-shu-zu-yuan-di-he-bing-by-j-uzze/)
 分析
 1. 这里给定的 m,n 是 nums1，nums2 实际有值的长度，而合并后的数组都存在 nums1 上， 所以 nums1.length === m+n 的，这个是题目设置
 2. 这里显然是想让 nums2 的值并到 nums1 中，然后也不需要返回，程序会识别 nums1 为最终输出结果;
 3. 由于是以 nums1 的长度为基础，所以就不能用一些原地增添的值，在不使用 js 的 api 前提下处理本题；
 4. 设置指针 index1 指向 nums1 真实存在的值 -- 下标为 [0,m-1] 的值；然后每次都和排序好的 nums2[0] 进行比较；
 5. 如果 nums2[0] < nums1[index1], 则交换两者的值，然后用冒泡的方式整理 nums2 ， 使得它仍然是有序数组
 6. 当 index1 >= m 的时候，只需要按需将后面的长度的值替换为 nums2 上的值即可
 7.  遍历一遍长度为 m+n, 每次交换都需要整理一圈，最优为1，最差为 n, 所以时间复杂度:最优是 ${O(n+m)}$, 最差为 ${O(n*m+n)}$
```javascript

 var merge = function(nums1, m, nums2, n) {
    
    let index1 = 0 // 设置 nums1 指针指向
    while(index1<m) {
        // 当 nums2 的值更小的时候，我们需要在 nums2 中找出 nums1[index1] 应该处于 nums2[index2] 的位置
        if(nums2[0]<nums1[index1]){
            [nums1[index1],nums2[0]] = [nums2[0],nums1[index1]]; 
            // 交接之后，整理一下nums2
            let index2 = 1
            while(nums2[index2]<nums2[index2-1] && index2<n) {
                // 冒泡到需要的位置上去
                [nums2[index2],nums2[index2-1]] = [nums2[index2-1],nums2[index2]];
                index2++
            }
        }
        index1++
    }
    // 这个时候只需要将 nums2 的值拷贝到 nums1 后面即可
    while(index1 < m+n) {
        nums1[index1] = nums2[index1-m]
        index1++
    }
};
```


### [380. O(1) 时间插入、删除和获取随机元素](https://leetcode-cn.com/problems/insert-delete-getrandom-o1/solution/shu-zu-ha-xi-biao-by-jzsq_lyx-mmwh/)
分析
1. 增删复杂度为 O(1)，如果要保证增删时的相对位置不发生改变，用双向链表是比较合理的
2. 但是这里的插入都只是简单的末尾插入，所以数组也 ok， 删除的时候也没有要求保证整个数组的值之间相对位置，所以数组也 ok； 需要注意的是，我们在增删的时候，是需要先判存的，这个时候用数组的话，得有哈希表来判断，不然遍历数组判断的话，复杂度为 ${O(n)}$
3. 所以本次可以用数组，也可以用双向链表，只是链表处理比较麻烦，这里直接用数组了；
4. 首先我们用 this.data 缓存插入的值，然后为了能通过 value 来直接查找到缓存数据，所以要用 valToIndex 这样的哈希表缓存 val-index 的值
5. 这样我们在增删过程中，判断搜索就可以是复杂度为 ${O(1)}$ 了
6. 最后根据数组长度来做一个随机下标，然后直接捕获出来即可；
```javascript
var RandomizedSet = function() {
    this.data = []
    this.valToIndex = new Map() // key 是插入值，value 是对应的下标
};
// 插入都是插入到最后即可
RandomizedSet.prototype.insert = function(val) {
    if(this.valToIndex.has(val)) return false
    this.data.push(val)
    this.valToIndex.set(val,this.data.length-1)
    return true
};


RandomizedSet.prototype.remove = function(val) {
    if(!this.valToIndex.has(val)) return false
    // 先判断插入的 val 所在的下标
    const index = this.valToIndex.get(val)
    if(index !== this.data.length-1) {
        // 交换值
        [this.data[this.data.length-1],this.data[index]] = [this.data[index],this.data[this.data.length-1]]
    }
    //弹出最后的值
    this.data.pop() 
    this.valToIndex.delete(val)
    this.valToIndex.set(this.data[index],index)
    return true
};


RandomizedSet.prototype.getRandom = function() {
    const random = Math.floor((Math.random() * this.data.length)) // 获取随机下标
    console.log(this.data,this.valToIndex,random)
    return this.data[random]
};
```

### [41. 缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive/solution/yuan-di-shu-zu-dang-ha-xi-biao-by-jzsq_l-7onn/)
分析
1. 本文要求用线性时间复杂度，本来考虑使用 hash，但是又要求空间复杂度为 ${O(1)}$, 所以不能新建一些结构，只能原地修改
2. 我们知道，数组也是一个对象，可以看做是下标为 key，值为 value 的hash表，这里数组 nums 都是一些数字，所以可以原地移动 nums，使得下标和值一一对应
3. 由于我们要找到的是正数，所以我们可以将数组变更为下标 index+1 === nums[index]， 这样只需要从0开始遍历新的 nums ，找出第一个  index+1 === nums[index] 的值 nums[index] 就是 target
4. 考虑到我们只需要用到正数，所以负数和 0，我们可以保留在原地，同时超出长度 length+1 的值也保留在原地
5. 这样我们开始遍历数组，然后只有当那些还没有处理过的值，才会进行 dfs 遍历，最后每一个值最多进行一次变换，所以时间复杂度是 ${O(n)}$, 原地修改。所以空间复杂度为 ${O(1)}$
```javascript
var firstMissingPositive = function(nums) {
    const dfs = index => {
        const cur = nums[index] // 找出当前index 对应的值，移动到它应该去到的下标
        if(cur>0 && cur<=nums.length && nums[cur-1] !== cur) {
            // 只有 [1,nums.length]的值才有继续迭代的可能性，如果某个值已经处理过为合格的 nums[cur-1] === cur， 也不需要处理
            const next = nums[cur-1] 
            nums[cur-1] = cur // 修改这个值
            nums[index] = next // 替换到 index 下标去
            dfs(index)
        }
    }
    for(let i = 0;i<nums.length;i++){
        // 如过下标对应的值合格，则跳过遍历
        if(i+1 === nums[i]) continue
        dfs(i)
    }
    for(let i = 0;i<nums.length;i++){
        // 找出数组中第一个不合理的值
        if(nums[i]!== i+1) return i+1
    }
    return nums.length+1
};
```