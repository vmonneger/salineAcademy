<script setup lang="ts">
/**
 * @file Component for text paragraph.
 */
interface TitleProps {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'regular' | 'semibold'
  color?: string
  underline?: boolean
  italic?: boolean
  is?: string
}

const props = withDefaults(defineProps<TitleProps>(), {
  weight: 'regular',
  color: 'primary',
  size: 'md',
  is: 'p',
})
</script>

<template>
  <component
    :is="props.is"
    class="app-text"
    :class="`text-${props.color} ${props.italic ? 'app-italic' : 'app-no-italic'} 
    ${props.underline ? 'app-underline' : ''} ${!props.size ? 'text-default' : `text-${props.size}`} ${props.weight}`"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.app-text {
  &:has(.app-text) {
    .app-text {
      color: inherit;
      &:not(&.text-xl, &.text-lg, &.text-md, &.text-sm, &.text-xs, &.text-xxs) {
        font-size: inherit;
        line-height: inherit;
      }
    }
  }

  &.text-xl {
    font-size: 20px;
    line-height: 1.4;
  }

  &.text-lg {
    font-size: 18px;
    line-height: 1.4;
  }
  &.text-md {
    font-size: 16px;
    line-height: 1.4;
  }
  &.text-sm,
  &.text-default {
    font-size: 14px;
    line-height: 1.5;
  }
  &.text-xs {
    font-size: 12px;
    line-height: 1.5;
  }
  &.text-xxs {
    font-size: 10px;
    line-height: 1.5;
  }
  &.app-underline {
    text-decoration: underline;
  }
  &.app-italic {
    font-style: italic;
  }
  &.app-no-italic {
    font-style: normal;
  }
  &.semibold {
    font-weight: 600;
  }
  &.regular {
    font-weight: 400;
  }
}
</style>
