// 86. 分隔链表
// https://leetcode-cn.com/problems/partition-list/

/**
 * @分析
 * 1. 保留相对位置，也就是不能随意交换，而只能用删除插入的方法来改变位置
 * 2. 遍历链表，用读写指针来求出插入和删除节点
 */
var partition = function(head, x) {

    let write =prev = emptyNode = new ListNode()
    emptyNode.next = head
    let read = head
    let isStart = false // 是否已经遇到大于等于 x 的值
    while(read){
        if(read.val < x && isStart){
            // 使用变量来确认是否开启删除/添加模式，可以在初始操作的时候减少很多本来可以复用的节点缺进行原地删减增加操作
            // 只有读取到小于 x 的节点时，才会触发删除/添加操作
            // 保存 read.next 与 prev 的连接
            prev.next = read.next
           
            // 在 write 指针中添加对应的 node
            next = write.next
            write.next = read
            write.next.next = next
            write = write.next

            // read 返回到删除之后的位置
            read = prev.next
        }else if (read.val < x && !isStart){
            read = read.next
            prev = prev.next
            write = write.next
        }else{
            read = read.next
            prev = prev.next
            isStart = true
        }
        
    }

    return emptyNode.next
};