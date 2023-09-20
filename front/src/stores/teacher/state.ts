/**
 * @file User state store.
 */
import { TeacherState } from './types'

export const state = (): TeacherState => ({
  students: [],
  courses: [],
})
