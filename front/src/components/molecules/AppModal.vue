<script setup lang="ts">
/**
 * @file Component for modal.
 */

import { computed } from 'vue'
import { AppHeading as h, AppText as txt, AppIcon, AppButton } from 'components'

export interface ModalProps {
  modelValue?: boolean
  title?: string
  description?: string
  icon?: string
  verticalDisplay?: boolean
  btnPrimary?: boolean
  btnSecondary?: boolean
  btnPrimaryName?: string
  btnSecondaryName?: string
  btnPrimaryColor?: string
  btnSecondaryColor?: string
  btnPrimaryLoading?: boolean
  btnSecondaryLoading?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  btnPrimary: false,
  btnSecondary: false,
  btnPrimaryColor: 'primary',
  btnSecondaryColor: 'primary',
})

const emit = defineEmits(['update:modelValue', 'clickBtnPrimary', 'clickBtnSecondary'])

const modalState = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const toggleModal = () => {
  modalState.value = !modalState.value
}

defineExpose({
  toggleModal,
})
</script>

<template>
  <q-dialog
    class="app-modal"
    :model-value="modalState"
    :persistent="props.persistent"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <q-card class="q-pa-md" :style="props.verticalDisplay ? 'width: 344px' : 'width: 512px'">
      <div
        v-if="props.icon"
        :class="`row items-center ${props.verticalDisplay ? 'justify-center' : 'justify-between'} q-mb-sm`"
      >
        <AppIcon :name="props.icon" size="xl" color="white" colorBackground="primary-50" />
        <div v-if="!props.verticalDisplay && !props.persistent" class="col-auto">
          <AppButton round flat icon="sym_s_close" v-close-popup />
        </div>
      </div>
      <div
        v-if="props.title"
        :class="`row items-center ${
          props.verticalDisplay ? 'justify-center' : 'justify-between'
        } q-col-gutter-md q-mb-md`"
      >
        <h size="xs" color="primary" weight="medium" class="col text-overflow">
          {{ props.title }}
        </h>
        <div v-if="!props.icon && !props.verticalDisplay && !props.persistent" class="col-auto">
          <AppButton round flat icon="sym_s_close" v-close-popup />
        </div>
      </div>
      <div v-if="props.description" :class="`${props.verticalDisplay ? 'text-center' : ''}`">
        <txt color="neutral">
          {{ props.description }}
        </txt>
      </div>

      <slot></slot>

      <q-card-actions class="row justify-end" :class="{ 'q-pt-md': $slots.actions }">
        <slot name="actions">
          <AppButton
            v-if="props.btnSecondary || props.btnSecondaryName"
            outline
            :color="props.btnSecondaryColor"
            :loading="props.btnSecondaryLoading"
            :label="props.btnSecondaryName ?? 'Annuler'"
            :class="`${props.verticalDisplay ? 'col-12 order-last' : 'app-btn-secondary'}`"
            @click="$emit('clickBtnSecondary')"
          />
          <AppButton
            v-if="props.btnPrimary || props.btnPrimaryName"
            :color="props.btnPrimaryColor"
            :loading="props.btnPrimaryLoading"
            :label="props.btnPrimaryName ?? 'Enregistrer'"
            :class="`${props.verticalDisplay ? 'col-12 q-mb-md' : 'app-btn-primary'}`"
            @click="$emit('clickBtnPrimary')"
          />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 400px) {
  .app-modal {
    .q-card__actions--horiz > .q-btn-item {
      margin-left: 0;
    }
    .app-btn-primary {
      margin-bottom: 10px;
      width: 100%;
    }
    .app-btn-secondary {
      width: 100%;
      order: 1;
    }
  }
}
</style>
