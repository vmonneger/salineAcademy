/**
 * @file Routes.
 */
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth/logout',
    name: 'Logout',
    component: () => import('pages/LogoutPage.vue'),
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
        meta: { title: 'Catalogue' },
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
