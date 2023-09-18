<script lang="ts" setup>
/**
 * @file Component Modal.
 */

import { computed } from 'vue'
import { AppHeading as h, AppButton, AppFormGroupButton } from 'components'

interface ModalBigProps {
  modelValue?: boolean
  buttonDelete?: boolean
  buttonCancel?: boolean
  buttonSubmit?: boolean
  loadingDelete?: boolean
  loadingCancel?: boolean
  loadingSubmit?: boolean
  noActions?: boolean
  position?: 'bottom' | 'standard' | 'top' | 'right' | 'left'
  classBody?: string
}

const props = withDefaults(defineProps<ModalBigProps>(), {
  modelValue: false,
  buttonDelete: false,
  buttonCancel: true,
  buttonSubmit: true,
  loadingDelete: false,
  loadingCancel: false,
  loadingSubmit: false,
  noActions: false,
  position: 'bottom',
  classBody: '',
})

const emit = defineEmits(['update:modelValue', 'delete', 'cancel', 'submit'])

const modalState = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const toggleModal = () => {
  modalState.value = !modalState.value
  emit('update:modelValue', modalState.value)
}

defineExpose({
  modalState,
  toggleModal,
})
</script>

<template>
  <q-dialog
    full-width
    full-height
    transition-duration="400"
    class="app-modal-big"
    :position="props.position"
    :model-value="modalState"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <q-card class="column">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title :class="{ 'text-center': props.position === 'bottom' }" style="padding-left: 58px">
          <h size="xs" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
            <slot name="title">Title</slot>
          </h>
        </q-toolbar-title>

        <AppButton round size="lg" flat icon="sym_s_close" v-close-popup />
      </q-toolbar>

      <q-separator />
      <q-scroll-area class="col">
        <q-card-section class="modal-content-container" :class="{ 'q-pa-lg': props.position === 'bottom' }">
          <slot></slot>
        </q-card-section>
      </q-scroll-area>
      <q-separator />

      <q-card-actions v-if="!props.noActions" class="col-shrink modal-actions-container row justify-between">
        <slot name="actions">
          <AppFormGroupButton
            :button-delete="props.buttonDelete"
            :button-cancel="props.buttonCancel"
            :button-submit="props.buttonSubmit"
            :loading-delete="props.loadingDelete"
            :loading-cancel="props.loadingCancel"
            :loading-submit="props.loadingSubmit"
            @delete="$emit('delete')"
            @cancel="$emit('cancel')"
            @submit="$emit('submit')"
          />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
body.mobile.touch {
  .app-modal-big {
    .q-dialog__inner,
    .q-dialog__inner.q-dialog__inner--right {
      height: calc(100vh - 70px);
    }
  }
}
.app-modal-big {
  width: 100%;
  .q-card {
    border-radius: $generic-border-radius-lg;
  }
  .q-dialog__inner {
    height: 95vh;
    &.q-dialog__inner--right {
      height: 100vh;
      min-width: auto;

      .modal-content-container {
        padding: 24px;
      }
    }
  }
  .q-dialog__inner--minimized {
    padding: 0;
  }

  .modal-content-container,
  .modal-actions-container {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
  }

  .modal-content-container {
    padding: 48px 24px;
  }

  .modal-actions-container {
    padding: 24px;
  }
}
</style>
