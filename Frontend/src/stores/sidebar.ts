import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
	state: () => {
		return {
			collapse: false, // 侧边栏是否折叠，默认 false
			bgColor: localStorage.getItem('sidebar-bg-color') || '#324157', // 侧边栏背景色
			textColor: localStorage.getItem('sidebar-text-color') || '#bfcbd9' // 侧边栏文字颜色
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse; // 切换侧边栏的折叠状态。
		},
		setBgColor(color: string) {
			this.bgColor = color;
			localStorage.setItem('sidebar-bg-color', color); // 当用户在设置界面选择了新的侧边栏背景色时，调用此函数更新。
		},
		setTextColor(color: string) {
			this.textColor = color;
			localStorage.setItem('sidebar-text-color', color); // 用户切换侧边栏文字颜色主题时，调用此函数更新。
		}
	}
});
