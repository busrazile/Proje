import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import Login from '../components/login/Login.vue'
import LoginCallback from '../components/login/LoginCallback.vue'
import SearchResult from '../components/SearcResult.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/movie/:movie_id',
      name: 'detailMovie',
      component: DetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: '/login-callback',
      name: 'login-callback',
      component: LoginCallback
    },
    {
      path: '/search',
      name: 'search-result',
      component: SearchResult,
      meta: { requiresAuth: false },
    },
  ]
})

// Navigation guard ekliyoruz
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
