/**
 * @file Types for user store.
 */
/* eslint-disable no-unused-vars */
import { User, School } from 'src/types/databaseTypes'
import { Store, PiniaActionTree, PiniaStateTree, PiniaGetterTree } from 'pinia'

export interface AdminState extends PiniaStateTree {
  users: Array<User>
  schools: Array<School>
}

export type AdminGetters = PiniaGetterTree

export interface AdminActions extends PiniaActionTree {
  uploadCSV: (file: Blob) => void
}

export type AdminStore = Store<'Admin', AdminState, AdminGetters, AdminActions>
