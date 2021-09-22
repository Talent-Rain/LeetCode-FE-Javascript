### [455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/solution/tan-xin-by-jzsq_lyx-y1d6/)
分析 -- 贪心
1. 用最大的饼干满足胃口最大的小孩，这样就能局部最优求出全局最优，可以满足最多的小孩
2. 由于 g,s 都需要取最大，所以需要排序
3. 最后用两个端套的遍历找出最优解
4. 时间复杂度 ${O(n+m)}$
```javascript
var findContentChildren = function (g, s) {
    g.sort((a,b) => a-b)
    s.sort((a,b) => a-b)
    let ret = 0
    let sl = s.length-1; 
    let gl = g.length-1
    while(gl>=0){
        // 人没了，饼干可以还存在
        if(s[sl]>=g[gl] && sl>=0){
            // 最大的饼干能否满足最大胃口的孩子
            ret++
            sl--
        }
        gl--
    }
    return ret
}
```

### [376. 摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/solution/bai-dong-xu-lie-tan-xin-by-jzsq_lyx-9olo/)
分析 -- 贪心
1. 连续数字之间差值是正负交替的，叫做摆动序列；
2. 边缘情况，如果只有1个值，或者两个不相等的值，也是摆动序列
3. 如果出现 0， 则直接不是摆动序列了
4. 如果局部符合要求，按照条件局部删除不符合要求的值，就是贪心的做法
5. 时间复杂度 ${O(n)}$
```javascript
var wiggleMaxLength = function(nums) {
    if(nums.length<2) return nums.length
    let ret = 1 // 从 1 开始是因为要求的是整个摆动序列的长度，所以先初始化1，然后遇到极值递增即可
    let preDiff = 0 // 初始化第一个差值；设置为0，则无论真正第一个差值是多少，得到的都是 0
    let curDiff = 0
    for(let i = 1;i<nums.length;i++){
        curDiff = nums[i]- nums[i-1]
        // 差值必须是正负数，如果是 0 则跳过
        if(curDiff === 0) continue
        if(preDiff * curDiff <= 0){
            ret++
            preDiff = curDiff
        }
    }
    return ret
};
```