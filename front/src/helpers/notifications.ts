/**
 * @file Helper for notification.
 */

import { Notify } from 'quasar'

/**
 * Display a notification.
 */
export const notification = (message = '', type: 'error' | 'warning' | 'info' | 'primary') => {
  if (type === 'error') {
    return Notify.create({
      color: 'negative',
      textColor: 'white',
      icon: 'sym_s_warning',
      message: message,
    })
  }
  if (type === 'warning') {
    return Notify.create({
      color: 'warning',
      textColor: 'white',
      icon: 'sym_s_warning',
      message: message,
    })
  }
  if (type === 'info') {
    return Notify.create({
      color: 'info',
      textColor: 'white',
      message: message,
    })
  }
  if (type === 'primary')
    return Notify.create({
      color: 'primary',
      textColor: 'white',
      icon: 'sym_s_check_circle',
      message: message,
    })
}

/**
 * Display a notification with the "Enregistré" message.
 */
export const notificationSaved = () => {
  return Notify.create({
    color: 'accent',
    textColor: 'white',
    icon: 'sym_s_check_circle',
    message: 'Enregistré',
  })
}
