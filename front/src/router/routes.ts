/**
 * @file Routes.
 */
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('pages/AuthPage.vue'),
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('pages/AuthPage.vue'),
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: () => null,
    beforeEnter: () => {
      localStorage.removeItem('token')
      return { name: 'Login' }
    },
  },

  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    redirect: {
      name: 'Catalog',
    },
    children: [
      {
        path: 'catalog',
        name: 'Catalog',
        component: () => import('pages/CatalogPage.vue'),
        meta: { requiresAuth: true, title: 'Catalogue' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
