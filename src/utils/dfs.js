
// 八皇后问题
var arr = Array(8).fill(0).map(() => Array(8).fill(0))
var count = 0
function dfs(deep) {
    if(deep >= 8) {
        count++
    }
    else {
        for(let i = 0; i < 8; i++) {
            if(check(deep, i)) {
                arr[deep][i] = 1
                dfs(deep+1)
                arr[deep][i] = 0
            }
        }
    }
}
// 检查数字是否填过
function check(x, y) {
    // 横
    for(let i = 0; i < 8; i++) {
        if(arr[i][y] === 1) {
            return false
        } 
    }
    // 竖
    for(let i = 0; i < 8; i++) {
        if(arr[x][i] === 1) {
            return false
        } 
    }
    // 左上 斜至 右下
    for(let i = 0; i < 8; i++) {
        if(x-i>=0 && y-i>=0) {
            if(arr[x-i][y-i] === 1) {
                return false
            }
        }
        if(x+i<8 && y+i<8) {
            if(arr[x+i][y+i] === 1) {
                return false
            }
        }
    }
    // 右上 斜至 左下
    for(let i = 0; i < 8; i++) {
        if(x-i>=0 && y+i<8) {
            if(arr[x-i][y+i] === 1) {
                return false
            }
        }
        if(x+i<8 && y-i<=0) {
            if(arr[x+i][y-i] === 1) {
                return false
            }
        }
    }
    return true
}

dfs(0)
console.log(count)