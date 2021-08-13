/*
 * @Author: your name
 * @Date: 2021-08-13 20:39:30
 * @LastEditTime: 2021-08-14 07:31:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /LeetCode-FE-Javascript/Code/基础篇/2.Link/0.707. 设计链表.js
 */
/**
 * @分析
 * 1. 这里是用数组来模拟链表
 */
var MyLinkedList = function () {
  this.data = [];
};

/**
 * @分析 -- 获取第 index 个节点的值
 * 1. 这里的 index 类比数组的下标值，是从 0 开始的，也就是 index 为 0 代表头节点
 * 2. 这里是获取第 index 个节点的值，如果没有这个 index，即 index 超出链表长度 len-1，返回 -1
 */
MyLinkedList.prototype.get = function (index) {
  const size = this.data.length;
  return index < size ? this.data[index] : -1;
};

/**
 * @分析 -- 从头部插入一个链表值
 */
MyLinkedList.prototype.addAtHead = function (val) {
    this.data.unshift(val)
};

/**
 * @分析 -- 从尾部插入一个链表值
 */
MyLinkedList.prototype.addAtTail = function (val) {
    this.data.push(val)
};

/**
 * @分析 -- 从 index 插入一个值
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    const len = this.data.length
    if(index<=len){
        if (index <= 0) {
            this.data.unshift(val)
        } else if (index === len) {
            this.data.push(val)
        } else{
            this.data.splice(index, 0, val) //在 index 节点删除 0 个值，并加入 val
        }
    }
};

/**
 * @分析 -- 删除第 index 个值
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    const len = this.data.length
    if(index>=0 && index<len){
        this.data.splice(index,1)
    }
};

