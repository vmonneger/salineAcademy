/**
 * @file Types for user store.
 */
/* eslint-disable no-unused-vars */

import { Store, PiniaActionTree, PiniaGetterTree, PiniaStateTree } from 'pinia'

export interface VideoState extends PiniaStateTree {
  videos: Array<Video>
}

export type VideoGetters = PiniaGetterTree

export interface VideoActions extends PiniaActionTree {
  getVideos: () => void
}

export type VideoStore = Store<'Video', VideoState, VideoGetters, VideoActions>

export interface Video {
  id: number
  title: string
  url: string
  subtitle: string
  image: string
  description: string
  format: { name: string }
  instrument: { name: string }
  langues: Array<{ name: string }>
  master: { name: string }
  sous_titres: Array<{ name: string }>
}
