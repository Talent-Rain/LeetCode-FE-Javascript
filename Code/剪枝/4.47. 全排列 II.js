/*
 * @Author: your name
 * @Date: 2021-07-22 09:12:25
 * @LastEditTime: 2021-07-22 10:06:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/剪枝/4.47. 全排列 II.js
 */

// 47. 全排列 II

var permuteUnique = function(nums) {
    const len = nums.length
    const ret = []
    const visited = new Array(len).fill(0) // 用来保存已经记录到临时数组的下标值,下标为 1 代表已经用了
    nums.sort((a,b) => a-b) // 排序，这样才能在回溯的时候，防止在相同的位置注入一样的值，导致重复排列的出现
    const recursion = (temp) => {
        if(temp.length === len) {
            ret.push(temp);
            return 
        }

        for(let i=0;i<len;i++){
            // 下标值已经取了，值在 temp 里了
            if(visited[i]) continue 
            // 如果当前值和上一个值相等且 visited 中没有上一个值的下标 i-1,证明当前状态是回溯回来后，去掉上一个 i-1 值，继续往下取的情况
            // 这个时候就需要去重，防止临时数组的当前值重复取；
            if(nums[i] === nums[i-1] && !visited[i-1]) continue 
            visited[i] = 1
            recursion([...temp,nums[i]])
            visited[i] = 0 // 回溯回来之后，将下标去掉
        }
    }
    recursion([])
    return ret
};


var permuteUnique = function(nums) {
    const ret = []
    nums.sort((a,b) => a-b) // 排序，这样才能在回溯的时候，防止在相同的位置注入一样的值，导致重复排列的出现
    const recursion = (temp,restArr) => {
        if(!restArr.length) {
            ret.push(temp);
            return 
        }
        for(let i=0;i<restArr.length;i++){
            const num = restArr[i]
            if(i === 0 || restArr[i-1]!== num) recursion([...temp,num],[...restArr.slice(0,i),...restArr.slice(i+1)])
        }
    }
    recursion([],nums)
    return ret
};



console.log(permuteUnique([1,2,1]))