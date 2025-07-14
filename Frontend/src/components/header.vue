<template>
    <div class="header">

        <div class="header-left">
            <div class="web-title">Tardis管理系统</div>
        </div>

        <div class="header-right">
            <div class="header-user-con">

                <div class="collapse-btn" @click="collapseChange">
                    <el-icon v-if="sidebar.collapse">
                        <Expand />
                    </el-icon>
                    <el-icon v-else>
                        <Fold />
                    </el-icon>
                </div>

                <div class="btn-icon" @click="setFullScreen">
                    <el-tooltip effect="dark" content="全屏" placement="bottom">
<!--                  <i class="el-icon-lx-full"></i> &lt;!&ndash; 确保这里有图标 &ndash;&gt;-->
                       <FullScreen />
                    </el-tooltip>
                </div>

                <!-- 用户头像 -->
                <el-avatar class="user-avator" :size="30" :src="imgurl" />

                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '../stores/sidebar';
import { useRouter } from 'vue-router';
import imgurl from '../assets/logo.jpg';
import { Expand, Fold, FullScreen, ArrowDown  } from '@element-plus/icons-vue'

const username: string | null = localStorage.getItem('vuems_name');

const sidebar = useSidebarStore();

// 侧边栏折叠
const collapseChange = () => {
    sidebar.handleCollapse();
};

onMounted(() => {
    if (document.body.clientWidth < 1500) {
      // 当页面加载时，如果当前屏幕宽度小于1500px，就执行折叠操作（比如收起导航菜单、侧边栏等），以确保页面在小屏幕上也能正常显示。
        collapseChange();
    }
});

const setFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.body.requestFullscreen.call(document.body);
    }
};

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
    if (command == 'loginout') {
        localStorage.removeItem('vuems_name');
        router.push('/login');
    } else if (command == 'user') {
        router.push('/ucenter');
    }
};
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    color:white;
    background-color:#324157;
    border-bottom: 1px solid #ddd;
    /*  在 .header 元素的 底部，画一条 1 像素、浅灰色、实线 边框。 */
}

.header-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 100%;
}

.logo {
    width: 35px;
}

.web-title {
    margin: 0 40px 0 10px;
    font-size: 22px;
    font-weight: 600;
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif; /* 按顺序优先使用可用的字体 如果有 Roboto 就用，没有就用 Helvetica Neue */
    letter-spacing: 0.5px; /* 字间距微调 */
}

.collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    opacity: 0.8;
    font-size: 22px;
}

.collapse-btn:hover {
    opacity: 1;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-icon {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: white;
    margin: 0 5px;
    font-size: 20px;
}

.user-avator {
    margin: 0 10px 0 20px;
}

.el-dropdown-link {
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
