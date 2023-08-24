<script setup lang="ts">
/**
 * @file Dropdown component.
 */

interface Props {
  dropdownIcon?: string
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  dropdownIcon: 'sym_s_expand_more',
})
</script>
<template>
  <q-btn-dropdown
    class="app-dropdown q-py-xs rounded-borders"
    :class="`app-dropdown-${props.size}`"
    :dropdown-icon="props.dropdownIcon"
    :size="props.size"
    :color="props.color"
    :ripple="false"
    unelevated
    no-caps
  >
    <q-list>
      <slot></slot>
    </q-list>
  </q-btn-dropdown>
</template>

<style lang="scss">
.q-btn.app-dropdown {
  border-radius: $generic-border-radius;
  min-height: auto;
  .q-icon {
    font-size: inherit;
  }
  font-weight: 400;

  &.bg-primary:focus {
    outline: 2px solid map-get(map-get($map-colors, 'primary'), '50') !important;
    outline-offset: -2px;
  }
  &.bg-secondary:focus {
    outline: 2px solid map-get(map-get($map-colors, 'secondary'), '100') !important;
    outline-offset: -2px;
  }
  &.disabled {
    background: map-get(map-get($map-colors, 'neutral'), '300') !important;
    color: map-get(map-get($map-colors, 'neutral'), 'default') !important;
  }

  &.app-dropdown-xs {
    font-size: 12px;
    line-height: 1;
    padding: 0px 16px;
    height: 28px;
  }
  &.app-dropdown-sm {
    font-size: 14px;
    line-height: 1.3;
    padding: 0px 24px;
    height: 38px;
  }
  &.app-dropdown-md {
    font-size: 16px;
    line-height: 1.3;
    padding: 0px 28px;
    height: 48px;
  }
  &.app-dropdown-lg {
    font-size: 18px;
    line-height: 1.3;
    padding: 0px 28px;
    height: 58px;
  }
}
</style>
