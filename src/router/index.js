import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import netlifyIdentity from 'netlify-identity-widget'
import ListAccounts from '../views/Account/ListAccounts.vue'
import AddAccount from '../views/Account/AddAccount.vue'
import ListSocials from '../views/Social/ListSocials.vue'
import AddSocial from '../views/Social/AddSocial.vue'

const requireAuth = (to, from, next) => {
  const user = netlifyIdentity.currentUser();
  if (user) {
    console.log(netlifyIdentity.currentUser().id());
    next();
  } else {
    netlifyIdentity.open('login');
    
    next('/login');
  }
};

const isGuest = (to, from, next) => {
  const user = netlifyIdentity.currentUser();
  if(user) {
    router.go(-1)
  }  else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: isGuest,
  },
  {
    path: '/all_accounts',
    name: 'all_accounts',
    component: ListAccounts,
    beforeEnter: requireAuth
  },
  {
    path: '/add_account',
    name: 'add_account',
    component: AddAccount,
    beforeEnter: requireAuth
  },
  {
    path: '/all_socials',
    name: 'all_socials',
    component: ListSocials,
    beforeEnter: requireAuth
  },
  {
    path: '/add_social',
    name: 'add_social',
    component: AddSocial,
    beforeEnter: requireAuth
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
