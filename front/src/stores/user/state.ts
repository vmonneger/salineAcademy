/**
 * @file User state store.
 */
import { UserState } from './types'

export const state = (): UserState => ({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  premium: false,
  role: '',
})
