
// 131. 分割回文串
// https://leetcode-cn.com/problems/palindrome-partitioning/

/**
 * @分析
 * 1. 这是一个变种的组合问题，因为排列顺序已经确定好了只要切割就好
 * 2. 所以在遍历过程中，只有当符合回文要求的子串，才能切割，然后往下走，否则剪掉较好
 * 3. 回文子串的判定可以简单的用左右双指针来实现
 */
var partition = function(s) {
    const ret = []
    // 判断是否是回文子串
    function isValid(s) {
        if(s.length === 1) return true // 只有一个字符
        let l = 0,r = s.length-1
        while(l<r){
            if(s[l] !== s[r]) return false
            l++
            r--
        }
        return true

    }
    const dfs = (start,arr) => {
        if(start === s.length){
            ret.push(arr)
            return 
        }
       let temp =''
        for(let i =start;i<s.length;i++){
            temp+=s[i]
            if(isValid(temp)){
                dfs(i+1,[...arr,temp])
            }
        }
    }
    dfs(0,[])
    return ret
};