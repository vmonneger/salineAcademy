/**
 * @file Helper for files manipulation.
 */

/**
 * Dynamic import assets.
 */
export const getFileFromAssets = (name: string): string => {
  return new URL(`/src/assets/${name}`, import.meta.url).href ?? ''
}
