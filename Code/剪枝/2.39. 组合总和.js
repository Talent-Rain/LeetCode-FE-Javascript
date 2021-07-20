/*
 * @Author: your name
 * @Date: 2021-07-20 09:38:29
 * @LastEditTime: 2021-07-20 09:49:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/剪枝/2.39. 组合总和.js
 */

// 39. 组合总和

var combinationSum = function(candidates, target) {
    const len  = candidates.length
    const ret = []
    candidates.sort((a,b) => b-a) // 排个序 -- 从大到小
    const dfs = (sum,arr,start) => {
        if(sum === target) {
            ret.push(arr)
            return
        }
        if(sum>target) return 

        for(let i = start;i<len;i++){
            dfs(sum+candidates[i],arr.concat(candidates[i]),i)
        }
        
    }
    dfs(0,[],0)
    return ret
};

// 测试
console.log(combinationSum([2,3,6,7],7))
console.log(combinationSum([2,3,5],8))