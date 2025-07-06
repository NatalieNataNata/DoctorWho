import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// 从项目路径 src/views/Login.vue 文件中导入默认导出的 Vue 组件
import Login from '@/views/Login.vue';
import { useAuthStore } from '../stores/auth';

// 你的 路由规则配置数组,定义了路径和组件对应关系
const routes = [
  { path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 History 模式管理 URL
  // Vue Router 提供的函数，用来创建路由器实例
  routes,
});
// createRouter 接收一个配置对象，其中：
// history 决定 URL 展示方式
// routes 决定路径和页面的映射关系

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // console.log('to:',to);
  // console.log('to.meta:',to.meta);
  // console.log('to.meta.requiresAuth:',to.meta.requiresAuth);
  if (to.meta.requiresAuth) { // 如果页面 需要登录：
    /*
    如果你想测试路由守卫里判断 requiresAuth 是否生效，应该访问带有 meta.requiresAuth: true 的路由，比如你定义的 Home 路由 /。
    * */
    console.log(authStore.user) // 为什么里面的内容都是undefined
    if (!authStore.user) {
      console.log('authStore.user:',authStore.user)
      // 未登录
      alert('请先登录');
      next('/login'); // 滚回登录页
    } else if (authStore.user.role_id !== 0) {
      // 已登录但不是最高级管理员
      alert('无权限访问');
      next('/login');
    } else {
      // 最高级管理员
      next();
    }
  } else {  // 如果页面 不需要登录，直接放行 next()
    next();
  }
});
// router.beforeEach((to,from) => {
//   const authStore = useAuthStore();
//   console.log('访问路由:', to.name, '即将离开的路由',from.name,'是否已登录:', authStore.isLoggedIn);
//   if (to.name !== 'Login' && !authStore.isLoggedIn) {
//     return { name: 'Login' }; // 导航重定向到命名为 'Login' 的路由。
//   }
// });
// // 每次路由发生跳转时，这个 beforeEach 都会被调用。

export default router;
