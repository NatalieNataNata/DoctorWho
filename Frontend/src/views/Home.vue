<template>
    <div>
      <h1>首页</h1>
      <p>欢迎，{{ username }}</p>
      <button @click="logout">退出登录</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const username = authStore.user.username;
  
  function logout() {
    authStore.logout();
    router.push('/login');
  }
  </script>
  