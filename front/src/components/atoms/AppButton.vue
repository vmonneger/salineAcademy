<script setup lang="ts">
/**
 * @file Button component.
 */
interface ButtonProps {
  color?: string
  textColor?: string
  iconLeft?: string
  iconRight?: string
  icon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  weight?: 'regular' | 'medium'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'accent',
  size: 'md',
  weight: 'medium',
})

const iconSize = new Map([
  ['xs', '16px'],
  ['sm', '20px'],
  ['md', '28px'],
  ['lg', '33px'],
])
</script>

<template>
  <q-btn
    class="app-button"
    :class="`app-button-${props.size} ${props.weight} ${props.iconLeft ? 'icon-left' : ''} ${
      props.iconRight ? 'icon-right' : ''
    }`"
    :color="props.color"
    :text-color="props.textColor"
    :ripple="false"
    no-caps
    unelevated
  >
    <q-icon v-if="props.iconLeft" left :size="iconSize.get(props.size)" :name="props.iconLeft" />
    <q-icon v-if="props.icon" :size="iconSize.get(props.size)" :name="props.icon" />
    <slot></slot>
    <q-icon v-if="props.iconRight" right :size="iconSize.get(props.size)" :name="props.iconRight" />
    <template v-slot:loading>
      <q-spinner-dots />
    </template>
  </q-btn>
</template>

<style lang="scss">
.q-btn.app-button {
  border-radius: 50px;
  .q-icon {
    font-size: inherit;
  }
  &.regular {
    font-weight: 400;
  }
  &.medium {
    font-weight: 500;
  }
  &.q-btn--round {
    min-width: 0;
    min-height: 0;
    .q-icon {
      margin-left: 0.75px;
    }
  }

  &.app-button-xs {
    font-size: 12px;
    line-height: 1;
    padding: 0px 20px;
    height: 28px;
    &.icon-right {
      padding: 0px 16px 0px 20px;
    }
    &.icon-left {
      padding: 0px 20px 0px 16px;
    }
    &.q-btn--round {
      border-radius: 50%;
      width: 28px;
      padding: 0 !important;
    }
  }

  &.app-button-sm {
    font-size: 14px;
    line-height: 1.3;
    padding: 0px 28px;
    height: 38px;
    &.icon-right {
      padding: 0px 24px 0px 28px;
    }
    &.icon-left {
      padding: 0px 28px 0px 24px;
    }
    &.q-btn--round {
      border-radius: 50%;
      width: 38px;
      padding: 0 !important;
    }
  }

  &.app-button-md {
    font-size: 16px;
    line-height: 1.3;
    padding: 0px 32px;
    height: 48px;
    &.icon-right {
      padding: 0px 26px 0px 32px;
    }
    &.icon-left {
      padding: 0px 32px 0px 26px;
    }
    &.q-btn--round {
      border-radius: 50%;
      width: 48px;
      padding: 0 !important;
    }
  }

  &.app-button-lg {
    font-size: 18px;
    line-height: 1.3;
    padding: 0px 32px;
    height: 58px;
    &.icon-right {
      padding: 0px 26px 0px 32px;
    }
    &.icon-left {
      padding: 0px 32px 0px 26px;
    }
    &.q-btn--round {
      border-radius: 50%;
      width: 58px;
      padding: 0 !important;
    }
  }
}
</style>
