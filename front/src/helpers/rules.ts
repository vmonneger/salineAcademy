/* eslint-disable no-unused-vars */
/**
 * @file All rules for input.
 */
import { regexSpecialCharacters, regexSpecialCharactersLight } from './regex'

/**
 * Check if the value is set and if its length is not 0.
 */
export const ruleInputRequired: Array<(val: string) => boolean | string> = [
  (val): boolean | string => (val && val.length > 0) || 'Ce champ est requis',
]

/**
 * Check if input contains special characters (refer to his regex).
 */
export const ruleSpecialCharacters: Array<(val: string) => boolean | string> = [
  (val): boolean | string =>
    !regexSpecialCharacters.test(val) || 'Ces caractères spéciaux [*+?|{[()^$.,#] ne sont pas autorisés',
]

/**
 * Check if input contains special characters (refer to his regex).
 */
export const ruleSpecialCharactersLight: Array<(val: string) => boolean | string> = [
  (val): boolean | string =>
    !regexSpecialCharactersLight.test(val) || 'Ces caractères spéciaux [|{[^] ne sont pas autorisés',
]

/**
 * Rule to use in an input check if the value is set and if its length is not 0.
 *
 */
export const ruleCheckBoxRequired: Array<(a: boolean | { option: string; value: boolean }[]) => boolean | string> = [
  (val): boolean | string => {
    if (Array.isArray(val)) return !val.every((item) => item.value === false) || 'Au moins une case doit être cochée'
    return val || 'Ce champ est requis'
  },
]
