/**
 * @file actions for video store.
 */
/* eslint-disable no-unused-vars */

import { Video, VideoStore } from './types'
import { PiniaActions } from 'pinia'
import { api } from 'src/boot/axios'

export const actions: PiniaActions<VideoStore> = {
  async getVideos() {
    const response = await api.get('videos')

    if (response?.data) {
      this.$patch((state) => (state.videos = response.data.data))
    }
  },
}
