<script setup lang="ts">
/**
 * @file Component for radio button.
 */
import { computed } from 'vue'
import { QRadioProps } from 'quasar'

interface RadioProps {
  label?: string
  leftLabel?: boolean
  modelValue?: QRadioProps['modelValue']
  val: QRadioProps['val']
}

const props = defineProps<RadioProps>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  /**
   * Getter (to update the value).
   *
   * @returns {void}
   */
  get() {
    return props.modelValue
  },
  /**
   * Setter (to update the value).
   *
   * @param {void} value - Value.
   */
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <q-radio
    class="app-radio"
    v-model="value"
    :val="props.val"
    :label="props.label"
    :left-label="props.leftLabel"
    color="primary"
    size="sm"
  >
    <slot />
  </q-radio>
</template>

<style lang="scss">
.app-radio {
  .q-radio__label {
    font-size: 15px;
  }
}
</style>
