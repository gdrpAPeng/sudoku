<template>
    <div class="home-container">
        <div class="canvas-container">
            <canvas ref="canvas" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeContainer',
    data() {
        return {
            ctx: null,
            width: 360,
            height: 360,
            boxWidth: 40, // 每个小格子的宽度
            localPosition: null
        }
    },
    mounted() {
        const oCanvas = this.$refs['canvas']
        oCanvas.width = this.width
        oCanvas.height = this.height
        this.ctx = oCanvas.getContext('2d')
        // 初始化
        this.init()
        oCanvas.addEventListener('click', this.canvasClick, false)
    },
    methods: {
        init() {
            // 画外边框
            this.ctx.strokeRect(0, 0, 360, 360)
            this.ctx.strokeStyle = 'gray'
            for(let i = 1; i < 9; i++) {
                // 横
                this.drawLine({
                    startX: 0,
                    startY: this.boxWidth*i,
                    endX: this.width,
                    endY: this.boxWidth*i 
                })
                // 竖
                this.drawLine({
                    startX: this.boxWidth*i,
                    startY: 0,
                    endX: this.boxWidth*i,
                    endY: this.height
                })
            }
        },
        drawLine({ startX, startY, endX, endY }) {
            this.ctx.moveTo(startX, startY)
            this.ctx.lineTo(endX, endY)
            this.ctx.stroke()
        },
        canvasClick(e) {
            // 清除上次选中
            if(this.localPosition) {
                const { startX, startY } = this.localPosition
                this.ctx.clearRect(startX, startY, this.boxWidth, this.boxWidth)
            }

            const { x, y } = this.getEventPosition(e)
            console.log(x, y)
            const { startX, startY, endX, endY } = this.getGridPosition({
                x,
                y
            })
            console.log(startX, startY, endX, endY)
            this.localPosition = {
                startX,
                startY,
                endX,
                endY
            }
            this.ctx.strokeStyle = 'red'
            this.ctx.strokeRect(startX, startY, this.boxWidth, this.boxWidth)
        },
        // 获取点击坐标
        getEventPosition(e) {
            let x, y
            if(e.layerX || e.layerX === 0) {
                x = e.layerX
                y = e.layerY
            }
            else if(e.offsetX || e.offsetX === 0) {
                x = e.offsetX
                y = e.offsetY
            }
            return {
                x,
                y
            }
        },
        // 获取选中格子索引
        getGridPosition({ x, y }) {
            let indexX, indexY, startX, startY, endX, endY
            for(let i = 1; i < 10; i++) {
                const sX = this.boxWidth * (i - 1)
                const eX = this.boxWidth * i
                const sY = this.boxWidth * (i - 1)
                const eY = this.boxWidth * i
                if(x >= sX && x < eX) {
                    indexX = i
                    startX = sX
                    endX = eX
                }
                if(y >= sY && y < eY) {
                    indexY = i
                    startY = sY
                    endY = eY
                }
            }
            return {
                indexX,
                indexY,
                startX,
                startY,
                endX,
                endY
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .canvas-container {
        margin: 50px;
        // width: 500px;
        // height: 500px;
        // border: 1px solid rgba(0, 0, 0, .5);
    }
}
</style>