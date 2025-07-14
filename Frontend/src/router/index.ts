import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// 从项目路径 src/views/Login.vue 文件中导入默认导出的 Vue 组件
import Login from '@/views/Login.vue';
import BasicInfo from '../views/BasicInfo.vue';
import Daleks from '../views/Daleks.vue';
import Merchandise from '../views/Merchandise.vue';
import { useAuthStore } from '../stores/auth';


// 你的 路由规则配置数组,定义了路径和组件对应关系
const routes = [
  {
      path: '/',
      redirect: '/login', // 此路由 直接重定向到其他路径，不会渲染 component
      // component: Login,
  },
 {
      path: '/login',
      meta: {
          title: '登录',
          requiresAuth: false,
      },
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name:'Home',
    component: Home,
    // meta: { requiresAuth: true }, // 表示此父路由及其所有子路由默认需要鉴权。
    children: [
      {
          path: 'dashboard',
          name: 'dashboard',  // 路由的唯一标识符。使用 router.push({ name: 'dashboard' }) 进行命名路由跳转。
          meta: {
              title: '系统首页', // 路由的元信息，这里的 title 通常用于页面显示标题。
              requiresAuth: false,
          },
          component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
      },
      {
        path: 'basic',
        name: 'BasicInfo',
        component: BasicInfo,
        meta: {
          title: '简介信息',
          requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/BasicInfo.vue'),
      },
      {
        path: 'daleks',
        name: 'Daleks',
        component: Daleks,
        meta: {
          title: 'Daleks定制',
          requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Daleks.vue'),
      },
      {
        path: 'merchandise',
        name: 'Merchandise',
        component: Merchandise,
        meta: {
          title: '周边售卖',
          requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Merchandise.vue'),
      }
    ]
  }
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
    // console.log(authStore.user) // 为什么里面的内容都是undefined
    if (!authStore.user) {
      // console.log('authStore.user:',authStore.user)
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

export default router;
