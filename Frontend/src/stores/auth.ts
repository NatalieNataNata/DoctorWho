import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null |
        { username: string;
        role_id: number },
    token: null as null | string
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    }
  }
});
