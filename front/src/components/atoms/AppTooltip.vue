<script lang="ts" setup>
/**
 * @file Component Tooltip.
 */
import { QTooltipProps } from 'quasar'

interface TooltipProps {
  position?: 'top' | 'right' | 'bottom' | 'left'
  bgColor?: 'primary' | 'white'
}

interface TooltipPositions {
  anchor: QTooltipProps['anchor']
  self: QTooltipProps['self']
}

const props = withDefaults(defineProps<TooltipProps>(), {
  bgColor: 'primary',
  position: 'top',
})

const positions = new Map<string, TooltipPositions>([
  ['top', { anchor: 'top middle', self: 'bottom middle' }],
  ['right', { anchor: 'center right', self: 'center left' }],
  ['bottom', { anchor: 'bottom middle', self: 'top middle' }],
  ['left', { anchor: 'center left', self: 'center right' }],
])
</script>

<template>
  <q-tooltip
    class="app-tooltip q-py-sm"
    :class="`bg-${props.bgColor} ${props.position}`"
    :anchor="positions.get(props.position)?.anchor"
    :self="positions.get(props.position)?.self"
  >
    <slot></slot>
  </q-tooltip>
</template>

<style lang="scss">
.app-tooltip {
  max-width: 320px;
  overflow: visible;
  &.q-tooltip--style {
    font-size: 14px;
  }
  &.bg-white {
    color: black;
    &:before {
      border-color: white white transparent transparent;
    }
  }
  &.top:before {
    left: calc(50% - 6px);
    bottom: calc(0px - 6px);
    transform: rotate(135deg);
  }
  &.right:before {
    left: calc(0px - 6px);
    top: calc(50% - 6px);
    transform: rotate(-135deg);
  }
  &.bottom:before {
    left: calc(50% - 6px);
    top: calc(0px - 6px);
    transform: rotate(-45deg);
  }
  &.left:before {
    right: calc(0px - 6px);
    top: calc(50% - 6px);
    transform: rotate(45deg);
  }
}
</style>
