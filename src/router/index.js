import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import netlifyIdentity from 'netlify-identity-widget'

const requireAuth = (to, from, next) => {
  const user = netlifyIdentity.currentUser();
  if (user) {
    next();
  } else {
    next('/login');
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,

  },
  {
    path: '/about',
    name: 'about',
    beforeEnter: requireAuth,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
