// 36. 有效的数独
// https://leetcode-cn.com/problems/valid-sudoku/description/

/**
 * @分析
 * 1. 分别创建 rows,columns 2个二维数组 和 subBoxes 这个三维数组，用来缓存 board 中行，列，小box 中，1-9 出现的次数
 * 2. 如果 board[i][j] = x, 那么就是设置 rows[i][x-1] = n+1, cols[j][x-1] = n+1, subBoxes[i/3][j/3][x-1] = n+1
 * 3. 遍历完 board 且三个数组中的值不超过 1，那么已经写有值的数独就是合格的，没有超出规矩，否则返回 false
 * 4. 这样设置完之后，时间复杂度为 ${O(1)}$, 空间复杂度为 ${O(1)}$
 */
 var isValidSudoku = function(board) {
    const rows = Array.from({length:9}).map(() => Array.from({length:9}))
    const columns = Array.from({length:9}).map(() => Array.from({length:9}))
    const sunBoxes = Array.from({length:3}).map(() => Array.from({length:3}).map(() => Array.from({length:9})))
    for(let i = 0;i<board.length;i++){
        for(let j = 0;j<board.length;j++){
            if(board[i][j]!=='.'){
                const x = board[i][j]
                const subI = Math.floor(i/3)
                const subJ = Math.floor(j/3)
                // 存在数字
                if(rows[i][x-1] || columns[j][x-1] || sunBoxes[subI][subJ][x-1]) return false
                rows[i][x-1] = 1 
                columns[j][x-1] = 1
                sunBoxes[subI][subJ][x-1] = 1
            }
        } 
    }
    return true
};