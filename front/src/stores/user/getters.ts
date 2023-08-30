/**
 * @file Store getters for user.
 */
import { UserState } from './types'

export const getters = {
  getFullName(state: UserState) {
    return state.firstName + ' ' + state.lastName
  },
}
