/**
 * @file Helpers for text.
 */

/**
 * Capitalize first letter of a string.
 */
export const capitalizeFirstLetter = (text: string) => {
  if (text) {
    const capitalizedFirst = text[0].toUpperCase()
    const rest = text.slice(1)
    return capitalizedFirst + rest
  } else {
    return ''
  }
}
