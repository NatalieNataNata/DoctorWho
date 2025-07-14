<template>
  <div>
    <h2>柱状图 + 折线图</h2>
    <div ref="barLineRef" style="width: 600px; height: 400px;"></div>

    <h2>饼图</h2>
    <div ref="pieRef" style="width: 600px; height: 400px;"></div>

    <h2>散点图示例</h2>
    <div ref="scatterRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 定义 DOM 引用
const barLineRef = ref(null)
const pieRef = ref(null)
const scatterRef = ref(null)

// 定义图表实例
let barLineChart = null
let pieChart = null
let scatterChart = null

// 页面加载后初始化
onMounted(() => {
  // === 1. 柱状图 + 折线图 ===
  barLineChart = echarts.init(barLineRef.value)
  const barLineOption = {
    title: {
      text: '柱状图 + 折线图'
    },
    tooltip: {
      trigger: 'axis' // 当鼠标在axis(坐标轴)范围内移动时触发 tooltip
    },
    legend: { // legend（图例） 用于展示图表中各个系列（series）的名称，帮助用户区分不同的数据类别或指标。
      data: ['销售额', '增长率']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      { type: 'value', name: '销售额' },
      { type: 'value', name: '增长率' }
    ],
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130]
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        data: [5, 15, 8, 12, 10, 6, 7]
      }
    ]
  }
  barLineChart.setOption(barLineOption)

  // === 2. 饼图 ===
  pieChart = echarts.init(pieRef.value)
  const pieOption = {
    title: {
      text: '访问来源',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  pieChart.setOption(pieOption)

  // 监听窗口大小变化，图表自适应
  window.addEventListener('resize', resizeCharts)

  // === 3. 散点图 ===
  scatterChart = echarts.init(scatterRef.value)
  const option = {
    title: {
      text: '散点图示例'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `(${params.data[0]}, ${params.data[1]})`
      }
    },
    xAxis: {
      type: 'value',
      name: 'X 轴'
    },
    yAxis: {
      type: 'value',
      name: 'Y 轴'
    },
    series: [{
      symbolSize: 20,
      data: [
        [10, 8],
        [15, 12],
        [20, 20],
        [25, 18],
        [30, 25]
      ],
      type: 'scatter'
    }]
  }

  scatterChart.setOption(option)
  window.addEventListener('resize', scatterChart.resize)
})

// 页面卸载前销毁实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts)
  window.removeEventListener('resize', scatterChart.resize)
  scatterChart.dispose()
  barLineChart.dispose()
  pieChart.dispose()
})

// 图表自适应
function resizeCharts() {
  barLineChart.resize()
  pieChart.resize()
}
</script>
