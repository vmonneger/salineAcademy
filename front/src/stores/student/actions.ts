/**
 * @file Store actions for user.
 */
import { api } from 'src/boot/axios'
import { StudentStore } from './types'
import { PiniaActions } from 'pinia'

export const actions: PiniaActions<StudentStore> = {
  async queryCourses(userId: number) {
    const response = await api.get('student/cours', { params: { id: userId } })

    if (response?.data) {
      this.$patch((state) => {
        state.courses = response.data.cours
      })
    }
  },
}
