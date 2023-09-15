/**
 * @file Store actions for user.
 */
import { useUserStore } from 'stores/user'
import { api } from 'src/boot/axios'
import { UserAuth, AuthStore } from './types'
import { PiniaActions } from 'pinia'

export const actions: PiniaActions<AuthStore> = {
  async register(user: UserAuth) {
    const userStore = useUserStore()

    const response = await api.post('auth/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      premium: false,
    })

    if (response?.data) {
      const user = response.data.user
      userStore.$patch({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        premium: user.premium,
        role: user.role,
      })
      this.$patch((state) => (state.isAuthenticated = true))
    }
  },

  async login(user: { email: string; password: string }) {
    const userStore = useUserStore()

    const response = await api.post('auth/signin', {
      email: user.email,
      password: user.password,
    })

    if (response?.data) {
      const user = response.data.user
      userStore.$patch({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        premium: user.premium,
        role: user.role,
        id: user.id,
      })
      this.$patch((state) => (state.isAuthenticated = true))
    }
  },

  async checkAuth() {
    const response = await api.get('auth/check-auth')

    if (response?.data?.isAuthenticated) {
      this.$patch({
        isAuthenticated: response.data.isAuthenticated,
      })
    }
  },

  async logout() {
    const response = await api.post('auth/logout')

    if (response?.data?.isAuthenticated === false) {
      this.$patch({
        isAuthenticated: response.data.isAuthenticated,
      })
    }
  },

  async updatePassword(newPassword) {
    const userStore = useUserStore()

    await api.post('auth/update-password', {
      userId: userStore.id,
      password: newPassword,
    })

  },
}
