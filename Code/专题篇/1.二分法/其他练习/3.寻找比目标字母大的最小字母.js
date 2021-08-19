/*
 * @Author: your name
 * @Date: 2021-08-18 09:01:25
 * @LastEditTime: 2021-08-18 09:29:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/3.寻找比目标字母大的最小字母.js
 */

/**
 * @分析
 * 0: 注意： 这道题应该改成，给定一个排好序的字符数组，找出处 target 所在位置的下一个字母，且该数组首尾衔接 -- 即如果给定的 target 在数组最后，则下一个就是首字母；
 * 1. 字母先转成  UniCode 编码，然后用 编码大小来进行比较，注意这里只有小写字母，所以 left right 值也是有了
 * 2. 这是个奇葩的设定，['a','c'],'z' , 如果按照真正 charCode 比较，数组中没有比 'z' 大的，这里这能说是顺序遍历数组后，在 target 之后的第一个元素
 */
 var nextGreatestLetter = function(letters, target) {
    const numbers  = letters.map(l => l.charCodeAt())
    const targetIndex = target.charCodeAt()
    let left = 0,right = numbers.length-1

    while(left <= right){
        const mid = ((right-left) >> 1) + left

        if(numbers[mid]>targetIndex){
            // 只要是符合的，都返回往左走，知道走不了
            right = mid-1
        }else{
            left= mid+1
        }
    }
    if(left>=numbers.length) return letters[0]
    return letters[left]

};