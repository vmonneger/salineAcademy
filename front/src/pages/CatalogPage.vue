<script setup lang="ts">
/**
 * @file Index page.
 */
import { ref } from 'vue'
import TheFilterVideos from 'src/features/catalog/TheFilterVideos.vue'
import { AppInput, AppHeading, AppCardVideo, AppTag } from 'components'

const videoFilters = ref([] as string[])

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
      <div class="col-12 col-sm-4 col-md-3" v-for="(item, index) in ['1', '2', '3', '4', '5', '6']" :key="index">
        <AppCardVideo
          image="https://images.unsplash.com/photo-1497032205916-ac775f0649ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          badgeName="Le badge"
          :title="`Le titre - ${item}`"
          subtitle="Le sous titre"
          description="La description qui est ceci cela La description qui est ceci cela La description qui est ceci cela La description qui est ceci cela La description qui est ceci cela"
        />
      </div>
    </div>
  </div>
</template>
