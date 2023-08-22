<script setup lang="ts">
/**
 * @file Component badge.
 */

interface BadgeProps {
  label?: string
  color?: string
  small?: boolean
  dotIcon?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  small: false,
  color: 'primary',
})
</script>

<template>
  <q-badge
    rounded
    :color="props.color"
    class="app-badge"
    :class="`${props.small ? 'small' : ''}`"
    style="display: inline-flex"
  >
    <p class="no-margin overflow-ellipsis">{{ props.label }}</p>
  </q-badge>
</template>

<style lang="scss">
.app-badge {
  overflow: hidden;
  height: 24px;
  padding: 0 12px;
  border-radius: 24px;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.small {
    height: 20px;
    padding: 0 8px;
  }
}
</style>
