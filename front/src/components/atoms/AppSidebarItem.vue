<script setup lang="ts">
/**
 * @file Sidebar Item clickable.
 */
import { ref, computed } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { AppTooltip } from 'components'

interface Props {
  icon?: string
  label?: string
  to?: RouteLocationRaw
  drawerMini?: boolean
  isMobile?: boolean
  isTablet?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const menuState = ref(false)

const shouldShowTooltip = computed(() => !props.isTablet && props.drawerMini && !menuState.value)
</script>
<template>
  <div class="app-sidebar-item style-primary">
    <q-item clickable :to="props.to" v-bind="$attrs">
      <q-item-section avatar v-if="props.icon">
        <q-icon :name="props.icon" align="left" />
      </q-item-section>
      <q-item-section class="col" v-if="props.label">
        {{ props.label }}
      </q-item-section>
      <AppTooltip v-if="shouldShowTooltip" :offset="[25, 8]" position="right">
        {{ props.label }}
      </AppTooltip>
    </q-item>
  </div>
</template>

<style lang="scss">
body,
body.desktop {
  .q-drawer--mini .app-sidebar-menu {
    background-attachment: transparent;
  }

  .q-drawer,
  .app-sidebar-menu {
    .app-sidebar-item .q-item {
      margin: 8px 0;
      padding: 11px 10px;
      border-radius: $generic-border-radius;

      &.q-router-link--active {
        font-weight: bold;
      }
    }

    .app-sidebar-item.style-primary .q-item {
      background-color: map-get(map-get($map-colors, 'primary'), '100');

      .q-icon {
        color: white;
      }

      &:hover,
      &.q-router-link--active {
        background-color: $secondary;
        color: white;
        .q-icon {
          color: $accent;
        }
      }
    }
  }

  .app-sidebar-menu {
    padding: 0 8px;

    &.style-primary {
      background-color: $primary;
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
