/**
 * @file Store actions for user.
 */
import { api } from 'src/boot/axios'
import { TeacherStore } from './types'
import { PiniaActions } from 'pinia'

export const actions: PiniaActions<TeacherStore> = {
  async querySchoolStudents(userId: number) {
    const response = await api.get('students', { params: { userId: userId } })

    if (response?.data?.students) {
      this.$patch((state) => {
        state.students = response.data.students
      })
    }
  },

  async createCourse(course: {
    video: number
    titre: string
    description: string
    userId: number
    students: Array<number>
  }) {
    const response = await api.post('cours', {
      ...course,
      videos: [course.video],
    })

    // NOT IMPLEMENTED YET NO RESPONSE DATA
    // if (response?.data?.courses) {
    //   this.$patch((state) => {
    //     state.courses = [...state.courses, response.data.courses]
    //   })
    // }
  },

  async queryCourses(userId: number) {
    const response = await api.get('teacher/cours', { params: { id: userId } })

    if (response?.data) {
      this.$patch((state) => {
        state.courses = response.data
      })
    }
  },
}
