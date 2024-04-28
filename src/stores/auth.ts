import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionToken: localStorage.getItem('sessionToken') || null,
  }),
  actions: {
    setSessionToken(token) {
      this.sessionToken = token;
      localStorage.setItem('sessionToken', token);
    },
    clearSessionToken() {
      this.sessionToken = null;
      localStorage.removeItem('sessionToken');
    },
    login(token) {
      this.setSessionToken(token);
    },
    logout() {
      this.clearSessionToken();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.sessionToken,
  },
});
