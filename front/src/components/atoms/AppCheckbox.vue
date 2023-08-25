<script setup lang="ts">
/**
 * @file Component for checkbox.
 */
import { computed } from 'vue'

interface CheckBoxProps {
  label?: string
  modelValue?: boolean | string | Array<string | boolean>
  value: string | { category: string; option: string }
  trueValue?: string | number
  falseValue?: string | number
  size?: 'sm' | 'lg'
  disable?: boolean
}

const props = withDefaults(defineProps<CheckBoxProps>(), {
  modelValue: true,
  size: 'sm',
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  /**
   * Getter (to update the value).
   */
  get() {
    return props.modelValue
  },
  /**
   * Setter (to update the value).
   */
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
<template>
  <q-checkbox
    class="app-checkbox"
    :disable="props.disable"
    v-model="value"
    :val="props.value"
    :false-value="props.falseValue"
    :true-value="props.trueValue"
    :label="props.label"
    :size="props.size === 'sm' ? '40px' : '48px'"
  />
</template>

<style lang="scss">
.app-checkbox {
  span {
    font-size: inherit;
  }

  .q-checkbox__svg {
    padding: 3px;
  }

  .q-checkbox__bg {
    border-width: 1.2px;
  }

  &.q-field--error {
    .q-checkbox__inner--falsy {
      .q-checkbox__bg {
        color: $negative;
        background-color: map-get(map-get($map-colors, 'secondary'), '50');
      }
      &:hover {
        .q-checkbox__bg {
          color: $negative;
          background-color: map-get(map-get($map-colors, 'neutral'), '100');
        }
      }
    }
  }

  .q-checkbox__inner--truthy,
  .q-checkbox__inner--indet {
    .q-checkbox__bg {
      color: $accent;
      .q-checkbox__svg {
        background-color: $accent;
      }
    }
  }

  .q-checkbox__inner--falsy {
    .q-checkbox__bg {
      color: map-get(map-get($map-colors, 'neutral'), '300');
      background-color: map-get(map-get($map-colors, 'neutral'), '200');
    }
    &:hover {
      .q-checkbox__bg {
        color: map-get(map-get($map-colors, 'primary'), '300');
        background-color: map-get(map-get($map-colors, 'neutral'), '50');
      }
    }
  }

  .disabled {
    .q-checkbox__bg {
      color: map-get(map-get($map-colors, 'neutral'), '300');
      background-color: map-get(map-get($map-colors, 'neutral'), '100');
    }
    .q-checkbox__inner--truthy,
    .q-checkbox__inner--indet {
      .q-checkbox__bg {
        color: map-get(map-get($map-colors, 'neutral'), '300');
        .q-checkbox__svg {
          border-radius: 2px;
          background-color: map-get(map-get($map-colors, 'neutral'), '100');
          color: map-get(map-get($map-colors, 'neutral'), '300');
        }
      }
    }
  }
}
body.desktop .q-checkbox:not(.disabled) {
  .q-checkbox__inner:before {
    opacity: 0 !important;
  }
}
</style>
