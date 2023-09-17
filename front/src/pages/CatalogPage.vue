<script setup lang="ts">
/**
 * @file Index page.
 */
import { ref, onMounted, computed } from 'vue'
import TheFilterVideos from 'src/features/catalog/TheFilterVideos.vue'
import { AppHeading, AppCardVideo, AppText as txt } from 'components'
import { useVideoStore } from 'stores/video'
import { Video } from 'stores/video/types'

const videoStore = useVideoStore()

const videos = ref([] as Array<Video>)
const videosStore = computed(() => videoStore.videos)

onMounted(async () => {
  try {
    await videoStore.getVideos()
  } catch (error) {
    console.error(error)
  }
})

const getVideoFiltered = (videosFiltered: Array<Video>) => {
  videos.value = videosFiltered
}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <AppHeading>Catalogue des masterclass</AppHeading>
    </div>
    <div class="col-12">
      <TheFilterVideos @videosFiltered="getVideoFiltered" :videos="videosStore" style="width: 100%" />
    </div>
    <div class="col-12 row justify-center">
      <div v-if="!videos.length" class="q-mt-xl">
        <txt size="lg" color="neutral">Aucune vidéo n'a été trouvée</txt>
      </div>
      <div class="col-12 col-sm-4 col-md-3" v-for="(video, index) in videos" :key="index">
        <AppCardVideo
          :image="video.url"
          :badgeName="video.format.name"
          :title="video.title"
          :langues="video.langues"
          :description="video.description"
        />
      </div>
    </div>
  </div>
</template>
