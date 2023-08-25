<script setup lang="ts">
/**
 * @file The header of the app.
 */
import { RouteLocationRaw } from 'vue-router'
import { useSidebar } from 'src/composable/useSidebar'
import { getFileFromAssets } from 'src/helpers/files'
import { AppButton, AppLink as l } from 'src/components'

export interface HeaderProps {
  homePageLink?: RouteLocationRaw
}

const props = withDefaults(defineProps<HeaderProps>(), {
  /**
   * Init Home Page Link.
   */
  homePageLink: () => ({
    name: 'Catalog',
  }),
})

const { toggleSidebar, sidebarState } = useSidebar()
</script>
<template>
  <q-header class="app-header" :class="`${sidebarState.show ? 'sidebar-open' : 'sidebar-close'}`">
    <q-toolbar class="q-pa-md">
      <q-toolbar-title>
        <l :to="props.homePageLink">
          <q-img :src="getFileFromAssets('logo-saline.svg')" style="width: 150px" />
        </l>
      </q-toolbar-title>

      <AppButton round size="sm" :icon="sidebarState.show ? 'sym_s_close' : 'sym_s_menu'" @click="toggleSidebar" />
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
.app-header {
  z-index: 3002;
  &.style-primary {
    background-color: $primary;
    &.sidebar-open {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
