/**
 * @file Routes.
 */
import { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { useQueryState } from 'src/composable/useQueryState'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('pages/AuthPage.vue'),
    meta: { title: 'Enregistrement' },
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('pages/AuthPage.vue'),
    meta: { title: 'Connexion' },
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: () => null,
    beforeEnter: async () => {
      const { clearSavedQueries } = useQueryState()
      const authStore = useAuthStore()

      clearSavedQueries()
      await authStore.logout()
      authStore.$reset()
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
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('pages/CoursesPage.vue'),
        meta: { requiresAuth: true, title: 'Mes cours' },
      },
      {
        path: 'license',
        name: 'License',
        component: () => import('pages/LicensePage.vue'),
        meta: { requiresAuth: true, title: 'Licence' },
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
