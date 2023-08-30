/**
 * @file Types for user store.
 */
/* eslint-disable no-unused-vars */

import { User } from 'src/types/databaseTypes'
import { Store, PiniaActionTree, PiniaGetterTree, PiniaStateTree } from 'pinia'

export interface UserState extends User, PiniaStateTree {
  isAuthenticated: boolean
}

export interface UserGetters extends PiniaGetterTree {
  getFullName: (state: UserState) => string
}

export interface UserActions extends PiniaActionTree {
  register: (user: UserAuth) => Promise<void>
  login: (user: { email: string; password: string }) => void
}

export type UserStore = Store<'User', UserState, UserGetters, UserActions>

export interface UserState {
  id: number
  firstName: string
  lastName: string
  email: string
  premium: boolean
  role: string
}

export interface UserAuth {
  firstName: string
  lastName: string
  password: string
  email: string
}
