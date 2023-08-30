<script setup lang="ts">
/**
 * @file Component for Card.
 */

interface AppCardProps {
  fit?: boolean
  noPadding?: boolean
  padding?: string
}

const props = withDefaults(defineProps<AppCardProps>(), {
  fit: false,
  padding: 'q-pa-md',
})
</script>

<template>
  <q-card
    class="app-card"
    :class="`${props.fit ? 'fit' : ''} 
    ${props.noPadding ? '' : props.padding}`"
  >
    <slot></slot>
  </q-card>
</template>
