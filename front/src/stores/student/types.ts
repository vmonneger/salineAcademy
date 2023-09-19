/**
 * @file Types for user store.
 */
/* eslint-disable no-unused-vars */

import { Course, User } from 'src/types/databaseTypes'
import { Store, PiniaActionTree, PiniaStateTree, PiniaGetterTree } from 'pinia'

export interface StudentState extends PiniaStateTree {
  courses: Array<Course & { user: { teacherFirstName: string; teacherLastName: string } }>
}

export type StudentGetters = PiniaGetterTree

export interface StudentActions extends PiniaActionTree {
  queryCourses: (userId: number) => void
}

export type StudentStore = Store<'Student', StudentState, StudentGetters, StudentActions>
