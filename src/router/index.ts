import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../pages/LandingPage.vue'),
      meta: { title: 'ApexRetail | Marketplace for premium websites' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
      meta: { title: 'Browse websites' },
    },
    {
      path: '/products/:slug',
      name: 'product-details',
      component: () => import('../pages/ProductDetailsPage.vue'),
      meta: { title: 'Website details' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/CartPage.vue'),
      meta: { title: 'Your cart' },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../pages/CheckoutPage.vue'),
      meta: { requiresAuth: true, title: 'Checkout' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../pages/AuthPage.vue'),
      meta: { title: 'Authentication' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { title: 'Login' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/RegisterPage.vue'),
      meta: { title: 'Register' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/user/SettingsPage.vue'),
      meta: { requiresAuth: true, title: 'Account settings' },
    },
    {
      path: '/likes',
      name: 'likes',
      component: () => import('../pages/user/LikesPage.vue'),
      meta: { requiresAuth: true, title: 'Wishlist' },
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../pages/user/OrdersPage.vue'),
      meta: { requiresAuth: true, title: 'Orders & downloads' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../pages/ContactPage.vue'),
      meta: { title: 'Contact us' },
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('../pages/admin/AdminDashboardPage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin dashboard' },
    },
    {
      path: '/admin/websites',
      name: 'admin-websites',
      component: () => import('../pages/admin/AdminWebsitesPage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, title: 'Manage websites' },
    },
    {
      path: '/admin/websites/new',
      name: 'admin-websites-new',
      component: () => import('../pages/admin/AdminNewWebsitePage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, title: 'Create new website' },
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('../pages/admin/AdminOrdersPage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, title: 'Manage orders' },
    },
    {
      path: '/admin/notifications',
      name: 'admin-notifications',
      component: () => import('../pages/admin/AdminNotificationsPage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, title: 'Notifications' },
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../pages/admin/AdminUsersPage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, title: 'User Management' },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../pages/WelcomePage.vue'),
      meta: { title: 'Welcome to ApexRetail' },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'auth', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { name: 'home' }
  }

  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
})

export default router
