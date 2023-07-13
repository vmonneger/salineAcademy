<script setup lang="ts">
/**
 * @file Component for text title.
 */
interface TitleProps {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'medium' | 'semibold' | 'bold'
  color?: string
  is?: string
}

const titles = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  xs: 'h5',
  xxs: 'h6',
}

const props = withDefaults(defineProps<TitleProps>(), {
  weight: 'medium',
  size: 'sm',
  color: 'primary',
})
</script>

<template>
  <component
    :is="props.is ? props.is : titles[props.size]"
    class="app-heading"
    :class="`heading-${props.size} text-${props.color} ${props.weight}`"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.app-heading {
  font-family: $heading-font-family;
  color: inherit;
  margin: 0;
  &.heading-xl {
    font-size: 86px;
    line-height: 1.2;
  }
  &.heading-lg {
    font-size: 60px;
    line-height: 1.2;
  }
  &.heading-md {
    font-size: 48px;
    line-height: 1.3;
  }
  &.heading-sm {
    font-size: 34px;
    line-height: 1.3;
  }
  &.heading-xs {
    font-size: 24px;
    line-height: 1.4;
  }
  &.heading-xxs {
    font-size: 20px;
    line-height: 1.4;
  }
  &.medium {
    font-weight: 500;
  }
  &.semibold {
    font-weight: 600;
  }
  &.bold {
    font-weight: 700;
  }
}
</style>
