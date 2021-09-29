// 406. 根据身高重建队列
// https://leetcode-cn.com/problems/queue-reconstruction-by-height/

/**
 * @分析
 * 1. 先分类，将身高一样的先缓存在一起
 * 2. 然后根据 key 从高到低开始贪心的排列
 * 3. 我们可以先取出身高更高的值，因为这个时候，排在它前面的，就只有它自己和已经排好的数组 -- 这就是局部贪心
 * 4. 这个时候在相同身高的数组里，还要根据前面的人数进行一次排序，保证少的在前面 -- 这样当前 item 插入到最终 ret 的时候，它就可以根据 item[1] 直接插入到 ret 对应的位置了
 * 5. 时间复杂度 ${O(n)}$,空间复杂度 ${O(n)}$
 */
var reconstructQueue = function(people) {
    const map = new Map(); // 先将身高一眼给的缓存起来
    for(let i = 0;i<people.length;i++){
        const key = people[i][0]
        map.set(key,map.get(key)?[...map.get(key),people[i]]:[people[i]])
    }
    const arr = [...map.keys()].sort((a,b)=>b-a) // 从大到小
    const ret = []
    for(let i = 0;i<arr.length;i++){
        const tempArr = map.get(arr[i]) // 取出数组
        tempArr.sort((a,b)=>a[1]-b[1]) // 身高相同的数组，要根据在他们前面的人的数量进行排序，这样才能保证前面人少的在前面
        // 这个时候需要只需要按找数组的第二个值，插入到最终数组即可
        for(let temp of tempArr){
           ret.splice(temp[1],0,temp) // 在 temp[1] 的位置插入 temp
        }
    }
    return ret
};

const ret = reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]);
console.log(ret)