/**
 * @file Store actions for user.
 */
import { api } from 'src/boot/axios'
import { AdminStore } from './types'
import { PiniaActions } from 'pinia'

export const actions: PiniaActions<AdminStore> = {
  async uploadCSV(file) {
    const formData = new FormData()
    formData.append('csv', file)
    formData.append('schoolName', 'Test nom de lecole')

    const response = await api.post('school/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response?.data) {
      this.$patch((state) => {
        state.schools.push(response.data.schools)
        state.users.push(response.data.users)
      })
    }
  },
}
