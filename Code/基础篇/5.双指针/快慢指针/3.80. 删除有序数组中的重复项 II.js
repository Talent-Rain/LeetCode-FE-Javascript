// 80. 删除有序数组中的重复项 II
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/

/**
 * @分析
 * 1. 给定的数组是排好序的，然后需要删除多余节点，使得最多出现 2次
 * 2. 设置读写指针 read 和 write, 遍历的每一步中，读写指针都指向相同的值，但是指向的下标可能不一样
 * 3. 当相同的值超过了2， 即 [left,right] 的长度超出 2， 则原地删除 right 指针指向的值 
 * 4. 时间复杂度 ${O(n)}$
 */
 var removeDuplicates = function(nums) {
    let write = read = 0
    while(read <nums.length){
        while(nums[write] === nums[read] && read <nums.length ){
            if(right-left+1 > 2){
                nums.splice(read,1) //删除读指针当前的下标
            } else{
                read++
            }
        }
        // 一轮相同值走完，写指针和读指针指向同一个值
        write = read
    }
};