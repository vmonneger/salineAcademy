/**
 * @file Axios init.
 */
import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
declare module '@vue/runtime-core' {
  // eslint-disable-next-line
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.DEV ? 'http://localhost/api/' : 'https://salinehetic.tech/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  return config
})

export default boot(({ app, router }) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (401 === error.response?.status) {
        router.push({ name: 'Logout' })
      }
      return Promise.reject(error)
    }
  )
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
