/**
 * @file Store actions for user.
 */
import { api } from 'src/boot/axios'
import { UserStore } from './types'
import { PiniaActions } from 'pinia'

export const actions: PiniaActions<UserStore> = {
  async currentUser() {
    const response = await api.get('user/current')

    if (response?.data?.user) {
      const user = response.data.user

      this.$patch({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        premium: user.premium,
        role: user.role.name,
        id: user.id,
      })
    }
  },
}
