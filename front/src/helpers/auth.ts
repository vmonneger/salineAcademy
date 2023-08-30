/**
 * @file Helpers for authentication
 */
import jwt_decode, { JwtPayload } from 'jwt-decode'

export const isTokenExpirated = (token: string): boolean | null => {
  const decoded: JwtPayload = jwt_decode(token)
  const currentTime = Date.now() / 1000

  if (decoded && decoded.exp) {
    return currentTime > decoded?.exp
  }
  return null
}

export const checkIfAuthenticated = (token: string): boolean => {
  if (!token || isTokenExpirated(token)) return false
  return true
}
