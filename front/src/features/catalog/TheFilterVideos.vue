<script setup lang="ts">
/**
 * @file Component for filter videos.
 */
import { ref, watchEffect } from 'vue'
import { AppText as txt, AppCheckbox, AppRadio, AppInput, AppTag } from 'components'
import { Video } from 'stores/video/types'

interface TheFilterVideosProps {
  videos: Array<Video>
}

interface Filters {
  title: string
  // eslint-disable-next-line
  check: (video: Video, selected: Array<string>) => void
  items: Array<string>
  selected: Array<string>
}

const props = defineProps<TheFilterVideosProps>()

const emit = defineEmits(['update:modelValue', 'videosFiltered'])

const handleFilterVideos = () => {
  return props.videos.filter((video) => {
    if (searchQuery.value && !videoMatchesSearch(video)) {
      return false
    }

    return filters.value.every((filter) => {
      if (filter.selected.length === 0) return true
      return filter.check(video, filter.selected)
    })
  })
}

const videoMatchesSearch = (video: Video) => {
  const query = searchQuery.value.toLowerCase()
  const fieldsToSearch = [
    video.format.name,
    ...video.langues.map((lang: { name: string }) => lang.name),
    video.master.name,
    video.instrument.name,
  ]
  return fieldsToSearch.some((field) => field.toLowerCase().includes(query))
}

const sortBy = ref('free')
const allSelectedFilters = ref([] as string[])
const searchQuery = ref('')
const filters = ref<Filters[]>([
  { title: 'Formats', check: (video, selected) => selected.includes(video.format.name), items: [], selected: [] },
  {
    title: 'Langues',
    check: (video, selected) => video.langues.some((lang) => selected.includes(lang.name)),
    items: [],
    selected: [],
  },
  { title: 'Masters', check: (video, selected) => selected.includes(video.master.name), items: [], selected: [] },
  {
    title: 'Instruments',
    check: (video, selected) => selected.includes(video.instrument.name),
    items: [],
    selected: [],
  },
])

watchEffect(() => {
  if (props.videos) {
    filters.value[0].items = [...new Set(props.videos.map((video) => video.format.name))]
    filters.value[1].items = [...new Set(props.videos.flatMap((video) => video.langues.map((lang) => lang.name)))]
    filters.value[2].items = [...new Set(props.videos.map((video) => video.master.name))]
    filters.value[3].items = [...new Set(props.videos.map((video) => video.instrument.name))]
  }

  if (allSelectedFilters.value.length || searchQuery.value) {
    emit('videosFiltered', handleFilterVideos())
  } else {
    emit('videosFiltered', props.videos)
  }
})

/**
 * Parse filters to push to all filters selected.
 */
const parseFiltersToAllFilters = () => {
  let tempArray: string[] = []

  filters.value.forEach((filter) => {
    tempArray = [...tempArray, ...filter.selected]
  })

  allSelectedFilters.value = [...new Set(tempArray)]
}

const handleTagFilters = (filterTag: string) => {
  allSelectedFilters.value = allSelectedFilters.value.filter((filter) => filter !== filterTag)

  filters.value.forEach((filter) => {
    filter.selected = filter.selected.filter((selectedItem) => selectedItem !== filterTag)
  })
}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 row q-col-gutter-md">
      <div class="col-6">
        <AppInput
          v-model="searchQuery"
          size="lg"
          placeholder="Rechercher un professeur, un compositeur, un instrument, un morceau"
          iconRight="sym_s_search"
        />
      </div>
      <div class="col-4 col-md-auto">
        <q-btn class="the-filter-videos" color="secondary" size="17px" no-caps unelevated>
          Filtres
          <q-menu max-width="800px" max-height="100vh">
            <q-list class="list-filter" style="">
              <div class="row col-12 q-pa-md">
                <div class="col-12 col-sm-auto q-mb-lg">
                  <div class="q-mb-md">
                    <div>
                      <txt size="lg" weight="semibold">Trier par :</txt>
                    </div>
                    <div class="column">
                      <AppRadio v-model="sortBy" label="Free" val="free" color="accent" />
                      <AppRadio v-model="sortBy" label="Récemment ajouté" val="recent" color="accent" />
                      <AppRadio v-model="sortBy" label="Le plus regardé" val="most" color="accent" />
                    </div>
                  </div>
                </div>

                <q-separator vertical inset class="gt-xs q-mx-lg" />

                <div class="col-12 col-sm row">
                  <div class="col-12">
                    <txt size="lg" weight="semibold">Filtrer par :</txt>
                  </div>
                  <div class="col-12 row q-col-gutter-md">
                    <div v-for="filter in filters" :key="filter.title" class="col-12 col-md-6 row">
                      <div :id="filter.title" style="margin-left: auto; margin-right: auto">
                        <div>
                          <txt class="no-margin" weight="semibold">{{ filter.title }}</txt>
                        </div>
                        <q-scroll-area visible :style="{ height: '180px', width: '200px' }">
                          <div v-for="(item, index) in filter.items" :key="index">
                            <AppCheckbox
                              :label="item"
                              :value="item"
                              v-model="filter.selected"
                              @update:model-value="parseFiltersToAllFilters()"
                            />
                          </div>
                        </q-scroll-area>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div v-if="allSelectedFilters.length" class="col-12 row q-gutter-md">
      <div v-for="filter in allSelectedFilters" :key="filter">
        <AppTag @delete-tag="handleTagFilters(filter)">{{ filter }}</AppTag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-filter-videos {
  border-radius: $generic-border-radius;
  padding: 8px 20px;
}
</style>
