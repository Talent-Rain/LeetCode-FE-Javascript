/*
 * @Author: your name
 * @Date: 2021-08-19 08:42:28
 * @LastEditTime: 2021-08-19 09:15:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/专题篇/1.二分法/其他练习/5.350. 两个数组的交集 II.js
 */

var intersect = function (nums1, nums2) {
  const map = new Map(); //将长数组的值存储一份
  for (let item of nums2) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  let ret = [];
  for(let item of nums1){
      if(!!map.get(item)){
          map.set(item,map.get(item)-1)
          ret.push(item)
      }
  }

  return ret;
};