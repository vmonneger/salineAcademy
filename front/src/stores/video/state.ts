/**
 * @file State for video store.
 */
import { Video, VideoState } from './types'

export const state = (): VideoState => ({
  videos: [] as Array<Video>,
})
