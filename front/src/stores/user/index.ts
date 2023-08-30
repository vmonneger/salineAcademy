/**
 * @file Define the user store.
 */

import { defineStore } from 'pinia'
import { getters } from './getters'
import { state } from './state'
import { actions } from './actions'

export const useUserStore = defineStore('User', {
  state: state,
  getters: getters,
  actions: actions,
})
