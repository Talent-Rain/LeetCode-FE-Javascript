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