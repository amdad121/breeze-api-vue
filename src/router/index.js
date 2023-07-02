import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login', middleware: 'guest' },
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register', middleware: 'guest' },
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { title: 'Forgot Password', middleware: 'guest' },
      component: () => import('../views/auth/ForgotPassword.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard', middleware: 'auth' },
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      meta: { title: 'Email Verify', middleware: 'auth' },
      component: () => import('../views/auth/VerifyEmail.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      meta: { title: 'Password Reset', middleware: 'auth' },
      component: () => import('../views/auth/PasswordReset.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/About.vue'),
    // },
  ],
})

// router.beforeEach(async (to, from, next) => {
//   document.title = to.meta.title + ' :: ' + import.meta.env.VITE_APP_NAME

//   if (to.meta.middleware == 'guest') {
//     next({ name: 'dashboard' })
//   } else if (to.meta.middleware == 'auth') {
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthStore()

  if (
    to.matched.some((route) => route.meta.middleware === 'guest') &&
    isLoggedIn
  )
    next({ name: 'dashboard' })
  else if (
    to.matched.some((route) => route.meta.middleware === 'auth') &&
    !isLoggedIn
  )
    next({ name: 'login' })
  else next()
})

export default router
