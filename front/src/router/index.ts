/**
 * @file Router.
 */
import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { checkIfAuthenticated } from 'src/helpers/auth'
import routes from './routes'
import { useUserStore } from 'stores/user'

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
    const userStore = useUserStore()
    const token = localStorage.getItem('token')

    userStore.$patch((state) => (state.isAuthenticated = checkIfAuthenticated(token ?? '')))
    const isAuthenticated = userStore.isAuthenticated

    if (to.meta.requiresAuth) {
      if (!isAuthenticated) {
        return { name: 'Login' }
      }
    }

    if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
      return from
    } else if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
      return { name: 'Login' }
    }
  })
  return Router
})
