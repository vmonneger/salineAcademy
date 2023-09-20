<script setup lang="ts">
/**
 * @file Component for card videos.
 */
import { AppText as txt, AppBadge } from 'components'

interface AppCardProps {
  fit?: boolean
  noPadding?: boolean
  padding?: string
  image?: string
  badgeName?: string
  title?: string
  langues?: Array<{ name: string }>
  description?: string
}

const props = withDefaults(defineProps<AppCardProps>(), {
  fit: false,
  padding: 'q-pa-md',
})
</script>

<template>
  <q-card
    class="app-card-video cursor-pointer"
    :class="`${props.fit ? 'fit' : ''}
    ${props.noPadding ? '' : $slots.title ? '' : props.padding}`"
  >
    <div>
      <q-img class="image-video" :src="props.image" fit="cover" style="">
        <AppBadge class="absolute" color="accent" small :label="props.badgeName" style="top: 3px; left: 3px" />
      </q-img>
      <div class="q-pb-sm q-pt-md">
        <txt class="no-margin" weight="semibold">{{ props.title }}</txt>
      </div>
      <div v-for="(langue, index) in props.langues" :key="index">
        <txt class="no-margin q-pb-sm" size="sm" color="secondary">{{ langue.name }}</txt>
      </div>
      <div class="text-description" style="overflow: ellipsis; text-overflow: ellips">
        <txt class="no-margin" size="xs">{{ props.description }}</txt>
      </div>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
.app-card-video {
  background-color: transparent;
  box-shadow: none;
  position: relative;
  z-index: 1;
  transition: transform 0.3s;
  .image-video {
    border-radius: $generic-border-radius;
  }
  .text-description {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    opacity: 0;
    position: relative;
    width: 100%;
  }
  .text-description::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to top, white, transparent);
  }
}

.app-card-video:hover {
  transition: transform 0.3s;
  transform: scale(1.1);
}

.app-card-video:hover .text-description {
  max-height: 100px;
  opacity: 1;
}
</style>
