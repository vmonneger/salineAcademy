<script setup lang="ts">
/**
 * @file Index page.
 */
import { ref, onMounted, computed } from 'vue'
import TheFilterVideos from 'src/features/catalog/TheFilterVideos.vue'
import { AppInput, AppHeading, AppCardVideo, AppTag } from 'components'
import { useVideoStore } from 'stores/video'

const videoStore = useVideoStore()

const videoFilters = ref([] as string[])
const videos = computed(() => videoStore.videos)

onMounted(async () => {
  try {
    await videoStore.getVideos()
  } catch (error) {
    console.error(error)
  }
})

const handleVideoFilters = (filtersArray: Array<string>) => {
  videoFilters.value = filtersArray
}

const handleTagFilters = (filterTag: string) => {
  return (videoFilters.value = videoFilters.value.filter((filter) => filter !== filterTag))
}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <AppHeading>Catalogue des masterclass</AppHeading>
    </div>
    <div class="col-12 col-sm-6">
      <AppInput
        size="lg"
        placeholder="Rechercher un professeur, un compositeur, un instrument, un morceau"
        iconRight="sym_s_search"
      />
    </div>
    <div class="col-12 col-sm-4 col-md-auto">
      <TheFilterVideos v-model="videoFilters" @filters="handleVideoFilters" style="width: 100%" />
    </div>
    <div v-if="videoFilters.length" class="col-12 row q-gutter-md">
      <div v-for="filter in videoFilters" :key="filter">
        <AppTag @delete-tag="handleTagFilters(filter)">{{ filter }}</AppTag>
      </div>
    </div>
    <div class="col-12 row">
      <div class="col-12 col-sm-4 col-md-3" v-for="(video, index) in videos" :key="index">
        <AppCardVideo
          :image="video.url"
          :badgeName="video.format.name"
          :title="video.title"
          :subtitles="video.sous_titres"
          :description="video.description"
        />
      </div>
    </div>
  </div>
</template>
