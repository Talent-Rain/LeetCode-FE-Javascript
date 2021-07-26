// 707. 设计链表
// https://leetcode-cn.com/problems/design-linked-list/

/**
 * @分析
 * 1. 简单的链表就是只有 val 和 next
 * 2. 但是找的时候需要带上 prev，这里就设计单向链表，因为用的比较多
 */
var MyLinkedList = function () {
    this.val = []
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    return this.val[index] === undefined ?  -1 :  this.val[index]
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    this.val.unshift(val)
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    this.val.push(val)
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index <= 0) {
        this.val.unshift(val)
    } else if (index === this.val.length) {
        this.val.push(val)
    } else if (index > 0 && index < this.val.length) {
        this.val.splice(index, 0, val) //在 index 节点删除 0 个值，并加入 val
    }
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (this.val[index] !== undefined) {
        this.val.splice(index, 1)
    }
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */