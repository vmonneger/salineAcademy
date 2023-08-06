<script setup lang="ts">
/**
 * @file Item clickable.
 */
interface ItemProps {
  iconLeft?: string
  iconRight?: string
  label?: string
  size?: string
  disable?: boolean
  textColor?: string
}

const props = withDefaults(defineProps<ItemProps>(), {
  size: 'sm',
  disable: false,
})
</script>

<template>
  <q-item clickable v-ripple :disable="props.disable" class="app-item" :class="`text-${props.textColor}`">
    <q-item-section avatar v-if="props.iconLeft">
      <q-icon :name="props.iconLeft" :size="props.size" align="left" />
    </q-item-section>
    <q-item-section class="col" v-if="props.label">
      {{ props.label }}
    </q-item-section>
    <q-item-section side v-if="props.iconRight">
      <q-icon :name="props.iconRight" :size="props.size" align="right" />
    </q-item-section>
    <slot></slot>
  </q-item>
</template>

<style lang="scss">
.app-item {
  border-radius: $generic-border-radius;
  &:hover {
    background-color: map-get(map-get($map-colors, 'secondary'), '100');
  }
  &.q-item {
    min-height: auto;
    padding: 12px 18px;
  }
  &.q-item.q-router-link--active,
  &.q-item--active {
    font-weight: 500;
  }
}
body.desktop .app-item .q-focusable:focus > .q-focus-helper,
body.desktop .app-item .q-manual-focusable--focused > .q-focus-helper,
body.desktop .app-item .q-hoverable:hover > .q-focus-helper {
  opacity: 0;
  background: transparent;
}
</style>
