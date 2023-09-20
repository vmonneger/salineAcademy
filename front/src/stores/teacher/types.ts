/**
 * @file Types for user store.
 */
/* eslint-disable no-unused-vars */

import { Course, User } from 'src/types/databaseTypes'
import { Store, PiniaActionTree, PiniaStateTree, PiniaGetterTree } from 'pinia'

export interface TeacherState extends PiniaStateTree {
  students: Array<User>
  courses: Array<Course>
}

export type TeacherGetters = PiniaGetterTree

export interface TeacherActions extends PiniaActionTree {
  querySchoolStudents: (userId: number) => void
  createCourse: (course: {
    video: number
    titre: string
    description: string
    userId: number
    students: Array<number>
  }) => void
  queryCourses: (userId: number) => void
}

export type TeacherStore = Store<'Teacher', TeacherState, TeacherGetters, TeacherActions>
