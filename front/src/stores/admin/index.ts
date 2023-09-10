/**
 * @file Define the user store.
 */

import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'

export const useAdminStore = defineStore('Admin', {
  state: state,
  actions: actions,
})
