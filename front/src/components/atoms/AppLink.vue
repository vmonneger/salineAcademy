<script setup lang="ts">
/**
 * @file Component for link.
 */

import { RouteLocationRaw } from 'vue-router'

interface Props {
  href?: string
  to?: string | RouteLocationRaw
  underline?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <component
    :is="props?.href || !props?.to ? 'a' : 'router-link'"
    :href="props.href"
    :to="props.to"
    :class="{ underline: props.underline }"
    class="app-link"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
.app-link {
  cursor: pointer;
}
</style>
