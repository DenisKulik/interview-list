import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/PageHome.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/PageAuth.vue')
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: () => import('@/views/PageInterview.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/PageList.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/PageStatistic.vue'),
    meta: { requireAuth: true }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.requireAuth
  const auth = getAuth()

  const checkUser = new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe()
      resolve(currentUser)
    })
  })

  const currentUser = await checkUser

  if (requireAuth && !currentUser) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

export default router
