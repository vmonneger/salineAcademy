/**
 * @file Router.
 */
import { computed } from 'vue'
import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useQueryState } from 'src/composable/useQueryState'
import routes from './routes'
import { useAuthStore } from 'stores/auth'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })
  Router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    const { isQueryFetched } = useQueryState()

    await isQueryFetched('checkAuth', async () => {
      await authStore.checkAuth()
    })

    const isAuthenticated = computed(() => authStore.isAuthenticated)

    if (to.meta.requiresAuth) {
      if (from.name === 'Login' || from.name === 'Register')
        if (!isAuthenticated.value) {
          return { name: 'Login' }
        }
    }

    if (isAuthenticated.value && (to.name === 'Login' || to.name === 'Register')) {
      return from
    } else if (!isAuthenticated.value && to.name !== 'Login' && to.name !== 'Register') {
      return { name: 'Login' }
    }
  })
  return Router
})
