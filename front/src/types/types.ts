/**
 * @file General types.
 */

export interface QuasarFileMetadata extends Blob {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  __img?: string
  __key?: string
  __progress?: number
  __progressLabel?: string
  __sizeLabel?: string
  __status?: string
  __uploaded?: number
  lastModified?: number
  lastModifiedDate?: Date
  name?: string
  webkitRelativePath?: string
}
