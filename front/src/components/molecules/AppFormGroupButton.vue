<script setup lang="ts">
/**
 * @file Component for group button form.
 */

import { AppButton } from 'src/components'

interface Props {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg'
  buttonDelete?: boolean
  buttonCancel?: boolean
  buttonSubmit?: boolean
  loadingDelete?: boolean
  loadingCancel?: boolean
  loadingSubmit?: boolean
  textDelete?: string
  textCancel?: string
  textSubmit?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonSize: 'md',
  buttonDelete: false,
  buttonCancel: true,
  buttonSubmit: true,
  loadingDelete: false,
  loadingCancel: false,
  loadingSubmit: false,
})
</script>

<template>
  <div class="row full-width justify-end">
    <div v-if="props.buttonDelete" class="col">
      <AppButton
        flat
        text-color="negative"
        :size="props.buttonSize"
        :disable="props.loadingSubmit"
        :loading="props.loadingDelete"
        :label="props.textDelete ? props.textDelete : 'Supprimer'"
        @click="$emit('delete')"
      />
    </div>

    <div class="col-auto justify-between row q-gutter-x-md">
      <AppButton
        v-if="props.buttonCancel"
        outline
        color="primary"
        :size="props.buttonSize"
        :label="props.textCancel ? props.textCancel : 'Annuler'"
        @click="$emit('cancel')"
      />
      <AppButton
        v-if="props.buttonSubmit"
        type="submit"
        color="primary"
        class="self-end"
        :size="props.buttonSize"
        :disable="props.loadingDelete"
        :loading="props.loadingSubmit"
        :label="props.textSubmit ? props.textSubmit : 'Enregistrer'"
        @click="$emit('submit')"
      />
    </div>
  </div>
</template>
