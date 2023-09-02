/**
 * @file Define the user store.
 */

import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'

export const useAuthStore = defineStore('Auth', {
  state: state,
  actions: actions,
})
