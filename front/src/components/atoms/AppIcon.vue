<script setup lang="ts">
/**
 * @file Icon component.
 */
import { computed } from 'vue'

interface IconProps {
  name: string
  color?: string
  fill?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  colorBackground?: string
}
const props = withDefaults(defineProps<IconProps>(), {
  color: 'primary',
  size: 'md',
  fill: false,
})

const fillNumber = computed(() => {
  return props.fill ? 1 : 0
})
</script>

<template>
  <q-icon
    :name="props.name"
    :color="props.color"
    :class="`app-icon app-icon-${props.size} ${props.colorBackground ? `bg-${props.colorBackground} bg-icon` : ''}`"
    class="material-symbols-sharp"
  >
    <slot></slot>
  </q-icon>
</template>

<style lang="scss">
.app-icon {
  font-variation-settings: 'FILL' v-bind(fillNumber);

  &.app-icon-xs {
    font-size: 16px;
  }
  &.app-icon-sm {
    font-size: 18px;
  }
  &.app-icon-md {
    font-size: 22px;
  }
  &.app-icon-lg {
    font-size: 26px;
  }
  &.app-icon-xl {
    font-size: 32px;
  }
  &.app-icon-xxl {
    font-size: 48px;
  }
  &.bg-icon {
    border-radius: 50%;
    padding: 8px;
  }
}
</style>
