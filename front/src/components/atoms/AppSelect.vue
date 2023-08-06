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
  modelValue?: Select | string | number
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
      <template v-slot:prepend v-if="props.icon">
        <q-icon v-show="props.icon" :name="props.icon" color="primary" />
      </template>

      <template v-slot:prepend v-else-if="props.avatar">
        <q-img v-show="props.avatar" :src="props.avatar" />
      </template>

      <template v-slot:selected>
        <template v-if="displayPlaceholder">
          <span class="app-select-placeholder">{{ props.placeholder }}</span>
        </template>
        <template v-if="props.modelValue?.hasOwnProperty(props.emitOption)">
          {{ props.modelValue[props.emitOption] as Select }}
        </template>
        <template v-else-if="props.modelValue">
          {{ props.modelValue }}
        </template>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar v-if="scope.opt.icon">
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section avatar v-if="scope.opt.avatar">
            <q-img :src="scope.opt.icon" />
          </q-item-section>
          <q-item-section v-if="scope.opt.dialCode">
            <q-item-label>
              {{ scope.opt.label }} {{ scope.opt.dialCode ? `(+${scope.opt.dialCode})` : '' }}
            </q-item-label>
          </q-item-section>
          <q-item-section v-else-if="scope.opt.label">
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="scope.opt.name">
            <q-item-label>{{ scope.opt.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="app-select-item-separator" v-if="scope.opt.optionOnTop">
          <q-separator class="full-width" />
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<style lang="scss">
@import '../../css/app-input.scss';
</style>
