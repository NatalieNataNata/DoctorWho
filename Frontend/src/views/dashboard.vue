<template>
  <div class="container">
    <div class="header">
      <h1><i class="el-icon-time tardis-icon"></i> TARDIS 周边销售中心</h1>
      <div>
        <el-button type="primary" icon="el-icon-user">管理员</el-button>
        <el-button type="danger" icon="el-icon-switch-button">退出</el-button>
      </div>
    </div>

    <div class="doctor-who-banner tardis-pulse">
      <div class="banner-content">
        <h2>Doctor Who 周边销售中心</h2>
        <p>探索神秘博士宇宙中最受欢迎的收藏品、服装和道具复制品 - 所有时间领主必备的珍品</p>
      </div>
    </div>

    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg1">
            <i class="el-icon-user-solid"></i>
          </el-icon>
          <div class="card-content">
            <div class="card-num color1">4,289</div>
            <div>时间领主粉丝</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg2">
            <i class="el-icon-chat-dot-round"></i>
          </el-icon>
          <div class="card-content">
            <div class="card-num color2">168</div>
            <div>TARDIS消息</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg3">
            <i class="el-icon-present"></i>
          </el-icon>
          <div class="card-content">
            <div class="card-num color3">888</div>
            <div>周边商品数量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg4">
            <i class="el-icon-shopping-cart-full"></i>
          </el-icon>
          <div class="card-content">
            <div class="card-num color4">568</div>
            <div>今日时间裂缝订单</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mgb20">
      <el-col :span="18">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">时空销售趋势</p>
            <p class="card-header-desc">最近一周不同博士版本周边的销售情况</p>
          </div>
          <div class="chart" ref="chart1"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">热门商品分布</p>
            <p class="card-header-desc">各类Doctor Who周边商品的销售占比</p>
          </div>
          <div class="chart" ref="chart2"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <el-card shadow="hover" :body-style="{ height: '400px' }">
          <div class="card-header">
            <p class="card-header-title">时间线事件</p>
            <p class="card-header-desc">最新的神秘博士宇宙动态</p>
          </div>
          <div class="timeline-container">
            <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-item">
              <div>
                <p>{{ event.title }}</p>
                <p class="timeline-desc">{{ event.description }}</p>
              </div>
              <div class="timeline-time">{{ event.time }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" :body-style="{ height: '400px' }">
          <div class="card-header">
            <p class="card-header-title">全球粉丝分布</p>
            <p class="card-header-desc">Doctor Who粉丝在全球的分布热力图</p>
          </div>
          <div class="map-chart" ref="mapChart"></div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover" :body-style="{ height: '400px' }">
          <div class="card-header">
            <p class="card-header-title">周边商品排行榜</p>
            <p class="card-header-desc">最受欢迎的Doctor Who周边Top5</p>
          </div>
          <div>
            <div v-for="(item, index) in rankings" :key="index" class="rank-item">
              <div class="rank-item-avatar">{{ index + 1 }}</div>
              <div class="rank-item-content">
                <div class="rank-item-top">
                  <div class="rank-item-title">{{ item.name }}</div>
                  <div class="rank-item-desc">销量：{{ item.sales }}</div>
                </div>
                <el-progress
                  :show-text="false"
                  striped
                  :stroke-width="10"
                  :percentage="item.percentage"
                  :color="item.color"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="footer">
      <p>© 2023 TARDIS 周边销售中心 | 时间领主商务部门 | 所有时间与空间维度</p>
      <p>本面板仅用于展示目的，数据来自时间漩涡数据库</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import worldMap from '@/assets/map/world.json'; // 你的存放路径
echarts.registerMap('world', worldMap);

export default {
  name: 'DoctorWhoDashboard',
  setup() {
    const chart1 = ref(null);
    const chart2 = ref(null);
    const mapChart = ref(null);

    const timelineEvents = ref([
      { title: '新版音速起子发布', description: '第14任博士同款音速起子预售开启', time: '30分钟前' },
      { title: 'Dalek 玩偶补货', description: '限量版金色Dalek玩偶已补货', time: '55分钟前' },
      { title: 'TARDIS 模型订单', description: '粉丝订购了1:10比例发光TARDIS模型', time: '1小时前' },
      { title: '周年纪念版蓝光套装', description: '60周年特别版蓝光套装开始预订', time: '15小时前' },
      { title: '神秘博士cosplay服装', description: '第13任博士同款服装上架', time: '1天前' }
    ]);

    const rankings = ref([
      { name: '音速起子复制品', sales: '2,890', percentage: 85, color: '#f25e43' },
      { name: 'TARDIS 桌面模型', sales: '2,150', percentage: 75, color: '#00bcd4' },
      { name: 'Dalek 玩偶', sales: '1,980', percentage: 70, color: '#64d572' },
      { name: '博士围巾', sales: '1,750', percentage: 65, color: '#e9a745' },
      { name: 'Cyberman 头盔', sales: '1,520', percentage: 60, color: '#9c27b0' }
    ]);

    onMounted(() => {
      // 初始化销售趋势图表
      const chart1Instance = echarts.init(chart1.value);
      chart1Instance.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['第10任博士', '第11任博士', '第12任博士', '第13任博士', '第14任博士'],
          textStyle: { color: '#a0b3c6' }
        },
        grid: {
          left: '3%', right: '4%', bottom: '3%', containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: { lineStyle: { color: '#a0b3c6' } }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#a0b3c6' } },
          splitLine: { lineStyle: { color: 'rgba(160, 179, 198, 0.1)' } }
        },
        series: [
          { name: '第10任博士', type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210], lineStyle: { color: '#f25e43' }, itemStyle: { color: '#f25e43' } },
          { name: '第11任博士', type: 'line', smooth: true, data: [220, 182, 191, 234, 290, 330, 310], lineStyle: { color: '#00bcd4' }, itemStyle: { color: '#00bcd4' } },
          { name: '第12任博士', type: 'line', smooth: true, data: [150, 232, 201, 154, 190, 330, 410], lineStyle: { color: '#64d572' }, itemStyle: { color: '#64d572' } },
          { name: '第13任博士', type: 'line', smooth: true, data: [320, 332, 301, 334, 390, 330, 320], lineStyle: { color: '#e9a745' }, itemStyle: { color: '#e9a745' } },
          { name: '第14任博士', type: 'line', smooth: true, data: [420, 532, 501, 534, 590, 530, 520], lineStyle: { color: '#9c27b0' }, itemStyle: { color: '#9c27b0' } }
        ]
      });

      // 初始化商品分布图表
      const chart2Instance = echarts.init(chart2.value);
      chart2Instance.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: { color: '#a0b3c6' },
          data: ['音速起子', 'TARDIS模型', '服装', '玩偶', '书籍', '影音', '其他']
        },
        series: [{
          name: '商品分布',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'rgba(16, 36, 62, 1)',
            borderWidth: 2
          },
          label: { show: false, position: 'center' },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              color: '#e6f7ff'
            }
          },
          labelLine: { show: false },
          data: [
            {value: 335, name: '音速起子', itemStyle: {color: '#00bcd4'}},
            {value: 310, name: 'TARDIS模型', itemStyle: {color: '#2d8cf0'}},
            {value: 234, name: '服装', itemStyle: {color: '#64d572'}},
            {value: 135, name: '玩偶', itemStyle: {color: '#e9a745'}},
            {value: 154, name: '书籍', itemStyle: {color: '#f25e43'}},
            {value: 120, name: '影音', itemStyle: {color: '#9c27b0'}},
            {value: 102, name: '其他', itemStyle: {color: '#a0b3c6'}}
          ]
        }]
      });

      // 初始化地图图表
      const mapChartInstance = echarts.init(mapChart.value);
      mapChartInstance.setOption({
        backgroundColor: 'transparent',
        title: {
          text: '全球粉丝热度分布',
          left: 'center',
          textStyle: { color: '#e6f7ff' }
        },
        tooltip: { trigger: 'item' },
        visualMap: {
          min: 0, max: 5000,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027']
          },
          textStyle: { color: '#a0b3c6' }
        },
        series: [{
          name: '粉丝数量',
          type: 'map',
          map: 'world',
          roam: true,
          emphasis: {
            label: { show: true, color: '#e6f7ff' }
          },
          data: [
            {name: '英国', value: 4560},
            {name: '美国', value: 3890},
            {name: '澳大利亚', value: 2780},
            {name: '加拿大', value: 2450},
            {name: '德国', value: 1980},
            {name: '法国', value: 1760},
            {name: '日本', value: 1540},
            {name: '巴西', value: 1320},
            {name: '中国', value: 1250},
            {name: '俄罗斯', value: 980}
          ]
        }]
      });

      // 响应式调整
      window.addEventListener('resize', () => {
        chart1Instance.resize();
        chart2Instance.resize();
        mapChartInstance.resize();
      });
    });

    return {
      chart1,
      chart2,
      mapChart,
      timelineEvents,
      rankings
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(64, 158, 255, 0.3);
}
.header h1 {
  font-size: 32px;
  background: linear-gradient(90deg, #64d572, #2d8cf0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 15px;
}
.tardis-icon {
  font-size: 36px;
  color: #00bcd4;
  animation: pulse 2s infinite;
}
.el-row {
  margin-bottom: 20px;
}
.el-card {
  border-radius: 12px;
  border: 1px solid rgba(64, 158, 255, 0.2);
  background: rgba(16, 36, 62, 0.7) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
}
.el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 188, 212, 0.4);
  border-color: rgba(0, 188, 212, 0.4);
}
.card-body {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0;
}
.card-content {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #a0b3c6;
  padding: 0 20px;
}
.card-num {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
}
.card-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.bg1 { background: linear-gradient(135deg, #2d8cf0, #1a5bb0); }
.bg2 { background: linear-gradient(135deg, #64d572, #3a9e4d); }
.bg3 { background: linear-gradient(135deg, #f25e43, #c03a2b); }
.bg4 { background: linear-gradient(135deg, #e9a745, #c88515); }
.color1 { color: #2d8cf0; }
.color2 { color: #64d572; }
.color3 { color: #f25e43; }
.color4 { color: #e9a745; }
.chart {
  width: 100%;
  height: 400px;
}
.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}
.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #64d572;
}
.card-header-desc {
  font-size: 14px;
  color: #a0b3c6;
}
.timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #e6f7ff;
  padding: 12px 0;
  border-bottom: 1px dashed rgba(100, 213, 114, 0.2);
}
.timeline-time, .timeline-desc {
  font-size: 12px;
  color: #a0b3c6;
}
.rank-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(26, 54, 93, 0.5);
  border-radius: 8px;
}
.rank-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(100, 213, 114, 0.2);
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
  font-weight: bold;
  color: #64d572;
}
.rank-item-content {
  flex: 1;
}
.rank-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e6f7ff;
  margin-bottom: 10px;
}
.rank-item-desc {
  font-size: 14px;
  color: #a0b3c6;
}
.map-chart {
  width: 100%;
  height: 350px;
}
.doctor-who-banner {
  height: 200px;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
              url('https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1792&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}
.banner-content {
  text-align: center;
  z-index: 2;
}
.banner-content h2 {
  font-size: 36px;
  margin-bottom: 15px;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 188, 212, 0.8);
}
.banner-content p {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
  color: #e6f7ff;
}
.tardis-pulse::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.4) 0%, transparent 70%);
  animation: pulse 3s infinite;
  z-index: 1;
}
.footer {
  text-align: center;
  padding: 20px;
  margin-top: 30px;
  color: #a0b3c6;
  font-size: 14px;
  border-top: 1px solid rgba(64, 158, 255, 0.2);
}

@media (max-width: 1200px) {
  .el-col {
    margin-bottom: 20px;
  }
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 0.4; }
  100% { transform: scale(0.8); opacity: 0.7; }
}
</style>