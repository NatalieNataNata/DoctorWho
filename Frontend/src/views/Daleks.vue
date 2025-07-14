<template>
  <div>
    <h2>Daleks 模型训练</h2>
    <div ref="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const chart = ref(null)
let chartInstance = null

onMounted(() => {
  chartInstance = echarts.init(chart.value)
  const option = {
    title: { text: 'Daleks 模型训练精度' },
    xAxis: { data: ['Epoch1', 'Epoch2', 'Epoch3', 'Epoch4', 'Epoch5'] },
    yAxis: {},
    series: [
      {
        type: 'line',
        data: [0.65, 0.72, 0.78, 0.82, 0.85]
      }
    ]
  }
  chartInstance.setOption(option)
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.dispose()
})
</script>
