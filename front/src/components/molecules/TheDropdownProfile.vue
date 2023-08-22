<script setup lang="ts">
/**
 * @file The dropdown for user profile.
 */

import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { DropdownLabel, Navigation } from 'src/types/navigation'
import { getFileFromAssets } from 'src/helpers/files'
import { AppSidebarItem } from 'src/components'

export interface DropdownProfileProps {
  label?: DropdownLabel
  links?: Array<Navigation>
  isMini: boolean
  class?: string
  dropdownDisplay?: 'MENU' | 'EXPANSION'
}

const props = withDefaults(defineProps<DropdownProfileProps>(), {
  isMini: false,
  dropdownDisplay: 'EXPANSION',
})

const isBreakpoint = useMediaQuery('(max-width: 1024px)')

const isOpen = ref(false)

/**
 * Toggle the dropdown.
 */
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="app-dropdown-profile">
    <div
      v-if="props.dropdownDisplay === 'MENU'"
      class="app-dropdown-menu style-primary"
      :class="`${isOpen ? 'is-open' : ''}`"
      @click="toggleDropdown"
    >
      <q-item class="app-dropdown-menu-btn style-primary">
        <q-item-section avatar>
          <q-img :src="getFileFromAssets('avatar-default.svg')" width="26px" height="26px" align="left" />
        </q-item-section>
        <q-item-section class="col text-overflow" v-if="props.label">
          {{ props.label?.name }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="sym_s_more_horiz" align="right" size="26px" />
        </q-item-section>
        <q-menu
          class="app-dropdown-menu-list style-primary"
          :offset="props.isMini && !isBreakpoint ? [-65, -40] : [0, 15]"
        >
          <q-list>
            <AppSidebarItem
              v-for="(navigation, index) in props.links"
              :key="index"
              :icon="navigation?.icon"
              :link="navigation?.link"
              :label="navigation?.label"
              :to="navigation?.link"
            />
          </q-list>
        </q-menu>
      </q-item>
    </div>
    <div
      v-if="props.dropdownDisplay === 'EXPANSION'"
      :class="`${isOpen ? 'is-open' : ''}`"
      class="app-dropdown-expansion style-primary"
    >
      <q-item clickable text-color="white" class="app-dropdown-expansion-btn style-primary" @click="toggleDropdown">
        <q-item-section avatar>
          <q-img :src="props.label?.image" width="26px" height="26px" align="left" />
        </q-item-section>
        <q-item-section class="col text-overflow text-left" v-if="props.label">
          {{ props.label?.name }}
        </q-item-section>
      </q-item>
      <q-list class="q-py-none">
        <AppSidebarItem
          v-for="(navigation, index) in props.links"
          :key="index"
          :icon="navigation.icon"
          :link="navigation?.link"
          :label="navigation.label"
          :to="navigation?.link"
        />
      </q-list>
    </div>
  </div>
</template>

<style lang="scss">
body,
body.desktop {
  .q-drawer {
    .app-dropdown-expansion {
      bottom: 0;
      width: 100%;
      height: auto;
      position: absolute;
      transition: transform 0.4s ease;
      transform: translateY(calc(100% - 60px));
      background-color: $secondary;

      &.is-open {
        transform: translateY(0);
      }

      .q-img,
      .q-icon {
        border-radius: 50%;
      }

      .q-list {
        padding: 0 15px 0 15px;
      }

      .app-dropdown-expansion-btn {
        padding: 15px 30px;
        font-weight: 500;
        font-size: 1rem;
        color: white;
      }

      .app-sidebar-item {
        &.style-primary {
          .q-item {
            background-color: map-get(map-get($map-colors, 'primary'), '100');
            color: white;
            font-weight: 500;

            .q-icon {
              color: white;
            }

            &:hover {
              background-color: map-get(map-get($map-colors, 'secondary'), '100');
              color: map-get(map-get($map-colors, 'primary'), '200');
            }
          }
        }
      }
    }

    .app-dropdown-menu {
      .app-dropdown-menu-btn.q-item {
        cursor: pointer;
        margin: 10px 15px;
        padding: 8px 10px;
        border-radius: $generic-border-radius;
        color: white;

        .q-img,
        .q-icon {
          border-radius: 50%;
        }

        .q-icon {
          color: white;
          padding: 2px;
        }

        &.style-primary {
          background-color: $secondary;

          &:hover i {
            background-color: $primary;
            transition: transform 0.4s ease;
          }
        }

        &.style-primary:hover i {
          background-color: $primary;
          color: white;
        }
      }
      &.is-open i {
        transform: rotate(180deg);
      }
    }

    &.q-drawer--mini .app-dropdown-menu .app-dropdown-menu-btn.q-item {
      &.style-primary {
        background-color: transparent;
      }
    }
  }

  .app-dropdown-menu-list {
    padding: 0 8px;
    background-color: white;
    width: 245px;
    box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.1);

    .q-item {
      cursor: pointer;
      margin: 8px 0;
      padding: 0 8px;
      border-radius: $generic-border-radius;

      .q-item__section--avatar {
        min-width: 0;
      }

      .q-badge {
        padding: 6px 8px;
      }
    }

    &.style-primary {
      background-color: map-get(map-get($map-colors, 'primary'), '100');

      .q-item {
        color: white;
        font-weight: 500;

        &:hover {
          background-color: $secondary;
        }
      }
    }

    .q-focusable:focus > .q-focus-helper,
    .q-manual-focusable--focused > .q-focus-helper,
    .q-hoverable:hover > .q-focus-helper {
      opacity: 0;
      background: transparent;
    }
  }
}
</style>
