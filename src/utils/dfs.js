
// 初始化数组
var initArray = Array(9).fill(0).map(() => Array(9).fill(0))
var count = 0
let lock = false

dfs(initArray, 0, 0)
console.log(count)

function dfs(arr, x, y) {
    if(x == 8 && y >= 9) {
        count++
        console.log(arr)
        lock = true
        return
    }
    if(y == 9) {
        y = 0
        x++
    }
    if(arr[x][y] == 0) {
        for(let i = 1; i <= 9; i++) {
            if(check(arr, x, y, i)) {
                arr[x][y] = i
                dfs(arr, x, y+1)
                if(lock) break // 跳出循环结束回溯
                arr[x][y] = 0
            }
        }
    } else {
        dfs(arr, x, y+1)
    }
}

// 检查所填数字是否符合要求
function check(arr, x, y, value) {
    // 横向重复
    // 竖向重复
    for(let i = 0; i < 9; i++) {
        if(arr[x][i] === value || arr[i][y] === value) {
            return false
        }
    }
    // 宫内重复
    const startX = x - (x % 3)
    const startY = y - (y % 3)
    for(let i = 0; i < 3; i++) {
        const numArr = [
            arr[startX+i][startY],
            arr[startX][startY+i],
            arr[startX+i][startY+i]
        ]
        if(numArr.includes(value)) {
            return false
        }
    }
    return true
}