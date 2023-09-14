/**
 * @file Define the Video store.
 */

import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'

export const useVideoStore = defineStore('Video', {
  state: state,
  actions: actions,
})
