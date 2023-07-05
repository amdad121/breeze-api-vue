import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home', middleware: [] },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login', middleware: ['guest'] },
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register', middleware: ['guest'] },
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { title: 'Forgot Password', middleware: ['guest'] },
      component: () => import('../views/auth/ForgotPassword.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard', middleware: ['auth', 'verified'] },
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      meta: { title: 'Email Verify', middleware: ['auth'] },
      component: () => import('../views/auth/VerifyEmail.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      meta: { title: 'Password Reset', middleware: ['auth'] },
      component: () => import('../views/auth/PasswordReset.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ' :: ' + import.meta.env.VITE_APP_NAME

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    await auth.fetchUser()
  }

  if (to.meta.middleware.includes('guest') && auth.isLoggedIn) next({ name: 'dashboard' })
  else if (
    to.meta.middleware.includes('verified') &&
    auth.isLoggedIn &&
    !auth.user.email_verified_at
  )
    next({ name: 'verify-email' })
  else if (to.meta.middleware.includes('auth') && !auth.isLoggedIn) next({ name: 'login' })
  else next()
})

export default router
