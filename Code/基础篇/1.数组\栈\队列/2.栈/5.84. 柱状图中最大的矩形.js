// 84. 柱状图中最大的矩形
// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
// 参考 https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/wo-yong-qiao-miao-de-bi-yu-jiang-dan-diao-zhan-jie/


/**
 * @分析 -- 暴力解法
 * 1. 设置左右节点，然后不断计算出最大面积，找出最大的那个面积
 * 2. 时间复杂度 ${O(n^2)}$, 其中 n 是 heigts 的长度，而1 <= heights.length <=10^5，所以超时了
 */
var largestRectangleArea = function(heights) {
    let maxArea = 0
    for(let i = 0;i< heights.length;i++) {
        let minH = heights[i]
        for(let j = i;j<heights.length;j++){
            minH = Math.min(minH,heights[j])
            maxArea = Math.max(maxArea,(j-i+1) * minH)
        }
    }
    return maxArea
};

/**
 * @分析
 * 1. 使用单增栈来缓存高度的下标，每当遇到比栈顶小的高度的时候，对于当前栈顶高度而已，以此高度作为高的 area 不能再增加了，所以只能计算 area 了
 * 2. 遍历所有的高度，固定一个高度 heights[i]，求出以比它高的高度作为高的所有 area；
 * 3. 栈中两个高度之间的下标差，其实都应该比 heights[topIndex] 大，因为由于1，2条件，比 heights[topIndex] 的高度在之前的执行过程已经计算并弹出了栈
 * 4. 栈中高度弹出的条件是，外部 heights[i] 的高度比栈顶小，那么遍历真实 heights 的最后一个值时，如果是入栈，那么就会缺少使栈出栈的条件，所以给 heights 加一个 0 的高度，使得最后 stack 的值都能出栈执行
 * 5. 同理，我们在计算宽度的时候，需要上一个比自己小的值得下标锚定宽度，那么遍历结束之后最后一个值出栈之后，没法找到宽度，所以设置一个最小高度 0 ，坐标为 0 作为宽度的锚点
 * 6. 时间复杂度为 ${O(n)}$,空间复杂度为 ${O(n)}$
 */
var largestRectangleArea = function(heights) {
    let maxArea = 0
    const stack = [] // 高度单增的下标栈
    // 数组头放 0 是为了保证最后弹出的高度，能找到对应的宽度
    // 数组尾放 0 是为了能阻断最小高度，这样就可以将 stack 最后一个高度搞出来
    heights = [0,...heights,0] 

    for(let i = 0;i<heights.length;i++){
        if(!stack.length) {
            stack.push(i)
            continue
        }
        while(heights[i] < heights[stack[stack.length-1]]) {
            // 只要当前 bar 的高度小于栈顶高度，那么就得弹出栈顶高度
            const topIndex = stack.pop()
            // 计算这个高度 heights[topIndex]  下的最大 area ; 
            // 宽度是由前面第一个小于自己的高度 i 和后面第一个比自己小的高度 stack[stack.length-1] 确定，那些在 [stack[stack.length-1],topIndex] 之间存在高于自己的都已经计算过了，保证这段的高度都比较高
            const tempArea = heights[topIndex] * (i-stack[stack.length-1] -1)
            maxArea = Math.max(maxArea,tempArea)
        }
        stack.push(i)
    }
    return maxArea
}