### [46. 全排列](https://leetcode-cn.com/problems/permutations/)
分析
1. 不含重复数字，要求的是全排列，所以不同顺序的排列都得算上，这样在枚举过程中要知道自己曾经获取过哪些值
2. 在枚举过程中缓存两个数组 arr,getIndex, arr 是枚举过程中的数组， getIndex 是走过值状态，如果当前 arr 走过对应的下标的值为1，没有走过就是 0
3. 在每一层给临时数组 arr 添加值的时候，需要保证不会重复添加，可以在每一次遇到的时候再遍历 arr，由于值是唯一的，也是可以的；
4. 在这里是用空间换时间，用 getIndex 数组缓存对应的状态，每一次查找的复杂度是 ${O(1)}$
5. 每一次需要枚举完整的数组，需要枚举 n 次所以时间复杂度为 ${O(n^2)}$,空间复杂度 ${O(n)}$
```javascript

var permute = function (nums) {
  let ret = [];

  const dfs = (arr, getIndex) => {
    if (arr.length === nums.length) {
      ret.push(arr);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (!!getIndex[i]) continue; // 如果存在，则代表已经有这个值了
      getIndex[i] = 1;
      dfs([...arr, num], getIndex);
      getIndex[i] = 0;
    }
  };
  const getIndexArr = new Array(nums.length)
  dfs([], getIndexArr);
  return ret;
};

```

### [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/solution/quan-pai-lie-hui-su-jian-zhi-qu-zhong-by-jvv7/)
分析
1. 由于这个时候包含了重复的数字了，且不能有重复值，所以可以考虑到先排序
2. 整理思路和题1 一直，都是缓存两个数组，而且由于值有重复，所以不能用值是否相同来判断，只能用下标判断了
3. 区别在于，每一次回溯回来，需要判断下一次的值是否和当前回溯值一样，如果一样就需要跳过，防止出现重复排列
4. 时间复杂度 ${O(n^2)}$,空间复杂度 ${O(n)}$
```javascript

var permuteUnique = function(nums) {
    const ret = []
    const len = nums.length
    nums.sort((a,b)=>a-b) // 排序
    const dfs = (arr,indexArr) => {
        if(arr.length === len ){
            ret.push(arr)
            return 
        }
        for(let i = 0;i<len;i++){
            if(!!indexArr[i]) continue
            const num = nums[i]
            indexArr[i] = 1
            dfs([...arr,num],indexArr)
            indexArr[i] = 0
            // 回溯回来，如果下一个值一样，那么就是要重复走之前的老路了，所以还是直接跳过的好
            while(nums[i+1]=== nums[i]) {
                i++
            }
        }
    }
    dfs([],[])
    return ret
}

console.log(permuteUnique([1,1,2]))
```