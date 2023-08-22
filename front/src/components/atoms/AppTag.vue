<script setup lang="ts">
/**
 * @file Component for tag.
 */

interface TagProps {
  size?: 'sm' | 'md'
  loading?: boolean
  removable?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  size: 'sm',
  loading: false,
  removable: true,
})
const emit = defineEmits(['delete-tag'])
</script>

<template>
  <div class="app-tag row justify-between no-wrap" :class="`app-tag-size-${props.size}`">
    <span class="color"><slot></slot></span>
    <div class="vertical-bar space-between" v-if="props.removable"></div>
    <q-spinner-ios size="20px" v-if="props.loading" />
    <q-icon
      v-else-if="props.removable"
      class="icon"
      @click="emit('delete-tag')"
      style="cursor: pointer"
      name="sym_s_close"
    />
  </div>
</template>

<style lang="scss">
.app-tag {
  background-color: map-get(map-get($map-colors, 'neutral'), '100');
  border: 1px solid map-get(map-get($map-colors, 'neutral'), '300');
  color: map-get(map-get($map-colors, 'neutral'), '400');
  border-radius: 4px;
  font-weight: 600;
  padding: 0 12px;
  width: fit-content;
  display: flex;
  align-items: center;

  .vertical-bar {
    width: 1px;
    height: 10px;
    background-color: map-get(map-get($map-colors, 'neutral'), '300');
  }
  .app-tag-title {
    font-size: 12pt;
    line-height: 14pt;
  }
  .space-between {
    margin: 0 8px;
  }
  .icon:hover {
    color: map-get(map-get($map-colors, 'neutral'), 'default');
  }
}
.app-tag-size-sm {
  padding-top: 4px;
  padding-bottom: 4px;
}
.app-tag-size-md {
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
