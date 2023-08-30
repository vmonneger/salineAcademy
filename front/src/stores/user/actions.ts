/**
 * @file Store actions for user.
 */
import { api } from 'src/boot/axios'
import { UserAuth, UserStore } from './types'
import { PiniaActions } from 'pinia'

export const actions: PiniaActions<UserStore> = {
  async register(user: UserAuth): Promise<void> {
    const response = await api.post('auth/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      premium: false,
    })

    if (response.data) {
      localStorage.setItem('token', response.data.token)
      const user = response.data.user
      this.$patch({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        premium: user.premium,
        role: user.role,
      })
    }
  },

  async login(user: { email: string; password: string }): Promise<void> {
    const response = await api.post('auth/signin', {
      email: user.email,
      password: user.password,
    })

    if (response.data) {
      localStorage.setItem('token', response.data.token)
      const user = response.data.user
      this.$patch({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        premium: user.premium,
        role: user.role,
        id: user.id,
      })
    }
  },
}
