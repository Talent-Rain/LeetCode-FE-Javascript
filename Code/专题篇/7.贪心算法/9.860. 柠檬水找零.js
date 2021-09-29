// 860. 柠檬水找零
// https://leetcode-cn.com/problems/lemonade-change/

/**
 * @分析
 * 1. 如果能思考到局部贪心，基本就是一道遍历题
 * 2. 由于 5 元属于更小粒度的单位，在数量足够的时候可以组合成 10 元， 所以我们在给 20 元找零的时候，局部贪心的保存 5 元，这样能保证出力后续的时候更可能完成任务
 * 3. 所以剩下的就是将情况排列出来了
 * 4. 时间复杂度 ${O(n)}$
 */
var lemonadeChange = function(bills) {
    let fives = 0
    let tens = 0
 
     for(let i =0;i<bills.length;i++){
         const b = bills[i] 
         if(b === 5){
            fives++
         }
         if(b === 10 ) {
             if(fives>0){
                 fives--
                 tens++
             }else {
                 return false
             }
         }
         if(b === 20){
             // 现在用贪心，先尽可能的用 10 块去找零，因为 5 块是粒度更小的零钱，它通用性更强，所以尽可能贪心的保存 5 块
             if(tens>0 && fives>0){
                tens--
                fives--
             }else if (tens === 0 && fives>=3){
                 fives -=3
             }else{
                 return false
             }
         }
     }
     return true
 
 };