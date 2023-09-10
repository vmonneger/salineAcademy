/**
 * @file User state store.
 */
import { AdminState } from './types'

export const state = (): AdminState => ({
  users: [],
  schools: [],
})
