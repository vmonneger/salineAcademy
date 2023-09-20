<script setup lang="ts">
/**
 * @file Component for dropdown select.
 */
import { watchEffect, ref } from 'vue'

interface Select {
  label: string
  value: string | number
  disable?: boolean
}

interface SelectProps {
  modelValue?: Select | string | number | Array<any>
  label?: string
  name?: string
  icon?: string
  disabled?: boolean
  lazyRules?: boolean
  placeholder?: string
  useInput?: boolean
  required?: boolean
  labelInside?: boolean
  emitOption?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  lazyRules: false,
  placeholder: '',
  useInput: false,
  color: 'white',
  emitOption: 'label',
  labelInside: false,
  required: false,
  size: 'md',
})
defineOptions({ inheritAttrs: false })

const displayPlaceholder = ref(true)

watchEffect(() => {
  if (
    ((typeof props.modelValue === 'object' && props.modelValue.label) ||
      (typeof props.modelValue === 'object' && props.modelValue.value) ||
      (typeof props.modelValue === 'string' && props.modelValue.length > 0)) &&
    props.placeholder
  ) {
    displayPlaceholder.value = false
  }
})
</script>
<template>
  <div class="app-input app-select" :class="`app-input-size-${props.size}`">
    <label
      class="app-input-label"
      v-show="props.label && !props.labelInside"
      :class="`${props.required ? 'required' : ''}`"
    >
      {{ props.label }}
    </label>
    <q-select
      :name="props.name"
      :for="props.name"
      :id="props.name"
      :disable="props.disabled"
      :lazy-rules="props.lazyRules"
      :use-input="props.useInput"
      :model-value="props.modelValue"
      @update:model-value="(value) => $emit('update:modelValue', value)"
      dropdown-icon="sym_s_keyboard_arrow_down"
      v-bind="$attrs"
      no-error-icon
      outlined
      dense
    >
    </q-select>
  </div>
</template>

<style lang="scss">
@import '../../css/app-input.scss';
</style>
