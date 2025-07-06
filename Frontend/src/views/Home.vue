<template>
  <div class="home-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="particles">
      <span
        v-for="(particle, index) in particles"
        :key="index"
        class="particle"
        :style="getParticleStyle(particle)"
      ></span>
    </div>
    <div class="card">
      <h1 class="title">首页</h1>
      <p class="welcome-text">欢迎，<span class="username">{{ username }}</span></p>
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = authStore.user?.username ?? '用户';

function logout() {
  authStore.logout();
  router.push('/login');
}

// 粒子数据结构
interface Particle {
  x: number; // 初始x百分比 (0~100)
  y: number; // 初始y百分比 (0~100)
  size: number; // 粒子大小 px
  baseX: number; // 基础x（像素）
  baseY: number; // 基础y（像素）
  speedX: number; // x方向漂浮速度（像素/帧）
  speedY: number; // y方向漂浮速度（像素/帧）
  offsetX: number; // 当前偏移x
  offsetY: number; // 当前偏移y
}

const particlesCount = 50;
const particles = reactive<Particle[]>([]);

const containerWidth = ref(0);
const containerHeight = ref(0);

const mouse = reactive({ x: 0, y: 0, active: false });

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particlesCount; i++) {
    const px = Math.random() * 100;
    const py = Math.random() * 100;
    const size = Math.random() * 2 + 1; // 1~3px
    particles.push({
      x: px,
      y: py,
      size,
      baseX: 0,
      baseY: 0,
      speedX: (Math.random() - 0.5) * 0.2, // -0.1 ~ 0.1 px/frame
      speedY: (Math.random() - 0.5) * 0.2,
      offsetX: 0,
      offsetY: 0,
    });
  }
}

function updateBasePositions() {
  particles.forEach(p => {
    p.baseX = (p.x / 100) * containerWidth.value;
    p.baseY = (p.y / 100) * containerHeight.value;
  });
}

function animateParticles() {
  particles.forEach(p => {
    // 漂浮运动
    p.baseX += p.speedX;
    p.baseY += p.speedY;

    // 边界反弹
    if (p.baseX < 0 || p.baseX > containerWidth.value) p.speedX = -p.speedX;
    if (p.baseY < 0 || p.baseY > containerHeight.value) p.speedY = -p.speedY;

    // 鼠标追随偏移（靠近鼠标时偏移较大）
    if (mouse.active) {
      const dx = mouse.x - p.baseX;
      const dy = mouse.y - p.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150; // 最大影响距离
      if (dist < maxDist) {
        // 反向移动，制造“排斥”感觉，越近偏移越大
        const force = (maxDist - dist) / maxDist;
        const angle = Math.atan2(dy, dx);
        p.offsetX = -Math.cos(angle) * force * 20;
        p.offsetY = -Math.sin(angle) * force * 20;
      } else {
        // 逐渐回归0偏移
        p.offsetX *= 0.9;
        p.offsetY *= 0.9;
      }
    } else {
      // 没有鼠标时，偏移慢慢归零
      p.offsetX *= 0.9;
      p.offsetY *= 0.9;
    }
  });

  requestAnimationFrame(animateParticles);
}

function getParticleStyle(p: Particle) {
  const x = p.baseX + p.offsetX;
  const y = p.baseY + p.offsetY;
  return {
    width: p.size + 'px',
    height: p.size + 'px',
    transform: `translate3d(${x}px, ${y}px, 0)`,
    opacity: 0.7,
  };
}

function handleMouseMove(e: MouseEvent) {
  mouse.active = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function handleMouseLeave() {
  mouse.active = false;
}

onMounted(() => {
  const container = document.querySelector('.home-container') as HTMLElement;
  containerWidth.value = container.clientWidth;
  containerHeight.value = container.clientHeight;

  initParticles();
  updateBasePositions();
  animateParticles();

  // 容器尺寸变化监听，动态更新
  window.addEventListener('resize', () => {
    containerWidth.value = container.clientWidth;
    containerHeight.value = container.clientHeight;
    updateBasePositions();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {});
});
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  background: #0a0a14; /* 深夜宇宙蓝黑色 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.particles {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, #ffffffcc 0%, #ffffff00 70%);
  border-radius: 50%;
  filter: drop-shadow(0 0 2px #8ab4f8);
  will-change: transform;
}

.card {
  position: relative;
  background-color: #1a1a2e;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(18, 18, 48, 0.9);
  text-align: center;
  max-width: 360px;
  width: 100%;
  user-select: none;
  z-index: 1;
  color: #ddd;
}

.title {
  margin-bottom: 16px;
  font-size: 2.5rem;
  color: #e3e3ff;
  text-shadow: 0 0 10px #aabaff;
}

.welcome-text {
  font-size: 1.2rem;
  margin-bottom: 32px;
  color: #bbb;
}

.username {
  font-weight: 600;
  color: #fff;
}

.logout-btn {
  background-color: #282848;
  color: #ccc;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(40, 40, 72, 0.9);
}

.logout-btn:hover {
  background-color: #414175;
  box-shadow: 0 6px 25px rgba(65, 65, 117, 1);
}
</style>
