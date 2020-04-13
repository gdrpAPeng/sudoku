<template>
  <div class="test-page">
   <h3>Canvas Test</h3>
   <div class="canvas-container">
     <canvas id="canvas" ref="canvas" />
   </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    msg: String
  },
  created() {
    
  },
  mounted() {
    const oCanvas = this.$refs['canvas']
    oCanvas.width = 500
    oCanvas.height = 500
    const ctx = oCanvas.getContext('2d')
    ctx.moveTo(0,0)
    ctx.lineTo(500, 500)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(20, 20, 10, 0, 2*Math.PI)
    ctx.stroke()
    ctx.font='50px Arial'
    ctx.fillText('Canvas Test!', 60, 60)
    // 渐变
    const grd = ctx.createLinearGradient(0, 0, 500, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(0.5, 'blue')
    grd.addColorStop(1, 'white')
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 500, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test-page {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
.canvas-container {
  position: relative;
  margin: 20px auto;
  width: 500px;
  height: 500px;
  border: 1px solid rgba(0,0,0,.5);
}
</style>
