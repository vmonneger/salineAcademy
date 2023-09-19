/**
 * @file Define the user store.
 */

import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'
import { getters } from './getters'

export const useStudentStore = defineStore('Student', {
  state: state,
  getters: getters,
  actions: actions,
})
