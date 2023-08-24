<script setup lang="ts">
/**
 * @file Component for filter videos.
 */
import { ref, computed } from 'vue'
import { filterOptionsVideos } from 'src/statics/videos'
import { AppText as txt, AppCheckbox, AppRadio } from 'components'

interface TheFilterVideosProps {
  modelValue: Array<string>
}

const props = defineProps<TheFilterVideosProps>()

const emit = defineEmits(['update:modelValue'])

const filterState = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const sortBy = ref('free')

/**
 * Adjust size of category "Type d'accès".
 */
const handleSizeCategory = (category: string): string => {
  return category === "Type d'accès" ? '100px' : '180px'
}
</script>

<template>
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
              <div v-for="category in filterOptionsVideos.keys()" :key="category" class="col-12 col-md-6 row">
                <div :id="category" style="margin-left: auto; margin-right: auto">
                  <div>
                    <txt class="no-margin" weight="semibold">{{ category }}</txt>
                  </div>
                  <q-scroll-area visible :style="{ height: handleSizeCategory(category), width: '200px' }">
                    <div v-for="(option, index) in filterOptionsVideos.get(category)?.sort()" :key="index">
                      <AppCheckbox :label="option" v-model="filterState" :value="option" />
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
</template>

<style lang="scss" scoped>
.the-filter-videos {
  border-radius: $generic-border-radius;
  padding: 8px 20px;
}
</style>
