<script lang="ts" setup>
/**
 * @file The App layout contains header and sidebar.
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMeta } from 'quasar'
import { useSidebar } from 'src/composable/useSidebar'
import { useNavigation } from 'src/composable/useNavigation'
import { TheSidebar, TheHeader } from 'src/components'

const route = useRoute()
const { sidebarState } = useSidebar()
const { dropdownLabel, sidebarLinks } = useNavigation()

const sizeScrollArea = computed(() => (sidebarState.show ? `${window.innerHeight}px` : `${window.innerHeight - 70}px`))

useMeta(() => ({
  title: route.meta.title ? (route.meta.title as string) : 'Saline Academy',
}))
</script>

<template>
  <q-layout class="app-layout" view="hHh Lpr lff">
    <TheHeader color="primary" :homePageLink="{ name: 'Catalog' }" class="lt-md" />
    <TheSidebar :dropdownLabel="dropdownLabel" :links="sidebarLinks" />
    <q-page-container>
      <q-scroll-area class="app-scroll">
        <q-page padding class="container">
          <router-view :key="route.path" />
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.app-layout {
  .app-scroll {
    height: v-bind(sizeScrollArea);
    max-width: 100%;

    @media screen and (max-width: $breakpoint-sm) {
      height: calc(100vh - 70px);
    }
  }
}
</style>
