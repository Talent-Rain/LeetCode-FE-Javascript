// 200. 岛屿数量

/**
 * @分析
 * 1. 回溯搞起来
 * 2. 遍历每个点，只要是土地就启动一次，然后上下左右蔓延，遇到土地久转出水，这样可以防止重复获取，一直到孤岛的时候返回
 */
 var numIslands = function(grid) {
    let valid = 0

    const rows = grid.length
    const columns = grid[0].length

    const dfs = (r,c) => {
        if( r<0 || r>=rows || c<0 || c>=columns || grid[r][c] === '0') {
            // 都是水，直接返回
            return
        }
        // 走过了就设置为水，防止二次经历
        grid[r][c] = '0'
        dfs(r-1,c)
        dfs(r+1,c)
        dfs(r,c-1)
        dfs(r,c+1)
    }
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            if(grid[i][j] === '1') {
                valid++
                // 启动一次
                dfs(i,j)
            }
        }
    }
    return valid
};