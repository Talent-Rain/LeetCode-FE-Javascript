// 41. 缺失的第一个正数
// https://leetcode-cn.com/problems/first-missing-positive/submissions/

/**
 * @分析
 * 1. 本文要求用线性时间复杂度，本来考虑使用 hash，但是又要求空间复杂度为 ${O(1)}$, 所以不能新建一些结构，只能原地修改
 * 2. 我们知道，数组也是一个对象，可以看做是下标为 key，值为 value 的hash表，这里数组 nums 都是一些数字，所以可以原地移动 nums，使得下标和值一一对应
 * 3. 由于我们要找到的是正数，所以我们可以将数组变更为下标 index+1 === nums[index]， 这样只需要从0开始遍历新的 nums ，找出第一个  index+1 === nums[index] 的值 nums[index] 就是 target
 * 4. 考虑到我们只需要用到正数，所以负数和 0，我们可以保留在原地，同时超出长度 length+1 的值也保留在原地
 * 5. 这样我们开始遍历数组，然后只有当那些还没有处理过的值，才会进行 dfs 遍历，最后每一个值最多进行一次变换，所以时间复杂度是 ${O(n)}$, 原地修改。所以空间复杂度为 ${O(1)}$
 */
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