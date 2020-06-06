import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/articles',
    name: 'ArticleForm',
    component: () => import('../views/articles/Form.vue'),
    meta: { auth: true }
  },
  {
    path: '/articles/:id',
    name: 'ArticleShow',
    component: () => import('../views/articles/Show.vue')
  },
  {
    path: '*',
    name: 'error',
    component: () => import('../views/error/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
