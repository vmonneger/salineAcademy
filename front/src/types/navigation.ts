/**
 * @file Type declaration for navigation.
 */

import { RouteLocationRaw } from 'vue-router'

export interface Link {
  name?: string
}

export interface Navigation {
  label: string
  link: string | RouteLocationRaw
  icon?: string
  disabled?: boolean
  class?: string
  role?: Array<string>
}

export interface DropdownLabel {
  name?: string
  loading?: boolean
  image?: string
}
