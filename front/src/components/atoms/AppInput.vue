<script setup lang="ts">
/**
 * @file Input component.
 */
import { ref, watchEffect } from 'vue'
import { ruleInputRequired } from 'src/helpers/rules'
import { QInput } from 'quasar'

interface InputProps {
  label?: string
  name?: string
  labelInside?: boolean
  iconLeft?: string
  iconColorLeft?: string
  iconRight?: string
  iconColorRight?: string
  resetText?: boolean
  autocomplete?: string
  placeholder?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  // eslint-disable-next-line
  rules?: Array<(val: string | number | object) => boolean | string>
  type?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  label: '',
  modelValue: '',
  autocomplete: '',
  labelInside: false,
  type: 'text',
  disabled: false,
  lazyRules: false,
  loading: false,
  resetText: false,
  iconColorLeft: 'primary',
  iconColorRight: 'primary',
  size: 'md',
  required: false,
})

const showPassword = ref<boolean>(false)
const inputType = ref(props.type as QInput['type'])

watchEffect(() => {
  inputType.value = props.type as QInput['type']
  if (props.type === 'password') {
    if (showPassword.value) {
      inputType.value = 'text'
    } else {
      inputType.value = 'password'
    }
  }
})
</script>

<template inheritsAttr="false">
  <div class="app-input" :class="`${props.type === 'textarea' ? '' : `app-input-size-${props.size}`}`">
    <label
      v-show="props.label && !props.labelInside"
      class="app-input-label"
      :class="`${props.required ? 'required' : ''}`"
    >
      {{ props.label }}
    </label>
    <q-input
      :type="inputType"
      :for="props.name"
      :name="props.name"
      :id="props.name"
      :autocomplete="props.name"
      :placeholder="props.placeholder"
      :lazy-rules="props.lazyRules"
      :loading="props.loading"
      :rules="props.required ? [...(props.rules ? props.rules : []), ...ruleInputRequired] : props.rules"
      :label="props.labelInside ? props.label : undefined"
      :model-value="props.modelValue"
      @update:model-value="(value) => $emit('update:modelValue', value)"
      bg-color="white"
      v-bind="$attrs"
      outlined
      dense
      no-error-icon
      bottom-slots
    >
      <template v-slot:prepend v-if="props.iconLeft">
        <q-icon v-show="props.iconLeft" :color="props.iconColorLeft" :name="props.iconLeft" size="xs" />
      </template>
      <template v-slot:append v-if="props.iconRight || props.type === 'password' || props.resetText">
        <q-icon
          v-if="props.type === 'password'"
          class="cursor-pointer q-pa-none q-ml-xs"
          :color="props.iconColorRight"
          :name="showPassword ? 'sym_s_visibility' : 'sym_s_visibility_off'"
          size="xs"
          @click="showPassword = !showPassword"
        />
        <q-icon
          v-if="props.resetText"
          class="cursor-pointer q-pa-none q-ml-xs app-reset-icon"
          :color="props.iconColorRight"
          name="sym_s_close"
          size="12px"
          @click="$emit('update:modelValue', '')"
        />
        <q-icon v-if="props.iconRight" class="q-pa-none q-ml-xs" color="primary" :name="props.iconRight" size="xs" />
      </template>
    </q-input>
  </div>
</template>

<style lang="scss">
.app-input {
  &.app-input-size-lg {
    font-size: 16px;
  }
  &.app-input-size-md {
    font-size: 14px;
  }
  &.app-input-size-sm {
    font-size: 12px;
  }

  .app-input-label {
    display: inline-block;
    padding-bottom: 5px;
    line-height: 1;
    font-size: inherit;
    font-weight: 400;
    color: $secondary;
    &.required::after {
      content: '*';
      color: $negative;
    }
  }

  input {
    font-size: inherit;
    &::placeholder {
      color: map-get(map-get($map-colors, 'neutral'), '400');
    }
  }

  &.app-input-size-lg {
    .q-field__bottom .q-field__messages {
      font-size: 11px;
    }
  }
  &.app-input-size-md {
    .q-field__bottom .q-field__messages {
      font-size: 10px;
    }
  }
  &.app-input-size-sm {
    .q-field__bottom .q-field__messages {
      font-size: 9px;
      line-height: 1.6;
    }
  }

  .q-field__bottom {
    padding-left: 0;

    .q-field__messages {
      div[role='alert'] {
        line-height: 1.9;
        &::before {
          font-family: 'Font Awesome 5 Free';
          content: '\21';
          line-height: 0.9;
          font-size: 8px;
          display: inline-block;
          padding: 1.5px 3.5px;
          margin-top: -2px;
          margin-right: 5px;
          vertical-align: middle;
          font-weight: 900;
          border: 1px solid currentColor;
          border-radius: 50%;
        }
      }
    }
  }

  &.app-input-size-lg {
    .q-field--dense .q-field__control,
    .q-field--dense .q-field__marginal {
      height: 46px;
    }
  }

  &.app-input-size-md {
    .q-field--dense .q-field__control,
    .q-field--dense .q-field__marginal {
      height: 40px;
    }
  }

  &.app-input-size-sm {
    .q-field--dense .q-field__control,
    .q-field--dense .q-field__marginal {
      height: 34px;
    }
  }

  &:hover {
    .q-field--outlined .q-field__control::before {
      border-color: map-get(map-get($map-colors, 'neutral'), 'default');
    }
  }

  .q-field--outlined {
    .q-field__control {
      &::before {
        border-color: map-get(map-get($map-colors, 'neutral'), '300');
      }
      &:after {
        border: none;
        outline: 2px solid transparent;
        transition: outline-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    &.q-field--highlighted {
      .q-field__control::after {
        border-width: 1px;
      }

      &.q-field--focused .q-field__control {
        &::before {
          border-color: map-get(map-get($map-colors, 'accent'), '400');
        }
        &::after {
          outline-color: map-get(map-get($map-colors, 'accent'), '50');
        }
      }
    }

    &.q-field--error {
      .q-field__control::before {
        border-color: $negative;
      }

      &.q-field--focused .q-field__control {
        &::before {
          border-color: $negative;
        }
        &::after {
          outline-color: map-get(map-get($map-colors, 'negative'), '50');
        }
      }
    }

    &.q-field--disabled {
      .q-field__control::before {
        border-color: map-get(map-get($map-colors, 'neutral'), '300');
        background-color: map-get(map-get($map-colors, 'neutral'), '100');
      }

      input {
        color: map-get(map-get($map-colors, 'neutral'), '400');
      }
    }
  }

  .app-reset-icon {
    background-color: map-get(map-get($map-colors, 'neutral'), '100');
    border-radius: 50%;
    padding: 5px;
  }
}

div[role='listbox'].q-menu {
  margin-top: 5px !important;
  .q-manual-focusable {
    transition: none;
    &.q-item--active {
      font-weight: 600;
    }
    &.q-manual-focusable--focused {
      background-color: $primary;
      color: white;
    }
    .q-focus-helper {
      opacity: 0;
    }
  }
}

.q-field--auto-height.q-field--dense .q-field__control,
.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 34px;
}

.q-select--without-input,
.q-select--with-input {
  padding-bottom: 20px;
}
</style>
