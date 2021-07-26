// 1670. 设计前中后队列
// https://leetcode-cn.com/problems/design-front-middle-back-queue/


var FrontMiddleBackQueue = function() {
    this.head = this.tail = null
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function(val) {
    if(!this.head){
        this.head = this.tail = new ListNode(val)
        this.head.next = this.tail
        this.tail.next = null
    }else{
        let temp = new ListNode(val)
        temp.next = this.head
        this.head = temp
    }
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
    if(!this.head){
        this.head = this.tail = new ListNode(val)
        this.head.next = this.tail
        this.tail.next = null

    }else{
        let emptyNode = prev = new ListNode()
        emptyNode.next = this.head
        let slow = fast = this.head
        while(fast && fast.next){
            prev = prev.next
            slow = slow.next
            fast = fast.next.next
        }
        let temp = new ListNode(val)
        prev.next = temp
        temp.next = slow
        this.head = emptyNode.next
    }
    
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function(val) {
    if(!this.head){
        this.head = this.tail = new ListNode(val)
        this.head.next = this.tail
        this.tail.next = null
    }else{
        this.tail.next = new ListNode(val)
        this.tail = this.tail.next
    }
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function() {
    if(!this.head) return -1
    if(!this.head.next){
        let temp = this.head.val
        this.head = this.tail = null
        return temp
    }
    const temp = this.head.val
    this.head = this.head.next
    return temp
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function() {
    if(!this.head) return -1
    if(!this.head.next){
        let temp = this.head.val
        this.head = this.tail = null
        return temp
    }
    let emptyNode = prev = new ListNode()
    emptyNode.next = this.head
    let slow = fast = this.head
    while(fast.next && fast.next.next){
        prev = prev.next
        slow = slow.next
        fast = fast.next.next
    }
    prev.next = slow.next
    this.head = emptyNode.next
    console.log(this.head,this.tail)
    return slow.val
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function() {
    if(!this.head) return -1
    if(!this.head.next){
        let temp = this.head.val
        this.head = this.tail = null
        return temp
    }
    const res = this.tail.val
    let cur = this.head

    while(cur && cur.next){
        if(cur.next === this.tail){
            this.tail = cur
            this.tail.next = null
        }
        cur = cur.next
    }
    return res
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */