/**
 * @file Types for user store.
 */
/* eslint-disable no-unused-vars */
import { Store, PiniaActionTree, PiniaStateTree, PiniaGetterTree } from 'pinia'

export interface AuthState extends PiniaStateTree {
  isAuthenticated: boolean
}

export type AuthGetters = PiniaGetterTree

export interface AuthActions extends PiniaActionTree {
  register: (user: UserAuth) => void
  login: (user: { email: string; password: string }) => void
  checkAuth: () => void
  logout: () => void
}

export type AuthStore = Store<'Auth', AuthState, AuthGetters, AuthActions>

export interface UserAuth {
  firstName: string
  lastName: string
  password: string
  email: string
}
