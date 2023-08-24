<script setup lang="ts">
/**
 * @file The app sidebar.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { SidebarPosition, Drawer } from 'src/types/enum'
import { getFileFromAssets } from 'src/helpers/files'
import { DropdownLabel, Navigation } from 'src/types/navigation'
import { useSidebar } from 'src/composable/useSidebar'
import { AppSidebarItem, AppItem, AppLink as l, TheDropdownProfile } from 'src/components'

export interface SidebarProps {
  currentRole?: string
  homePageLink?: string
  dropdownLabel?: DropdownLabel
  links: Map<string, Array<Navigation>>
}

const props = withDefaults(defineProps<SidebarProps>(), {
  homePageLink: '/',
})

defineOptions({ inheritAttrs: false })

const { sidebarState, reduceSidebar } = useSidebar()
const isMobile = useMediaQuery('(max-width: 580px)')
const isTablet = useMediaQuery('(max-width: 1024px)')

const behavior = ref()
const sidebarWidth = ref(Drawer.Width)

onMounted(updateSidebar)
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSidebar)
})
window.addEventListener('resize', updateSidebar)

/**
 * Update sidebar behavior and width.
 */
function updateSidebar() {
  behavior.value = isTablet.value ? 'mobile' : 'desktop'
  sidebarWidth.value = isMobile.value ? window.innerWidth : Drawer.Width
}
</script>

<template>
  <div class="app-sidebar">
    <q-drawer
      show-if-above
      v-model="sidebarState.show"
      :mini="!sidebarState.show || sidebarState.mini"
      :width="sidebarWidth"
      :mini-width="Drawer.MinWidth"
      :breakpoint="Drawer.Tablet"
      :behavior="behavior"
      :overlay="false"
      v-bind="$attrs"
      class="app-sidebar style-primary"
    >
      <div class="app-sidebar-top row justify-between items-center">
        <l :to="props.homePageLink" class="col">
          <q-img
            v-show="!sidebarState.mini"
            color="primary"
            :src="getFileFromAssets('logo-saline.svg')"
            style="width: 200px"
          />
          <q-img
            v-show="sidebarState.mini"
            color="primary"
            :src="getFileFromAssets('logo-saline-mini.png')"
            style="width: 50px"
          />
        </l>
      </div>

      <q-scroll-area class="app-sidebar-scroll" :class="{ 'is-Tablet': isTablet }">
        <q-list class="app-sidebar-middle">
          <template v-for="(navigation, index) in props.links.get(SidebarPosition.Top)" :key="index">
            <AppSidebarItem
              class="style-primary"
              :class="`${navigation.class}`"
              :icon="navigation.icon"
              :label="navigation.label"
              :to="navigation.link"
              :drawer-mini="sidebarState.mini"
              :sub-links-display="isMobile ? 'EXPANSION' : 'MENU'"
              :is-tablet="isTablet"
              :is-mobile="isMobile"
            />
          </template>
        </q-list>
      </q-scroll-area>

      <div class="app-sidebar-bottom">
        <TheDropdownProfile
          :isMini="sidebarState.mini"
          :label="props.dropdownLabel"
          :links="links.get(SidebarPosition.Dropdown)"
          :dropdown-display="isMobile ? 'EXPANSION' : 'MENU'"
          :is-tablet="isTablet"
          :is-mobile="isMobile"
        />
        <q-separator />
        <AppItem
          size="xs"
          class="app-sidebar-reduce gt-sm"
          :iconRight="sidebarState.icon"
          label="Réduire la barre"
          @click="reduceSidebar"
        />
      </div>
    </q-drawer>
  </div>
</template>

<style lang="scss">
body,
body.desktop {
  .app-sidebar {
    .q-ripple {
      background-color: transparent;
      opacity: 0;
    }
    .q-scrollarea__thumb--h {
      background-color: transparent;
    }
    .q-drawer {
      z-index: 3000;
      border-radius: 0 16px 16px 0;
      overflow: hidden;

      .app-sidebar-scroll {
        height: calc(100vh - 190px);
      }

      &.q-drawer--mini {
        .app-sidebar-scroll {
          height: calc(100vh - 190px);
        }
      }

      &.q-drawer--mobile {
        top: 70px;
        border-radius: 0;
        .app-sidebar-top {
          display: none;
        }
        .app-sidebar-scroll {
          height: calc(100vh - 137px);
        }
      }

      .q-drawer__content {
        .q-separator {
          background: rgba(0, 0, 0, 0.15);
        }

        &.style-primary {
          color: white;
          background-color: $primary;

          .q-separator {
            background: rgba(255, 255, 255, 0.15);
          }

          .app-sidebar-top,
          .app-sidebar-bottom {
            background-color: $primary;
          }
        }
      }
    }

    .app-sidebar-top {
      position: absolute;
      align-self: flex-start;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 11;
      width: 100%;
      padding: 15px;
    }

    .app-sidebar-bottom {
      position: absolute;
      align-self: flex-start;
      left: 1px;
      bottom: 0px;
      z-index: 100;
      width: 100%;
      padding: 0;

      .app-sidebar-reduce {
        padding: 10px 15px;
        &:hover {
          background-color: transparent;
        }

        .q-icon {
          padding: 8px;
          border-radius: $generic-border-radius;
          color: white;
        }

        &.style-primary {
          .q-icon {
            background-color: rgba(0, 0, 0, 0.25);
            color: white;
          }
        }
      }
    }

    .app-sidebar-middle {
      padding: 15px;
    }

    .q-item__section--avatar {
      min-width: 0;
    }

    .q-focusable:focus > .q-focus-helper,
    .q-hoverable:hover > .q-focus-helper {
      background: transparent;
      opacity: 0;
    }
  }
}
</style>
