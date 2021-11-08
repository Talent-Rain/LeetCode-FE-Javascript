// 542. 01 矩阵
// https://leetcode-cn.com/problems/01-matrix/


var updateMatrix = function (mat) {
    const rows = mat.length;
    const columns = mat[0].length
    const ret = Array.from(mat)
    const dfs = (r,c,dist,tempMaT) => {
        if(r<0 || c < 0 || r>=rows || c>=columns || tempMaT[r][c] === 0) return dist
        console.log(r,c,dist,rows,columns)
        tempMaT[r][c] = 0 // 
        const r1 =  dfs(r+1,c,dist+1)
        const r2 =  dfs(r-1,c,dist+1)
        const r3 =  dfs(r,c+1,dist+1)
        const r4 =  dfs(r,c-1,dist+1)
        return Math.min(r1,r2,r3,r4)
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            ret[r][c] = dfs(r,c,0,[...mat])
        }
    }
    return ret

};

console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]))