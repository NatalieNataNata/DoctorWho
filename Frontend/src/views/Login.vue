<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <img class="logo" src="../assets/logo.jpg" alt="" />
        <div class="login-title">Tardis管理系统</div>
      </div>

      <el-form @submit.prevent="login" autocomplete="off">
        <el-form-item>
          <el-input 
            v-model="username" 
            placeholder="请输入用户名" 
            clearable>
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            clearable>
            <template #prepend>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
          </el-input>
        </el-form-item>
        <div class="remember-forgot-wrapper">
          <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
          <a class="forgot-link" @click.prevent="$router.push('/')">忘记密码</a>

        </div>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <!-- 新增注册提示 -->
        <div class="register-text">
          没有账号？
          <a href="/register">立即注册</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { User, Lock } from '@element-plus/icons-vue';


const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const authStore = useAuthStore();
const router = useRouter();


function login() {
  axios.post('http://127.0.0.1:8001/api/users/login/', {
    username: username.value,
    password: password.value
  })
  .then(res => {
    // console.log('```````````````',res);
    // console.log(res.data.status === 'success'); // true
    if (res.data.status === 'success') {
      console.log('xxxxxxxxxxxxxxxxxres.data.username：',res.data.user.username)
      // 如果后端返回 token，可以 authStore.setToken(res.data.token)
      authStore.setUser({
        username: res.data.user.username,
        role_id: res.data.user.role_id
      });
      // 登录成功，跳转页面
      router.push('dashboard');
    } else {
      console.log("登陆失败")
      alert(res.data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert('登录失败');
  });
}
// function login() {
//   if (username.value.trim() === '') {
//     alert('用户名不能为空');
//     return;
//   }
//   if (password.value.trim() === '') {
//     alert('密码不能为空');
//     return;
//   }
//   if (password.value.length < 6) {
//     alert('密码长度不能少于6位');
//     return;
//   }
//   // 模拟登录逻辑
//   authStore.login(username.value, password.value);
//   // 这里调用了 authStore 的 login 方法执行登录相关业务逻辑
//
//   router.push('/').then(() => {
//     console.log('路由跳转完成了');
//   });
//   // if (username.value.trim() !== '') {
//   //   console.log(router.currentRoute.value.name)
//   //   authStore.login(username.value);
//   //   router.push('/').then(() => {
//   //     console.log('路由跳转完成了');
//   //   });
//   //   console.log(router.currentRoute.value.name)
//   // }
// }
</script>

<style scoped>
::v-deep(.el-input-group__prepend) {
  padding: 0 10px;
}

.login-page {
  min-height: 100vh;
  background:
    linear-gradient(to bottom left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
    url('../assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-container {
  max-width: 280px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  text-align: center;
  background-color: #222; /* 深灰色背景 */
  color: #f0f0f0; /* 全局字体白色 */
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
}

.el-input__wrapper {
  background-color: #333 !important; /* 输入框深色背景 */
  border: 1px solid #555 !important;
}

.el-input__inner {
  color: #f0f0f0 !important;
  padding-right: 20px !important; /* 预留 clearable 按钮空间 */
  box-sizing: border-box;
}

.el-input__inner::placeholder {
  color: #aaa !important;
}

.el-button {
  background-color: #409eff;
  border-color: #409eff;
  width: 100%;
}

.el-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.remember-forgot-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 0 0 10px;
  color: #aaa;
}

.forgot-link {
  color: #aaa;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #f0f0f0;
  text-decoration: underline;
}

.register-text {
  margin-top: 10px;
  font-size: 14px;
  color: #f0f0f0;
}

.register-text a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-text a:hover {
  color: #f0f0f0;
  text-decoration: underline;
}

</style>
