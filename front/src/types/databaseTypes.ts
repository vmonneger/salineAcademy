/**
 * @file All types from database.
 */

export type User = {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  premium?: boolean
}

export type School = {
  id?: number
  licenceId?: 3
  name?: string
}

export type Course = {
  id?: number
  title?: string
  titre?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
  userId?: number
  instruments?: Array<string>
}
