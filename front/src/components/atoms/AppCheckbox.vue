<script setup lang="ts">
/**
 * @file Component for checkbox.
 */
import { ruleCheckBoxRequired } from 'src/helpers/rules'
import { computed } from 'vue'

interface OptionList {
  label: string
  value: string | number
}

interface CheckBoxProps {
  label?: string
  modelValue?: boolean | string | Array<string | boolean>
  listValue?: Array<OptionList>
  trueValue?: string | number
  falseValue?: string | number
  // eslint-disable-next-line
  rules?: Array<(a: boolean) => string | boolean>
  size?: 'sm' | 'lg'
  disable?: boolean
  required?: boolean
  vertical?: boolean
}

const props = withDefaults(defineProps<CheckBoxProps>(), {
  modelValue: true,
  size: 'sm',
  vertical: false,
})

const typeOfModelValue = computed(() => Array.isArray(props.modelValue))

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
<template inheritsAttr="false">
  <q-field
    v-model="value"
    no-error-icon
    borderless
    reactive-rules
    class="no-padding app-checkbox q-my-md"
    :rules="props.required ? [...(props.rules ? props.rules : []), ...ruleCheckBoxRequired] : props.rules"
  >
    <template v-slot:control>
      <div v-if="typeOfModelValue" class="row">
        <div class="col-12 row q-mt-sm content-center">
          <span :class="`q-checkbox__label ${props.required ? 'required' : ''}`">{{ props.label }}</span>
        </div>

        <div class="col-12" :class="vertical ? 'column' : 'row'">
          <q-checkbox
            v-for="(item, index) in props.listValue"
            :key="index"
            v-model="value"
            v-bind="$attrs"
            :val="item.value"
            :label="item.label"
            :disable="props.disable"
            :false-value="props.falseValue"
            :true-value="props.trueValue"
            :class="vertical ? '' : 'q-mr-md'"
            :size="props.size === 'sm' ? '40px' : '48px'"
          />
        </div>
      </div>

      <div v-else class="content-center">
        <q-checkbox
          v-model="value"
          v-bind="$attrs"
          :false-value="props.falseValue"
          :true-value="props.trueValue"
          :label="props.label"
          :disable="props.disable"
          :size="props.size === 'sm' ? '40px' : '48px'"
          :class="`q-checkbox__label ${props.required ? 'required' : ''}`"
        />
      </div>
    </template>
  </q-field>
</template>

<style lang="scss">
.app-checkbox {
  span {
    font-size: inherit;
  }
  .q-checkbox__label {
    color: $primary;
    font-size: inherit;
    font-weight: 400;
    &.required::after {
      content: '*';
      color: $negative;
    }
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

  .q-field__bottom {
    padding-top: 0;
  }

  &.q-field--auto-height .q-field__control {
    height: max-content;
    min-height: max-content;
  }
  &.q-field--auto-height .q-field__native {
    min-height: 0;
    padding: 0;
  }
}
body.desktop .q-checkbox:not(.disabled) {
  .q-checkbox__inner:before {
    opacity: 0 !important;
  }
}
</style>
